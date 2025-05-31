import { Link, useNavigate } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="sticky top-[100vh] bg-gray-800 text-white py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Column 1: About Us */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600">About Us</h2>
          <p className="text-gray-300 leading-relaxed">
            This platform is designed for developers who want to strengthen
            their programming logic skills by solving algorithmic challenges.
            Users can face real-world problems that will help them develop key
            abilities.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/problems"
                className="inline-block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Problems
              </Link>
            </li>
            <li>
              <Link
                to="/rankings"
                className="inline-block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Rankings
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="inline-block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600">Follow Us</h2>
          <ul className="flex space-x-6">
            <li>
              <a
                href="https://www.instagram.com/sistemas_santoto_tunja/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/SistemasSantotoTunja/?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </li>
          </ul>

          <div className="flex items-center mt-25">
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="text-2xl font-semibold text-white">Juez</span>
              <span className="text-2xl font-bold text-blue-600">Virtual</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Sistemas Santoto Tunja. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
