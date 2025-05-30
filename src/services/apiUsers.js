const BACKEND_URL = import.meta.env.VITE_USERS_URL;

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

  // Get user data by ID
export async function getInfoUsers(id){
    const response = await fetch(`${BACKEND_URL}/users/${id}`,{
        headers: getAuthHeaders(),
    })

    if (!response.ok) {
        throw new Error("Problemas al obtener los datos")
      }
    
      return await response.json()

  }

  // Update user profile data by ID
export async function updateUserById(id, updatedData) {
  const response = await fetch(`${BACKEND_URL}/users/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }

  return await response.json();
}

// Change user's password
export async function changeUserPassword(id, passwords) {
  const response = await fetch(`${BACKEND_URL}/users/${id}/change-password`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(passwords), // { currentPassword, newPassword }
  });

  if (!response.ok) {
    throw new Error("Failed to change password");
  }

  return await response.json();
}