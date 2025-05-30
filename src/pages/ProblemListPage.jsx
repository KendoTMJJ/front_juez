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
      console.error("Error al cargar problemas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProblems();
  }, [loadProblems]); // ✅ Dependencia agregada correctamente

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Problemas</h1>
        {isAuthenticated && isAdmin() && (
          <Link
            to="/problems/create"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
          >
            Crear Problema
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
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dificultad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Etiquetas
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
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
                      {/* Enlace "Resolver" con verificación de autenticación */}
                      {isAuthenticated ? (
                        <Link
                          to={`/problems/${problem.codProblem}/submit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Resolver
                        </Link>
                      ) : (
                        <Link
                          to="/login"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Resolver
                        </Link>
                      )}

                      {isAuthenticated && isAdmin() && (
                        <Link
                          to={`/problems/edit/${problem.codProblem}`}
                          className="text-gray-600 hover:text -gray-900"
                        >
                          Editar
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
