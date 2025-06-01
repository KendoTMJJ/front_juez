const BACKEND_URL = import.meta.env.VITE_USERS_URL
const JUEZ_URL = import.meta.env.VITE_JUEZ_URL

// Get auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken")
}

// Generate headers with authentication
const getAuthHeaders = () => {
  const token = getAuthToken()
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }
}

// Get all users
export async function getAllUsers() {
  const response = await fetch(`${BACKEND_URL}/users/list`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return await response.json()
}

// Get all problems
export async function getAllProblems() {
  const response = await fetch(`${JUEZ_URL}/api/problems/all`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return await response.json()
}

// Get all submissions
export async function getAllSubmissions() {
  const response = await fetch(`${JUEZ_URL}/api/submissions/all`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return await response.json()
}

// Get admin statistics
export async function getAdminStats() {
  try {
    // Make all requests in parallel
    const [usersData, problemsData, submissionsData] = await Promise.all([
      getAllUsers(),
      getAllProblems(),
      getAllSubmissions(),
    ])

    // Calculate statistics
    return {
      totalUsers: usersData.length,
      totalProblems: problemsData.length,
      totalSubmissions: submissionsData.length,
      activeUsers: usersData.filter((user) => user.isActive).length,
    }
  } catch (error) {
    console.error("Error getting statistics:", error)
    throw error
  }
}

// Activate user
export async function activateUser(userId) {
  const response = await fetch(`${BACKEND_URL}/users/${userId}/activate`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return await response.json()
}

// Deactivate user
export async function deactivateUser(userId) {
  const response = await fetch(`${BACKEND_URL}/users/${userId}/deactivate`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return await response.json()
}

// Delete user
export async function deleteUser(userId) {
  const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return await response.json()
}

