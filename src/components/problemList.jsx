import { useState } from "react";

export function ProblemList({ problems, onSelectProblem }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (problem) => {
    setSelectedId(problem.codProblem);
    onSelectProblem(problem);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {problems.map((problem) => (
          <li
            key={problem.codProblem}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedId === problem.codProblem ? "bg-blue-50" : ""
            }`}
            onClick={() => handleSelect(problem)}
          >
            <div className="flex justify-between">
              <h3 className="font-medium">{problem.title}</h3>
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
            </div>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {problem.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {problem.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemList;
