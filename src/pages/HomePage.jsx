import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../servicesUsuarios/authService";

function HomePage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Get username when loading the component
    const user = getCurrentUser();
    setUsername(user?.username || "");
  }, []);

  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mt-10 mb-6">
        Welcome to the Virtual Judge, {username}
      </h1>

      <p className="text-xl text-gray-600 mb-8">
        Practice your programming skills by solving problems and 
        submitting solutions.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/problems"
          className="bg-blue-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          View Problems
        </Link>
        {isAuthenticated && (
          <Link
            to="/submissions"
            className="bg-gray-600 hover:bg-blue-700  text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            View Submissions
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomePage;
