import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../servicesUsuarios/authService";
import { getInfoUsers } from "../services/apiUsers";

function ProfilePage() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.codUser;
  const userRole = userData?.rolUsuario.name;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const data = await getInfoUsers(userId);

      if (!data) {
        throw new Error(
          "No se encontraron datos de usuario. Por favor inicia sesión."
        );
      }

      setUser(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    if (userId) {
    navigate(`/edit-profile/${userId}`);
  } else {
    setError("No se pudo obtener el ID del usuario");
  }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No se encontró información del usuario.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Perfil de Usuario
          </h1>
          <button
            onClick={handleEditProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
          >
            Editar Perfil
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sección de información básica */}
          <div className="md:w-1/3">
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 overflow-hidden">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-4xl">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </div>
                )}
              </div>

              <h2 className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">@{user.username}</p>

              <span className="mt-2 px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {userRole}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Correo electrónico
                </h3>
                <p className="text-gray-900">{user.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Miembro desde
                </h3>
                <p className="text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Sección de estadísticas y bio */}
          <div className="md:w-2/3">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Biografía</h2>
              <p className="text-gray-700">
                {user.bio ||
                  "Este usuario no ha agregado una biografía todavía."}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium text-gray-500">Rating</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {user.rating}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium text-gray-500">
                  Problemas resueltos
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {user.totalProblemsSolved}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.isActive ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>

            {user.solvedProblems && user.solvedProblems.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Problemas resueltos recientemente
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user.solvedProblems.slice(0, 5).map((problemId) => (
                    <span
                      key={problemId}
                      className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded"
                    >
                      {problemId.substring(0, 8)}...
                    </span>
                  ))}
                  {user.solvedProblems.length > 5 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      +{user.solvedProblems.length - 5} más
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
