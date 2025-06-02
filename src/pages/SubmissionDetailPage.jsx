import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getSubmissionById } from "../services/apiSubmission";

function SubmissionDetailPage() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubmission();
  }, [id]);

  const fetchSubmission = async () => {
    try {
      setLoading(true);
      const data = await getSubmissionById(id);
      setSubmission(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching submission:", err);
      setError(
        "Error loading submission. Please try again later."
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
        className={`px-2 py-1 rounded-full ${
          statusColors[status] || "bg-gray-100"
        }`}
      >
        {status.replace(/_/g, " ")}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Loading submission...</p>
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

  if (!submission) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Submission not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-7xl mx-auto p-6 space-y-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {/* Submission: {submission.codSubmission.substring(0, 8)}... */}
            Submission
          </h1>
          {getStatusBadge(submission.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Problem</h2>
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
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Language</h2>
            <p>{submission.language}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">
              Execution Time
            </h2>
            <p>
              {submission.executionTime
                ? `${submission.executionTime} s`
                : "N/A"}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">
              Memory Used
            </h2>
            <p>
              {submission.memoryUsage ? `${submission.memoryUsage} KB` : "N/A"}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Score</h2>
            <p>
              {submission.score !== undefined
                ? `${submission.score}/100`
                : "N/A"}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">
              Submission Date
            </h2>
            <p>
              {submission.submittedAt
                ? new Date(submission.submittedAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Source Code</h2>
          <pre className="bg-gray-50 p-4 rounded overflow-x-auto text-sm font-mono">
            {submission.sourceCode}
          </pre>
        </div>

        {submission.result?.testResults && (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Test Case Results
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Case
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Memory
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Output
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submission.result.testResults.map((result, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        Case {index + 1}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        {getStatusBadge(result.status)}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        {result.executionTime} s
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        {result.memoryUsed} KB
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {result.stdout && (
                          <div className="mb-2">
                            <h3 className="text-xs font-medium text-gray-500">
                              Standard Output:
                            </h3>
                            <pre className="text-xs bg-gray-50 p-1 rounded">
                              {result.stdout}
                            </pre>
                          </div>
                        )}
                        {result.stderr && (
                          <div className="mb-2">
                            <h3 className="text-xs font-medium text-gray-500">
                              Standard Error:
                            </h3>
                            <pre className="text-xs bg-gray-50 p-1 rounded">
                              {result.stderr}
                            </pre>
                          </div>
                        )}
                        {result.compileOutput && (
                          <div>
                            <h3 className="text-xs font-medium text-gray-500">
                              Compile Output:
                            </h3>
                            <pre className="text-xs bg-gray-50 p-1 rounded">
                              {result.compileOutput}
                            </pre>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 flex space-x-4">
          {submission.problem && (
            <Link
              to={`/problems/${submission.problem.codProblem}/submit`}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Try Again
            </Link>
          )}
          <Link
            to="/submissions"
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            View All Submissions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SubmissionDetailPage;
