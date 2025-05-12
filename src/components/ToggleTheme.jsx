"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

function ToggleTheme() {
  const [theme, setTheme] = useState(() => {
    // Intentar obtener el tema del localStorage
    const savedTheme = localStorage.getItem("theme")
    // Si existe un tema guardado, usarlo; de lo contrario, usar la preferencia del sistema
    return savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  })

  useEffect(() => {
    // Aplicar el tema al documento
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    // Guardar el tema en localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

export default ToggleTheme
