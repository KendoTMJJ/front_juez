import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchProblems } from "../services/apiProblem";
import { isAdmin } from "../servicesUsuarios/authService";

function ProblemListPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!localStorage.getItem("authToken");

  const loadProblems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchProblems();
      setProblems(data);
    } catch (error) {
      console.error("Error loading problems:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProblems();
  }, [loadProblems]); 

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Problems</h1>
        {isAuthenticated && isAdmin() && (
          <Link
            to="/problems/create"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
          >
            Create Problem
          </Link>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {problems.map((problem) => (
                <tr key={problem.codProblem} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/problems/${problem.codProblem}`}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {problem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      {/* "Resolve" link with authentication verification */}
                      {isAuthenticated ? (
                        <Link
                          to={`/problems/${problem.codProblem}/submit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Resolve
                        </Link>
                      ) : (
                        <Link
                          to="/login"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Resolve
                        </Link>
                      )}

                      {isAuthenticated && isAdmin() && (
                        <Link
                          to={`/problems/edit/${problem.codProblem}`}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Edit
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProblemListPage;
