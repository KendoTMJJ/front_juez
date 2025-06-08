const BACKEND_URL = import.meta.env.VITE_USERS_URL;

// Function to register a new user
export async function registerUser(userData) {
  try {
    // console.log("Sending data to backend:", userData);

    const response = await fetch(`${BACKEND_URL}/registro/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // console.log("Server response:", response.status);

    // Try to get the response body
    const data = await response.json().catch((e) => {
      console.error("Error parsing response:", e);
      return {};
    });

    // console.log("Received data:", data);

    // Check if there's a token in the response or message
    if (data.tokenApp) {
      localStorage.setItem("authToken", data.tokenApp);
      return { success: true, token: data.tokenApp };
    }
    // Check if the response has a nested structure (HttpException)
    else if (
      data.message &&
      typeof data.message === "object" &&
      data.message.tokenApp
    ) {
      localStorage.setItem("authToken", data.message.tokenApp);
      return { success: true, token: data.message.tokenApp };
    }
    // If there's no token but the response is 200, it's still successful
    else if (response.ok) {
      return { success: true, data };
    }
    // Otherwise, it's an error
    else {
      const errorMsg =
        data.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMsg);
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

// Function to log in
export async function loginUser(credentials) {
  try {
    // console.log("Sending credentials:", credentials);

    const response = await fetch(`${BACKEND_URL}/registro/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // console.log("Server response:", response.status);

    // Get response text first for debugging
    const responseText = await response.text();
    // console.log("Response as text:", responseText);

    // If the response is empty, handle the error
    if (!responseText) {
      throw new Error("Empty response from server");
    }

    // Try to parse the response as JSON
    let data;
    try {
      data = JSON.parse(responseText);
      // console.log("Parsed data:", data);
    } catch (e) {
      console.error("Error parsing JSON:", e);
      throw new Error("Invalid response format: not valid JSON");
    }

    // Debug the structure of the response
    // console.log("Data structure:", JSON.stringify(data, null, 2))
    // console.log("User ID:", JSON.stringify(data.user.codUser, null, 2))
    localStorage.setItem("idUser", data.user.codUser);

    // Strategy 1: Look for a token at any level of the response
    function findTokenInObject(
      obj,
      tokenNames = ["accessToken", "tokenApp", "token"]
    ) {
      if (!obj || typeof obj !== "object") return null;

      // Look directly in the object
      for (const name of tokenNames) {
        if (obj[name]) return obj[name];
      }

      // Look in nested properties
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          const token = findTokenInObject(obj[key], tokenNames);
          if (token) return token;
        }
      }

      return null;
    }

    const token = findTokenInObject(data);

    if (token) {
      // console.log("Token found:", token);
      localStorage.setItem("authToken", token);

      // Extract and store user information
      let userData = null;

      // Try to find user in different places in the response
      if (data.user) {
        userData = data.user;
      } else if (data.message && data.message.user) {
        userData = data.message.user;
      } else {
        // If there's no user info in the response, create a basic object
        userData = {
          username: credentials.username,
        };
      }

      // Save user information
      localStorage.setItem("userData", JSON.stringify(userData));

      return {
        success: true,
        user: userData,
        token,
      };
    }

    // If we got here, no token was found
    console.error("No token found in the response:", data);
    throw new Error("Invalid response format: no token found");
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Function to check if the user is authenticated
export function isAuthenticated() {
  const token = localStorage.getItem("authToken");
  return !!token; // Returns true if there's a token, false otherwise
}

// Function to get the token
export function getAuthToken() {
  return localStorage.getItem("authToken");
}

// Function to log out
export function logout() {
  localStorage.clear();
  // localStorage.removeItem("authToken")
  // localStorage.removeItem("userData")
  // localStorage.removeItem("idUser")
  window.location.href = "/";
}

// Function to get the current user's information
export function getCurrentUser() {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error("Error getting user data:", e);
    return null;
  }
}

// Function to get the user's role
export function getUserRole() {
  const user = getCurrentUser();
  return user?.rolUsuario?.name || "User";
}

// Function to check if the user is an administrator
export function isAdmin() {
  const role = getUserRole();
  return role === "Administrador"; // Match the exact name in your JSON
}

// Function to check if the user is an master
export function isMaster() {
  const role = getUserRole();
  return role === "Maestro"; // Match the exact name in your JSON
}
