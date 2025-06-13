import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../servicesUsuarios/authService";

function HomePage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = getCurrentUser();
    setUsername(user?.username || "");
  }, []);

  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">Juez</span>
          <span className=" text-black">Virtual</span>{" "}
          {username && <span className="text-black">{username}</span>}
        </h1>
        <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Sharpen your programming skills through competitive challenges and
          real-time evaluation
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link
            to="/problems"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg shadow-lg hover:shadow-xl"
          >
            Explore Problems
          </Link>
          {isAuthenticated && (
            <Link
              to="/submissions"
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              My Submissions
            </Link>
          )}
        </div>
      </div>

      {/* About Platform Section */}
      <div className="bg-blue-50 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          About Our Platform
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Real Coding Challenges
            </h3>
            <p className="text-gray-700">
              Solve problems from beginner to advanced levels with automatic
              judging and instant feedback on your solutions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Competitive Environment
            </h3>
            <p className="text-gray-700">
              Participate in contests, climb leaderboards, and compare your
              solutions with others.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Detailed Analytics
            </h3>
            <p className="text-gray-700">
              Get insights into your performance with execution time, memory
              usage, and code quality metrics.
            </p>
          </div>
        </div>
      </div>

      {/* Supported Languages Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Supported Programming Languages
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 align-middle">
          {[
            { name: "Python", version: "3.8", icon: "🐍" },
            { name: "JavaScript", version: "Node 16", icon: "📜" },
            { name: "Java", version: "JDK 11", icon: "☕" },
            { name: "C++", version: "17", icon: "➕➕" },
            // { name: "C", version: "GCC 9", icon: "🔧" },
            { name: "Ruby", version: "3.0", icon: "💎" },
            { name: "Go", version: "1.16", icon: "🚀" },
            { name: "Rust", version: "1.50", icon: "🦀" },
            // { name: "Kotlin", version: "1.5", icon: "📱" },
            // { name: "Swift", version: "5.3", icon: "🍏" },
            // { name: "PHP", version: "8.0", icon: "🐘" },
            { name: "TypeScript", version: "4.2", icon: "🔷" },
          ].map((lang) => (
            <div
              key={lang.name}
              className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">{lang.icon}</div>
              <h3 className="font-bold text-lg">{lang.name}</h3>
              <p className="text-sm text-gray-600">{lang.version}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Ready to Start Coding?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join our community of developers and take your programming skills to
          the next level
        </p>
        <Link
          to={isAuthenticated ? "/problems" : "/register"}
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg shadow-lg hover:shadow-xl"
        >
          {isAuthenticated ? "Solve Problems Now" : "Create Free Account"}
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
