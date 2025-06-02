import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_JUEZ_URL;

// Configuración de Axios (compartida con apiProblem.js)
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token (igual que en apiProblem.js)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Obtener todos los test cases de un problema
export async function fetchTestCases(problemId) {
  try {
    const response = await api.get(`/api/problems/${problemId}/test-cases`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        `Error al obtener test cases para el problema: ${problemId}`
    );
  }
}

// Crear o actualizar test cases de un problema
export async function saveTestCases(problemId, testCases) {
  try {
    const response = await api.post(
      `/api/problems/${problemId}/test-cases`,
      testCases
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        `Error al guardar test cases para el problema: ${problemId}`
    );
  }
}
