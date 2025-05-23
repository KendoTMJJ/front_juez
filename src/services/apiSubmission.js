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


// mostrar todos los submissions
export async function fetchSubmissions(idUser) {
  const response = await fetch(`${BACKEND_URL}/api/submissions/all/${idUser}`);
  if (!response.ok) {
    throw new Error("Problemas al obtener los datos");
  }
  return await response.json();
}

// Crear una nueva submission
export async function createSubmission(submissionData) {
  const response = await fetch(`${BACKEND_URL}/api/submissions/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(submissionData),
  })

  if (!response.ok) {
    throw new Error("Problemas al crear la submission")
  }

  return await response.json()
}

// Obtener todas las submissions, con filtros opcionales
export async function getAllSubmissions({ problemId, userId } = {}) {
  let url = `${BACKEND_URL}/api/submissions/all`;

  const params = new URLSearchParams();
  if (problemId) params.append("problemId", problemId);
  if (userId) params.append("userId", userId);

  if ([...params].length > 0) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Problemas al obtener las submissions");
  }

  return await response.json();
}


// Obtener una submission por ID
export async function getSubmissionById(submissionId) {
  const response = await fetch(`${BACKEND_URL}/api/submissions/findOne/${submissionId}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Submission no encontrada con ID: ${submissionId}`)
  }

  return await response.json()
}

// Obtener submissions del usuario actual
export async function getUserSubmissions() {
  const response = await fetch(`${BACKEND_URL}/api/submissions/user`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Problemas al obtener las submissions del usuario")
  }

  return await response.json()
}


// Obtener submissions de un usuario específico (solo para admin y maestros)
export async function getUserSubmissionsById(userId) {
  const response = await fetch(`${BACKEND_URL}/api/submissions/user/${userId}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Problemas al obtener las submissions del usuario con ID: ${userId}`)
  }

  return await response.json()
}


// Obtener submissions por problema
export async function getSubmissionsByProblem(problemId) {
  const response = await fetch(`${BACKEND_URL}/api/submissions/problem/${problemId}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Problemas al obtener las submissions del problema con ID: ${problemId}`)
  }

  return await response.json()
}

// Obtener submissions por estado
export async function getSubmissionsByStatus(status) {
  const response = await fetch(`${BACKEND_URL}/api/submissions/status/${status}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Problemas al obtener las submissions con estado: ${status}`)
  }

  return await response.json()
}