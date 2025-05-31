import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProblem } from "../services/apiProblem";

function CreateProblemPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    constraints: [""],
    timeLimit: 1000,
    memoryLimit: 128000,
    difficulty: "easy",
    isPublic: true,
    tags: [""],
    testCases: [
      {
        input: "",
        expectedOutput: "",
        isSample: true,
        score: 25,
      },
    ],
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleConstraintChange = (index, value) => {
    const newConstraints = [...formData.constraints];
    newConstraints[index] = value;
    setFormData({ ...formData, constraints: newConstraints });
  };

  const addConstraint = () => {
    setFormData({
      ...formData,
      constraints: [...formData.constraints, ""],
    });
  };

  const removeConstraint = (index) => {
    const newConstraints = [...formData.constraints];
    newConstraints.splice(index, 1);
    setFormData({ ...formData, constraints: newConstraints });
  };

  const handleTagChange = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData({ ...formData, tags: newTags });
  };

  const addTag = () => {
    setFormData({
      ...formData,
      tags: [...formData.tags, ""],
    });
  };

  const removeTag = (index) => {
    const newTags = [...formData.tags];
    newTags.splice(index, 1);
    setFormData({ ...formData, tags: newTags });
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...formData.testCases];
    newTestCases[index] = {
      ...newTestCases[index],
      [field]:
        field === "isSample"
          ? value === "true"
          : field === "score"
          ? Number.parseInt(value, 10)
          : value,
    };
    setFormData({ ...formData, testCases: newTestCases });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [
        ...formData.testCases,
        {
          input: "",
          expectedOutput: "",
          isSample: false,
          score: 25,
        },
      ],
    });
  };

  const removeTestCase = (index) => {
    const newTestCases = [...formData.testCases];
    newTestCases.splice(index, 1);
    setFormData({ ...formData, testCases: newTestCases });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // make sure all required fields are filled
    if (
      !formData.title ||
      !formData.description ||
      !formData.inputFormat ||
      !formData.outputFormat
    ) {
      alert("please fill all required fields.");
      return;
    }

    // make sure that there is at least one test case
    if (formData.testCases.length === 0) {
      alert("please add at least one test case.");
      return;
    }

    // make sure that the sum of scores is 100
    const totalScore = formData.testCases.reduce(
      (sum, tc) => sum + tc.score,
      0
    );
    if (totalScore !== 100) {
      alert(
        `The sum of scores must be 100. Currently it is ${totalScore}.`
      );
      return;
    }

    try {
      setSubmitting(true);

      // Filter empty tags and constraints
      const cleanedData = {
        ...formData,
        tags: formData.tags.filter((tag) => tag.trim() !== ""),
        constraints: formData.constraints.filter(
          (constraint) => constraint.trim() !== ""
        ),
      };

      const data = await createProblem(cleanedData);

      console.log(data);

      navigate(`/problems/${data.codProblem}`);
    } catch (err) {
      console.error("Error creating problem:", err);
      alert(
        "An error occurred while creating the problem. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create new problem
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Basic information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Basic information</h2>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="inputFormat"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Input format *
                </label>
                <textarea
                  id="inputFormat"
                  name="inputFormat"
                  value={formData.inputFormat}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="outputFormat"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Output format *
                </label>
                <textarea
                  id="outputFormat"
                  name="outputFormat"
                  value={formData.outputFormat}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Restrictions */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Restrictions</h2>

              {formData.constraints.map((constraint, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={constraint}
                    onChange={(e) =>
                      handleConstraintChange(index, e.target.value)
                    }
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: 1 ≤ n ≤ 10^5"
                  />
                  <button
                    type="button"
                    onClick={() => removeConstraint(index)}
                    className="ml-2 px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                  >
                    Eliminar
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addConstraint}
                className="mt-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                + Add restriction
              </button>
            </div>

            {/* Configuration */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Configuration</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="timeLimit"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Time limit (ms)
                  </label>
                  <input
                    type="number"
                    id="timeLimit"
                    name="timeLimit"
                    value={formData.timeLimit}
                    onChange={handleChange}
                    min="100"
                    max="10000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="memoryLimit"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Memory limit (KB)
                  </label>
                  <input
                    type="number"
                    id="memoryLimit"
                    name="memoryLimit"
                    value={formData.memoryLimit}
                    onChange={handleChange}
                    min="1000"
                    max="1000000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="difficulty"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isPublic"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Public problem
                  </label>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Tags</h2>

              {formData.tags.map((tag, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: matemáticas, principiante"
                  />
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-2 px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                  >
                    Eliminar
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addTag}
                className="mt-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                + Add tag
              </button>
            </div>

            {/* Test cases */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Test cases</h2>

              {formData.testCases.map((testCase, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Test case #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Input
                      </label>
                      <textarea
                        value={testCase.input}
                        onChange={(e) =>
                          handleTestCaseChange(index, "input", e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Excpected Output
                      </label>
                      <textarea
                        value={testCase.expectedOutput}
                        onChange={(e) =>
                          handleTestCaseChange(
                            index,
                            "expectedOutput",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        value={testCase.isSample.toString()}
                        onChange={(e) =>
                          handleTestCaseChange(
                            index,
                            "isSample",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="true">Example (visible)</option>
                        <option value="false">Hidden (for evaluation)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Score
                      </label>
                      <input
                        type="number"
                        value={testCase.score}
                        onChange={(e) =>
                          handleTestCaseChange(index, "score", e.target.value)
                        }
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addTestCase}
                className="mt-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                + Add test case
              </button>

              <p className="mt-2 text-sm text-gray-500">
                Note: The sum of scores for all test cases must be 100.
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/problems")}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {submitting ? "Creating..." : "Create Problem"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProblemPage;
