import { useState } from "react";
import { loginUser } from "../servicesUsuarios/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      console.log("Enviando credenciales:", credentials);

      const result = await loginUser(credentials);

      console.log("Resultado del login:", result);

      if (result.success) {
        // Login successful, redirect to home page
        navigate("/");
      }
    } catch (err) {
      console.error("Error completo:", err);
      setError(err.message || "Error logging in, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 shadow-xl w-full max-w-2xl">
        <h1 className="text-5xl font-extrabold text-center text-white mb-8">
          Log In
        </h1>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* User field */}
          <div className="relative">
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="w-full px-0 pb-3 pt-10 text-lg text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:border-blue-500 peer"
            />
            <label className="absolute text-lg text-gray-300 duration-300 transform scale-75 top-2.5 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-1 peer-focus:text-blue-500">
              Username
            </label>
          </div>

          {/* Password field */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-0 pb-3 pt-10 text-lg text-white bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:border-blue-500 peer"
            />
            <label className="absolute text-lg text-gray-300 duration-300 transform scale-75 top-2.5 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-1 peer-focus:text-blue-500">
              Password
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-xl font-bold text-black bg-blue-600 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400"
          >
            {loading ? "Processing..." : "Log In"}
          </button>

          {/* Link to register */}
          <p className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
