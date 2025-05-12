import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code, FileText, Menu, User, X } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center">
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="text-2xl font-semibold text-gray-900">Juez</span>
              <span className="text-2xl font-bold text-blue-600">Virtual</span>
            </div>

            {/* Navegación de escritorio */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/problems"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Problemas
              </Link>
              <Link
                to="/submissions"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Envíos
              </Link>
              <Link
                to="/rankings"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Clasificación
              </Link>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-4">
              <button
                onClick={() => navigate("/problems")}
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                title="Problemas"
              >
                <Code className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigate("/submissions")}
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                title="Mis envíos"
              >
                <FileText className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigate("/auth/login")}
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                title="Mi perfil"
              >
                <User className="h-6 w-6" />
              </button>
            </div>

            {/* Menú móvil */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel móvil */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/problems"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={toggleMenu}
            >
              Problemas
            </Link>
            <Link
              to="/submissions"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={toggleMenu}
            >
              Envíos
            </Link>
            <Link
              to="/rankings"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={toggleMenu}
            >
              Clasificación
            </Link>
            <Link
              to="/auth/login"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={toggleMenu}
            >
              <div></div>
              Iniciar sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
