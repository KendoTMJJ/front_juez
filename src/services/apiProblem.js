const BACKEND_URL = import.meta.env.VITE_JUEZ_URL;

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


// Mostrar todos los problemas
export async function fetchProblems() {
    const response = await fetch(`${BACKEND_URL}/api/problems/all`, {
      headers: getAuthHeaders(),
    })
  
    if (!response.ok) {
      throw new Error("Problemas al obtener los datos")
    }
  
    return await response.json()
  }

// Mostrar un problema según el id
export async function findProbleById(id) {
    const response = await fetch(`${BACKEND_URL}/api/problems/findOne/${id}`, {
      headers: getAuthHeaders(),
    })
  
    if (!response.ok) {
      throw new Error(`Problema no encontrado con ID: ${id}`)
    }
  
    return await response.json()
  }


// Crear un nuevo problema
export async function createProblem(problem) {
    const response = await fetch(`${BACKEND_URL}/api/problems/create`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(problem),
    })
  
    if (!response.ok) {
      throw new Error("Problemas al crear el problema")
    }
  
    return await response.json()
  }


// Actualizar un problema existente
export async function updateProblem(id, problem) {
    const response = await fetch(`${BACKEND_URL}/api/problems/update/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(problem),
    })
  
    if (!response.ok) {
      throw new Error(`Problemas al actualizar el problema con ID: ${id}`)
    }
  
    return await response.json()
  }

// Eliminar un problema
export async function deleteProblem(id) {
    const response = await fetch(`${BACKEND_URL}/api/problems/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
  
    if (!response.ok) {
      throw new Error(`Problemas al eliminar el problema con ID: ${id}`)
    }
  
    return await response.json()
  }

// Obtener problemas por dificultad
export async function fetchProblemsByDifficulty(difficulty) {
    const response = await fetch(`${BACKEND_URL}/api/problems/difficulty/${difficulty}`, {
      headers: getAuthHeaders(),
    })
  
    if (!response.ok) {
      throw new Error(`Problemas al obtener problemas con dificultad: ${difficulty}`)
    }
  
    return await response.json()
  }
  
  // Obtener problemas por categoría
  export async function fetchProblemsByCategory(category) {
    const response = await fetch(`${BACKEND_URL}/api/problems/category/${category}`, {
      headers: getAuthHeaders(),
    })
  
    if (!response.ok) {
      throw new Error(`Problemas al obtener problemas de la categoría: ${category}`)
    }
  
    return await response.json()
  }
  
  // Obtener problemas resueltos por el usuario actual
  export async function fetchSolvedProblems() {
    const response = await fetch(`${BACKEND_URL}/api/problems/solved`, {
      headers: getAuthHeaders(),
    })
  
    if (!response.ok) {
      throw new Error("Problemas al obtener los problemas resueltos")
    }
  
    return await response.json()
  }
  
  // Obtener problemas no resueltos por el usuario actual
  export async function fetchUnsolvedProblems() {
    const response = await fetch(`${BACKEND_URL}/api/problems/unsolved`, {
      headers: getAuthHeaders(),
    })
  
    if (!response.ok) {
      throw new Error("Problemas al obtener los problemas no resueltos")
    }
  
    return await response.json()
  }