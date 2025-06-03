const BACKEND_URL = import.meta.env.VITE_JUEZ_URL;

// Helper function to get the authentication token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Helper function to create headers with authentication
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Show all submissions
export async function fetchSubmissions(idUser) {
  const response = await fetch(`${BACKEND_URL}/api/submissions/all/${idUser}`);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return await response.json();
}

// Create a new submission
export async function createSubmission(submissionData) {
  const response = await fetch(`${BACKEND_URL}/api/submissions/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(submissionData),
  });

  if (!response.ok) {
    throw new Error("Error creating submission");
  }

  return await response.json();
}

// Get all submissions, with optional filters
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
    throw new Error("Error fetching submissions");
  }

  return await response.json();
}

// Get a submission by ID
export async function getSubmissionById(submissionId) {
  const response = await fetch(
    `${BACKEND_URL}/api/submissions/findOne/${submissionId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(`Submission not found with ID: ${submissionId}`);
  }

  return await response.json();
}

// Get submissions of the current user
export async function getUserSubmissions() {
  const response = await fetch(`${BACKEND_URL}/api/submissions/user`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error fetching user's submissions");
  }

  return await response.json();
}

// Get submissions of a specific user (only for admin and teachers)
export async function getUserSubmissionsById(userId) {
  const response = await fetch(
    `${BACKEND_URL}/api/submissions/user/${userId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching submissions of user with ID: ${userId}`);
  }

  return await response.json();
}

// Get submissions by problem
export async function getSubmissionsByProblem(problemId) {
  const response = await fetch(
    `${BACKEND_URL}/api/submissions/problem/${problemId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching submissions for problem with ID: ${problemId}`
    );
  }

  return await response.json();
}

// Get submissions by status
export async function getSubmissionsByStatus(status) {
  const response = await fetch(
    `${BACKEND_URL}/api/submissions/status/${status}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching submissions with status: ${status}`);
  }

  return await response.json();
}
