import { useState, useEffect } from "react";

function RankingsPage() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setRankings([
        { id: 1, username: "coder123", solvedProblems: 42, totalScore: 1850 },
        {
          id: 2,
          username: "algorithm_master",
          solvedProblems: 38,
          totalScore: 1720,
        },
        { id: 3, username: "debugger", solvedProblems: 35, totalScore: 1680 },
        { id: 4, username: "pythonista", solvedProblems: 33, totalScore: 1590 },
        { id: 5, username: "java_dev", solvedProblems: 30, totalScore: 1450 },
        { id: 6, username: "cpp_wizard", solvedProblems: 28, totalScore: 1380 },
        { id: 7, username: "code_ninja", solvedProblems: 25, totalScore: 1250 },
        {
          id: 8,
          username: "binary_search",
          solvedProblems: 22,
          totalScore: 1100,
        },
        {
          id: 9,
          username: "recursion_fan",
          solvedProblems: 20,
          totalScore: 980,
        },
        {
          id: 10,
          username: "dynamic_programmer",
          solvedProblems: 18,
          totalScore: 890,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Clasificación</h1>
      <p className="text-lg mb-8">
        Los mejores programadores basados en problemas resueltos y puntuación
        total.
      </p>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Posición
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Problemas Resueltos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Puntuación Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {rankings.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {user.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {user.solvedProblems}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {user.totalScore}
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

export default RankingsPage;
