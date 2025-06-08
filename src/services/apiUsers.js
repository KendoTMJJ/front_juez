const BACKEND_URL = import.meta.env.VITE_USERS_URL;
const Juez_URL = import.meta.env.VITE_JUEZ_URL;

// Get auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Generate headers with authentication
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Get user data by ID
export async function getInfoUsers(id) {
  const response = await fetch(`${BACKEND_URL}/users/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Problemas al obtener los datos");
  }

  return await response.json();
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

export async function updateUserSolvedProblems(userId, problemId) {
  const response = await fetch(
    `${BACKEND_URL}/users/${userId}/solved-problems/${problemId}`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.message || "Error al actualizar problemas resueltos"
    );
  }

  return response.json();
}

export async function getCombinedRankings(limit = 10) {
  try {
    // 1. Get users with the most problems solved
    const usersResponse = await fetch(`${BACKEND_URL}/acceso/list`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!usersResponse.ok) throw new Error("Error fetching users");
    const allUsers = await usersResponse.json();

    const sortedUsers = [...allUsers]
      .sort((a, b) => b.totalProblemsSolved - a.totalProblemsSolved)
      .slice(0, limit);

    // 2. Get judge scores for these users
    const scoresResponse = await fetch(`${Juez_URL}/api/submissions/scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userIds: sortedUsers.map((user) => user.codUser),
      }),
    });

    if (!scoresResponse.ok) throw new Error("Error fetching scores");
    const scores = await scoresResponse.json();

    // 3. Combine data
    return sortedUsers
      .map((user) => ({
        id: user.codUser,
        username: user.username,
        profilePicture: user.profilePicture,
        solvedProblems: user.totalProblemsSolved,
        totalScore: scores[user.codUser] || 0,
      }))
      .sort((a, b) => b.totalScore - a.totalScore);
  } catch (error) {
    console.error("Error fetching combined rankings:", error);
    throw error;
  }
}
