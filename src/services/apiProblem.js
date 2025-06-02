// src/services/apiProblem.js
import axios from "axios";

// URL base desde las variables de entorno
const BACKEND_URL = import.meta.env.VITE_JUEZ_URL;

// Crear instancia de Axios
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar interceptor para incluir token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Obtener todos los problemas (ruta correcta según Swagger)
export const fetchProblems = async () => {
  const response = await api.get("/api/problems/");
  return response.data;
};

// Obtener un problema por ID
export const findProbleById = async (id) => {
  const response = await api.get(`/api/problems/${id}`);
  return response.data;
};

// Crear un nuevo problema
export const createProblem = async (problem) => {
  const response = await api.post("/api/problems", problem);
  return response.data;
};

// Actualizar un problema existente
export const updateProblem = async (id, problem) => {
  const response = await api.patch(`/api/problems/${id}`, problem);
  return response.data;
};

// Eliminar un problema
export const deleteProblem = async (id) => {
  const response = await api.delete(`/api/problems/${id}`);
  return response.data;
};

// Obtener problemas por dificultad
export const fetchProblemsByDifficulty = async (difficulty) => {
  const response = await api.get(`/api/problems/difficulty/${difficulty}`);
  return response.data;
};

// Obtener problemas por categoría
export const fetchProblemsByCategory = async (category) => {
  const response = await api.get(`/api/problems/category/${category}`);
  return response.data;
};

// Obtener problemas resueltos por el usuario actual
export const fetchSolvedProblems = async () => {
  const response = await api.get("/api/problems/solved");
  return response.data;
};

// Obtener problemas no resueltos por el usuario actual
export const fetchUnsolvedProblems = async () => {
  const response = await api.get("/api/problems/unsolved");
  return response.data;
};
