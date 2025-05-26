const BACKEND_URL = import.meta.env.VITE_USERS_URL;

// Función auxiliar para obtener el token de autenticación
const getAuthToken = () => {
    return localStorage.getItem("authToken")
}

// Función auxiliar para crear headers con autenticación
const getAuthHeaders = () => {
    const token = getAuthToken()
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    }
  }

export async function getInfoUsers(id){
    const response = await fetch(`${BACKEND_URL}/users/${id}`,{
        headers: getAuthHeaders(),
    })

    if (!response.ok) {
        throw new Error("Problemas al obtener los datos")
      }
    
      return await response.json()

  }