function SubmissionDetails({ submission }) {
  if (!submission) return null

  // Función para obtener la clase CSS según el estado del envío
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
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status] || "bg-gray-100"}`}>
        {status.replace(/_/g, " ")}
      </span>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Envío: {submission.codSubmission.substring(0, 8)}...</h3>
        {getStatusBadge(submission.status)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Problema:</p>
          <p className="font-medium">{submission.problem?.title || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Lenguaje:</p>
          <p className="font-medium">{submission.language}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Tiempo de ejecución:</p>
          <p className="font-medium">{submission.executionTime ? `${submission.executionTime} s` : "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Memoria utilizada:</p>
          <p className="font-medium">{submission.memoryUsage ? `${submission.memoryUsage} KB` : "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Puntuación:</p>
          <p className="font-medium">{submission.score !== undefined ? `${submission.score}/100` : "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Fecha de envío:</p>
          <p className="font-medium">
            {submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : "N/A"}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Código fuente:</h4>
        <pre className="bg-gray-50 p-3 rounded overflow-x-auto text-sm font-mono">{submission.sourceCode}</pre>
      </div>

      {submission.result?.testResults && (
        <div>
          <h4 className="font-medium mb-2">Resultados de casos de prueba:</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Caso
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiempo
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Memoria
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submission.result.testResults.map((result, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">Caso {index + 1}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">{getStatusBadge(result.status)}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">{result.executionTime} s</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">{result.memoryUsed} KB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubmissionDetails
