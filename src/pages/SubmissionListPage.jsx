import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllSubmissions } from "../services/apiSubmission";

function SubmissionListPage() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.codUser;

  const [searchParams] = useSearchParams();
  const problemId = searchParams.get("problemId");

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; // No hay usuario autenticado
    fetchSubmissions();
  }, [userId]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getAllSubmissions({ problemId, userId });
      setSubmissions(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setError(
        "Error al cargar los envíos. Por favor, intenta de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      accepted: "bg-green-100 text-green-800",
      wrong_answer: "bg-red-100 text-red-800",
      compilation_error: "bg-orange-100 text-orange-800",
      runtime_error: "bg-orange-100 text-orange-800",
      time_limit_exceeded: "bg-yellow-100 text-yellow-800",
      memory_limit_exceeded: "bg-yellow-100 text-yellow-800",
      internal_error: "bg-gray-100 text-gray-800",
      pending: "bg-blue-100 text-blue-800",
      evaluating: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          statusColors[status] || "bg-gray-100"
        }`}
      >
        {status.replace(/_/g, " ")}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {problemId
            ? "Envíos para este problema"
            : userId
            ? "Mis envíos"
            : "Todos los envíos"}
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Cargando envíos...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No hay envíos disponibles.</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Problema
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lenguaje
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiempo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Memoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.codSubmission} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/submissions/${submission.codSubmission}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Solución
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.problem ? (
                      <Link
                        to={`/problems/${submission.problem.codProblem}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {submission.problem.title}
                      </Link>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(submission.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.language}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.executionTime
                      ? `${submission.executionTime} s`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.memoryUsage
                      ? `${submission.memoryUsage} KB`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.submittedAt
                      ? new Date(submission.submittedAt).toLocaleString()
                      : "N/A"}
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

export default SubmissionListPage;
