import { Link, useNavigate } from "react-router-dom";
import { Instagram, Facebook, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-6">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="text-3xl font-bold text-white">Juez</span>
              <span className="text-3xl font-bold text-blue-400">Virtual</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Plataforma para desarrollar habilidades de programación mediante
              desafíos algorítmicos y problemas del mundo real.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-blue-400 uppercase tracking-wider">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/problems"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Problemas
                </Link>
              </li>
              <li>
                <Link
                  to="/rankings"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Clasificaciones
                </Link>
              </li>
              <li>
                <Link
                  to="/contests"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Concursos
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-blue-400 uppercase tracking-wider">
              Recursos
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Documentación
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Tutoriales
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Comunidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-blue-400 uppercase tracking-wider">
              Contacto
            </h3>
            <address className="text-gray-300 not-italic">
              <div className="flex items-start mb-3">
                <svg
                  className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>Universidad Santo Tomás, Tunja, Boyacá, Colombia</span>
              </div>
              <div className="flex items-center mb-3">
                <svg
                  className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <a
                  href="mailto:contacto@juezvirtual.com"
                  className="hover:text-white transition-colors"
                >
                  contacto@juezvirtual.com
                </a>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <a
                  href="tel:+573001234567"
                  className="hover:text-white transition-colors"
                >
                  +57 300 123 4567
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Copyright and Credits */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Juez Virtual. Todos los derechos
            reservados.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Términos de servicio
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Política de privacidad
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
