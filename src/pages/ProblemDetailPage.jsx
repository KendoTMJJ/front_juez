import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteProblem, findProbleById } from "../services/apiProblem";
import { isAdmin, isMaster } from "../servicesUsuarios/authService";

function ProblemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = !!localStorage.getItem("authToken");

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      setLoading(true);
      const data = await findProbleById(id);
      setProblem(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching problem:", err);
      setError("Error loading problem. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this problem?")) {
      try {
        await deleteProblem(id);
        navigate("/problems");
      } catch (err) {
        console.error("Error deleting problem:", err);
        alert("Error while deleting the problem. Please try again later.");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Loading problem...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Problem not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-7xl mx-auto p-6 space-y-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>

          {isAuthenticated && (isAdmin() || isMaster()) && (
            <div className="flex space-x-2">
              <Link
                to={`/problems/edit/${id}`}
                className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              problem.difficulty === "easy"
                ? "bg-green-100 text-green-800"
                : problem.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {problem.difficulty}
          </span>
          {problem.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 rounded">
              {tag}
            </span>
          ))}
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              problem.isPublic
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {problem.isPublic ? "Public" : "Private"}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{problem.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Input format</h2>
            <p className="text-gray-700">{problem.inputFormat}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Output format</h2>
            <p className="text-gray-700">{problem.outputFormat}</p>
          </div>

          <div className="text-gray-700">
            <ul className="list-disc pl-5">
              {problem.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>

        {problem.testCases && problem.testCases.some((tc) => tc.isSample) && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Examples</h2>
            <div className="space-y-4">
              {problem.testCases
                .filter((tc) => tc.isSample)
                .map((testCase, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <h3 className="text-sm font-medium mb-1">Input</h3>
                      <pre className="text-sm whitespace-pre-wrap">
                        {testCase.input}
                      </pre>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <h3 className="text-sm font-medium mb-1">Output</h3>
                      <pre className="text-sm whitespace-pre-wrap">
                        {testCase.expectedOutput}
                      </pre>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div>
          {isAuthenticated && (
            <button className="text-white">
              <Link to={`/problems/${id}/submit`}>Solve this problem</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProblemDetailPage;
