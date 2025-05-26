const BACKEND_URL = import.meta.env.VITE_USERS_URL;

// Función para registrar un nuevo usuario
export async function registerUser(userData) {
  try {
    console.log("Enviando datos al backend:", userData)

    const response = await fetch(`${BACKEND_URL}/registro/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    console.log("Respuesta del servidor:", response.status)

    // Intenta obtener el cuerpo de la respuesta
    const data = await response.json().catch((e) => {
      console.error("Error al parsear la respuesta:", e)
      return {}
    })

    console.log("Datos recibidos:", data)

    // Verifica si hay un token en la respuesta o en el mensaje
    if (data.tokenApp) {
      localStorage.setItem("authToken", data.tokenApp)
      return { success: true, token: data.tokenApp }
    }
    // Verifica si la respuesta tiene una estructura anidada (HttpException)
    else if (data.message && typeof data.message === "object" && data.message.tokenApp) {
      localStorage.setItem("authToken", data.message.tokenApp)
      return { success: true, token: data.message.tokenApp }
    }
    // Si no hay token pero la respuesta es 200, también es exitoso
    else if (response.ok) {
      return { success: true, data }
    }
    // De lo contrario, es un error
    else {
      const errorMsg = data.message || `Error ${response.status}: ${response.statusText}`
      throw new Error(errorMsg)
    }
  } catch (error) {
    console.error("Error en registro:", error)
    throw error
  }
}

// Función para iniciar sesión
export async function loginUser(credentials) {
  try {
    console.log("Enviando credenciales:", credentials)

    const response = await fetch(`${BACKEND_URL}/registro/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    console.log("Respuesta del servidor:", response.status)

    // Obtén el texto de la respuesta primero para depurar
    const responseText = await response.text()
    console.log("Respuesta como texto:", responseText)

    // Si la respuesta está vacía, maneja el error
    if (!responseText) {
      throw new Error("Respuesta vacía del servidor")
    }

    // Intenta parsear la respuesta como JSON
    let data
    try {
      data = JSON.parse(responseText)
      console.log("Datos parseados:", data)
    } catch (e) {
      console.error("Error al parsear JSON:", e)
      throw new Error("Formato de respuesta inválido: no es JSON válido")
    }

    // Examina la estructura de la respuesta para depuración
    console.log("Estructura de data:", JSON.stringify(data, null, 2))
    console.log("uuui de usuario:", JSON.stringify(data.user.codUser, null, 2))
    localStorage.setItem("idUser", data.user.codUser)

    // Estrategia 1: Buscar un token en cualquier nivel de la respuesta
    function findTokenInObject(obj, tokenNames = ["accessToken", "tokenApp", "token"]) {
      if (!obj || typeof obj !== "object") return null

      // Buscar directamente en el objeto
      for (const name of tokenNames) {
        if (obj[name]) return obj[name]
      }

      // Buscar en propiedades anidadas
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          const token = findTokenInObject(obj[key], tokenNames)
          if (token) return token
        }
      }

      return null
    }

    const token = findTokenInObject(data)

    if (token) {
      console.log("Token encontrado:", token)
      localStorage.setItem("authToken", token)

      // Extraer y guardar la información del usuario
      let userData = null

      // Intentar encontrar el usuario en diferentes lugares de la respuesta
      if (data.user) {
        userData = data.user
      } else if (data.message && data.message.user) {
        userData = data.message.user
      } else {
        // Si no hay información de usuario en la respuesta, crear un objeto básico
        userData = {
          username: credentials.username,
        }
      }

      // Guardar la información del usuario
      localStorage.setItem("userData", JSON.stringify(userData))

      return {
        success: true,
        user: userData,
        token,
      }
    }

    // Si llegamos aquí, no se encontró un token
    console.error("No se encontró un token en la respuesta:", data)
    throw new Error("Formato de respuesta inválido: no se encontró un token")
  } catch (error) {
    console.error("Error en login:", error)
    throw error
  }
}

// Función para verificar si el usuario está autenticado
export function isAuthenticated() {
  const token = localStorage.getItem("authToken")
  return !!token // Devuelve true si hay un token, false si no
}

// Función para obtener el token
export function getAuthToken() {
  return localStorage.getItem("authToken")
}

// Función para cerrar sesión
export function logout() {
  localStorage.removeItem("authToken")
  localStorage.removeItem("userData")
  localStorage.removeItem("idUser")
  window.location.href = "/"
}

// Función para obtener la información del usuario actual
export function getCurrentUser() {
  try {
    const userData = localStorage.getItem("userData")
    return userData ? JSON.parse(userData) : null
  } catch (e) {
    console.error("Error al obtener datos del usuario:", e)
    return null
  }
}

// Función para obtener el rol del usuario
export function getUserRole() {
  const user = getCurrentUser()
  return user?.rolUsuario?.name || "Usuario"
}

