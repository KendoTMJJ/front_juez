import { useState } from "react";
import { registerUser } from "../servicesUsuarios/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);

      // Preparar datos para enviar al backend según tu DTO
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        profilePicture: "", // Campo vacío por defecto
        bio: "", // Campo vacío por defecto
      };

      const result = await registerUser(userData);

      if (result.success) {
        // Registro exitoso, redirigir al login
        navigate("/login");
      }
    } catch (err) {
      // Manejar errores específicos del backend
      if (err.message.includes("El usuario ya existe")) {
        setError("El nombre de usuario ya está en uso");
      } else if (err.message.includes("El email ya está en uso")) {
        setError("El correo electrónico ya está registrado");
      } else {
        setError(err.message || "Error al registrar. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-10 shadow-xl w-full max-w-2xl">
        <h1 className="text-5xl font-extrabold text-center text-white mb-8">Regístrate</h1>

        {error && <div className="bg-red-500 text-white p-3 rounded-lg mb-6">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Campos obligatorios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre de usuario */}
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-0 pb-2.5 pt-10 text-base text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:border-blue-500 peer"
              />
              <label className="absolute text-base text-gray-300 duration-300 transform scale-75 top-2.5 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-1 peer-focus:text-blue-500">
                Nombre de usuario
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-0 pb-2.5 pt-10 text-base text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:border-blue-500 peer"
              />
              <label className="absolute text-base text-gray-300 duration-300 transform scale-75 top-2.5 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-1 peer-focus:text-blue-500">
                Correo electrónico
              </label>
            </div>

            {/* Contraseña */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-0 pb-2.5 pt-10 text-base text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:border-blue-500 peer"
              />
              <label className="absolute text-base text-gray-300 duration-300 transform scale-75 top-2.5 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-1 peer-focus:text-blue-500">
                Contraseña
              </label>
            </div>

            {/* Confirmar Contraseña */}
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-0 pb-2.5 pt-10 text-base text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:border-blue-500 peer"
              />
              <label className="absolute text-base text-gray-300 duration-300 transform scale-75 top-2.5 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-1 peer-focus:text-blue-500">
                Confirmar Contraseña
              </label>
            </div>
          </div>

          {/* Campos opcionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-0 pb-2.5 pt-10 text-base text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:border-blue-500 peer"
              />
              <label className="absolute text-base text-gray-300 duration-300 transform scale-75 top-2.5 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-1 peer-focus:text-blue-500">
                Nombre (opcional)
              </label>
            </div>

            {/* Apellido */}
            <div className="relative">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-0 pb-2.5 pt-10 text-base text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:border-blue-500 peer"
              />
              <label className="absolute text-base text-gray-300 duration-300 transform scale-75 top-2.5 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-1 peer-focus:text-blue-500">
                Apellido (opcional)
              </label>
            </div>
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-lg font-semibold text-black bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400"
          >
            {loading ? "Procesando..." : "Registrarse"}
          </button>

          {/* Enlace a login */}
          <p className="text-center text-gray-400 mt-4">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Inicia sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
