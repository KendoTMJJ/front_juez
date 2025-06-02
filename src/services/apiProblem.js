// src/services/apiProblem.js
import axios from "axios";

// Base URL from environment variables
const BACKEND_URL = import.meta.env.VITE_JUEZ_URL;

// Create Axios instance with base configuration
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to automatically include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Get all problems (correct route according to Swagger)
export const fetchProblems = async () => {
  const response = await api.get("/api/problems/");
  return response.data;
};

// Get a single problem by ID
export const findProbleById = async (id) => {
  const response = await api.get(`/api/problems/${id}`);
  return response.data;
};

// Create a new problem
export const createProblem = async (problem) => {
  const response = await api.post("/api/problems", problem);
  return response.data;
};

// Update an existing problem
export const updateProblem = async (id, problem) => {
  const response = await api.patch(`/api/problems/${id}`, problem);
  return response.data;
};

// Delete a problem
export const deleteProblem = async (id) => {
  const response = await api.delete(`/api/problems/${id}`);
  return response.data;
};

// Get problems by difficulty level
export const fetchProblemsByDifficulty = async (difficulty) => {
  const response = await api.get(`/api/problems/difficulty/${difficulty}`);
  return response.data;
};

// Get problems by category
export const fetchProblemsByCategory = async (category) => {
  const response = await api.get(`/api/problems/category/${category}`);
  return response.data;
};

// Get problems solved by current user
export const fetchSolvedProblems = async () => {
  const response = await api.get("/api/problems/solved");
  return response.data;
};

// Get problems not solved by current user
export const fetchUnsolvedProblems = async () => {
  const response = await api.get("/api/problems/unsolved");
  return response.data;
};
