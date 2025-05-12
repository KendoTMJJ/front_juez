import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function MenuListMobile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="p-2">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
          <Link
            to="/"
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggleMenu}
          >
            Inicio
          </Link>
          <Link
            to="/products"
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggleMenu}
          >
            Productos
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggleMenu}
          >
            Nosotros
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggleMenu}
          >
            Contacto
          </Link>
        </div>
      )}
    </div>
  );
}
