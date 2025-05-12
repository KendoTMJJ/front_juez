import { Link } from "react-router-dom"

export function MenuList() {
  return (
    <nav className="flex items-center space-x-8 ml-10">
      <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
        Inicio
      </Link>
      <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">
        Productos
      </Link>
      <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
        Nosotros
      </Link>
      <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
        Contacto
      </Link>
    </nav>
  )
}
