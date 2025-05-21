import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getCurrentUser } from "../servicesUsuarios/authService"

function HomePage() {
  const [username, setUsername] = useState("")

  useEffect(() => {
    // Obtener el nombre de usuario al cargar el componente
    const user = getCurrentUser()
    setUsername(user?.username || "")
  }, [])
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mt-10 mb-6">
        Bienvenido al Juez Virtual. {username}
      </h1>

      <p className="text-xl text-gray-600 mb-8">
        Practica tus habilidades de programación resolviendo problemas y
        enviando soluciones.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/problems"
          className="bg-blue-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Ver Problemas
        </Link>
        <Link
          to="/submissions"
          className="bg-gray-600 hover:bg-blue-700  text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Ver Envíos
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
