import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import React from "react";

/**
 * Component for submitting code solutions to problems
 * @param {Object} props - Component props
 * @param {Object} props.problem - The problem object being solved
 * @param {Function} props.onSubmit - Callback function when form is submitted
 */
export function SubmissionForm({ problem, onSubmit }) {
  const [sourceCode, setSourceCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const idUser = localStorage.getItem("idUser");

  // Supported programming languages with their display names
  const languages = [
    { id: "python", name: "Python" },
    { id: "javascript", name: "JavaScript" },
    { id: "java", name: "Java" },
    { id: "cpp", name: "C++" },
    { id: "ruby", name: "Ruby" },
    { id: "go", name: "Go" },
    { id: "rust", name: "Rust" },
    { id: "typescript", name: "TypeScript" },
  ];

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sourceCode.trim()) {
      alert("Please enter the source code");
      return;
    }

    setIsSubmitting(true);

    try {
      const submission = {
        sourceCode,
        language,
        problemId: problem.codProblem,
        userId: idUser, // This should come from the authentication system
      };

      await onSubmit(submission);
      setSourceCode(""); // Clear code after submission
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Problem details section */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-7xl mx-auto p-6 space-y-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>

          {/* Problem metadata tags */}
          <div className="flex flex-wrap gap-2 mb-4 mt-4">
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

          {/* Problem description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{problem.description}</p>
          </div>

          {/* Input/output formats and constraints */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Input Format</h2>
              <p className="text-gray-700">{problem.inputFormat}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Output Format</h2>
              <p className="text-gray-700">{problem.outputFormat}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Constraints</h2>
              <p className="text-gray-700">
                <ul className="list-disc pl-5">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
        </div>

        {/* Submission form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-5 text-center space-x-20">
            <label
              htmlFor="language"
              className="text-2xl font-medium text-gray-700 mb-5 mt-5"
            >
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-2xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Code editor */}
          <div className="mb-4">
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <Editor
                height="500px"
                language={language}
                value={sourceCode}
                onChange={(value) => setSourceCode(value ?? "")}
                theme="vs-dark"
                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit Solution"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmissionForm;
