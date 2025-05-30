import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Code,
  FileText,
  Menu,
  User,
  X,
  LogOut,
  Settings,
  UserRoundCog,
} from "lucide-react";
import { isAdmin, logout } from "../servicesUsuarios/authService";

export function Navbar() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.codUser;

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and name */}
          <div className="flex items-center">
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="text-2xl font-semibold text-gray-900">Juez</span>
              <span className="text-2xl font-bold text-blue-600">Virtual</span>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/problems"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Problems
              </Link>
              {isAuthenticated && (
                <Link
                  to={`/submissions?userId=${userId}`}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  My Submissions
                </Link>
              )}
              <Link
                to="/rankings"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Rankings
              </Link>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-4">
              <button
                onClick={() => navigate("/problems")}
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                title="Problems"
              >
                <Code className="h-6 w-6" />
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => navigate(`/submissions?userId=${userId}`)}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                  title="My Submissions"
                >
                  <FileText className="h-6 w-6" />
                </button>
              )}

              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                    title="My Profile"
                  >
                    <User className="h-6 w-6" />
                  </button>

                  {/* Admin button - Visible for all authenticated users */}
                  {isAdmin() && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="flex items-center px-3 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                      title="Admin Panel"
                    >
                      <UserRoundCog className="h-6 w-6" />
                    </button>
                  )}

                  <button
                    onClick={logout}
                    style={{ backgroundColor: "#dc2626" }}
                    className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                    title="Logout"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                  title="Login"
                >
                  <User className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Mobile menu */}
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

      {/* Mobile panel */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/problems"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={toggleMenu}
            >
              Problems
            </Link>

            {isAuthenticated && (
              <Link
                to={`/submissions?userId=${userId}`}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                onClick={toggleMenu}
              >
                My Submissions
              </Link>
            )}

            <Link
              to="/rankings"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={toggleMenu}
            >
              Rankings
            </Link>

            {isAuthenticated ? (
              <>
                {/* Admin button on mobile - Visible for all authenticated users */}
                <Link
                  to="/admin"
                  className="block pl-3 pr-4 py-2 border-l-4 border-red-500 text-base font-medium text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700"
                  onClick={toggleMenu}
                >
                  Admin Panel
                </Link>

                <Link
                  to="/profile"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                  onClick={toggleMenu}
                >
                  My Profile
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-red-500 text-base font-medium text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
