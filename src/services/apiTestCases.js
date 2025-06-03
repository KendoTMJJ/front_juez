import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_JUEZ_URL;

// Axios configuration (shared with apiProblem.js)
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the token (same as in apiProblem.js)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch all test cases of a problem
export async function fetchTestCases(problemId) {
  try {
    const response = await api.get(`/api/problems/${problemId}/test-cases`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        `Error fetching test cases for problem: ${problemId}`
    );
  }
}

// Create or update test cases of a problem
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
        `Error saving test cases for problem: ${problemId}`
    );
  }
}
