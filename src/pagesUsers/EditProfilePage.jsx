import { useNavigate, useParams } from "react-router-dom";
import { getInfoUsers,  updateUserById, changeUserPassword } from "../services/apiUsers";
import { useState, useEffect } from "react"

function EditProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State to manage form data 
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    bio: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("")

  // Fetch user data when the component mounts or when the ID changes
  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null)

      const user = await getInfoUsers(id);

      setFormData({
        username: user.username || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
        password: "",
        confirmPassword: "",
        currentPassword: "",
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Error al cargar los datos del usuario.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle profile update submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserById(id, {
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
      });
      setSuccessMessage("Perfil actualizado correctamente.");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Error al actualizar el perfil.");
    }
  };

  // Handle password change submission
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      await changeUserPassword(id, {
        currentPassword: formData.currentPassword,
        newPassword: formData.password,
      });
      setSuccessMessage("Contraseña actualizada correctamente.");
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
        currentPassword: "",
      }));
    } catch (err) {
      console.error("Error changing password:", err);
      setError("Error al cambiar la contraseña.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Cargando cambios...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Editar Perfil</h1>
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800 px-3 py-1 border rounded">
          Volver
        </button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {/* Formulario de perfil */}
      <form onSubmit={handleProfileSubmit} className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Información del Perfil</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Biografía</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Cuéntanos algo sobre ti..."
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Guardar Cambios
        </button>
      </form>

      <hr className="my-8" />

      {/* Formulario de cambio de contraseña */}
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Cambiar Contraseña</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nueva contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;