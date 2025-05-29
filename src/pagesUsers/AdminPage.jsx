import { useState, useEffect } from "react"

// Definimos el tipo de stats usando JSDoc
/**
 * @typedef {Object} Stats
 * @property {number} totalUsers
 * @property {number} totalProblems
 * @property {number} totalSubmissions
 * @property {number} activeUsers
 */

function AdminPage() {

  const isAuthenticated = !!localStorage.getItem("authToken");

  // Estado para almacenar las estadísticas
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProblems: 0,
    totalSubmissions: 0,
    activeUsers: 0,
  })

  // Estado para controlar la carga
  const [loading, setLoading] = useState(true)
  
  // Estado para manejar errores
  const [error, setError] = useState(null)


  // Función para cargar las estadísticas desde la API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Aquí usamos import.meta.env para acceder a las variables de entorno en Vite
        const usersUrl = import.meta.env.VITE_USERS_URL
        const juezUrl = import.meta.env.VITE_JUEZ_URL
        
        // Verificamos que las URLs estén configuradas
        if (!usersUrl || !juezUrl) {
          throw new Error("URLs de servicios no configuradas")
        }
        
        // Hacemos las peticiones a las APIs
        const usersResponse = await fetch(`${usersUrl}/users/list`)
        const problemsResponse = await fetch(`${juezUrl}/api/problems/all`)
        const submissionsResponse = await fetch(`${juezUrl}/api/submissions/all`)
        
        // Verificar que todas las respuestas sean exitosas
        if (!usersResponse.ok || !problemsResponse.ok || !submissionsResponse.ok) {
          throw new Error("Error al obtener datos de los servicios")
        }
        
        // Obtener los datos
        const usersData = await usersResponse.json()
        const problemsData = await problemsResponse.json() 
        const submissionsData = await submissionsResponse.json()

        // Calcular estadísticas
        const calculatedStats = {
          totalUsers: usersData.length,
          totalProblems: problemsData.length,
          totalSubmissions: submissionsData.length,
          activeUsers: usersData.filter(user => user.status === 'active').length
        }

        setStats(calculatedStats)
      } catch (err) {
        console.error("Error al cargar estadísticas:", err)
        setError("No se pudieron cargar las estadísticas")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        <button 
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          onClick={() => window.location.reload()}
        >
          Actualizar
        </button>
      </div>

      {/* Mensaje de error si existe */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-800">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tarjeta: Total Usuarios */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
              {loading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              )}
            </div>
            <div className="text-blue-600">👥</div>
          </div>
        </div>

        {/* Tarjeta: Total Problemas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Problemas</p>
              {loading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{stats.totalProblems}</p>
              )}
            </div>
            <div className="text-green-600">📄</div>
          </div>
        </div>

        {/* Tarjeta: Total Envíos */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Envíos</p>
              {loading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{stats.totalSubmissions}</p>
              )}
            </div>
            <div className="text-purple-600">📊</div>
          </div>
        </div>

        {/* Tarjeta: Usuarios Activos */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
              {loading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
              )}
            </div>
            <div className="text-yellow-600">🏆</div>
          </div>
        </div>
      </div>
      
      {/* Aquí irá el resto del contenido del panel */}
    </div>
  )
}

export default AdminPage