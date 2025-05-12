"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function EditProblemPage() {
  const { id } = useParams()
  const navigate = useNavigate()
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
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProblem()
  }, [id])

  const fetchProblem = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3000/problems/findOne/${id}`)

      // Asegurarse de que constraints y tags sean arrays
      const problem = {
        ...response.data,
        constraints: Array.isArray(response.data.constraints) ? response.data.constraints : [""],
        tags: Array.isArray(response.data.tags) ? response.data.tags : [""],
        testCases:
          Array.isArray(response.data.testCases) && response.data.testCases.length > 0
            ? response.data.testCases
            : [
                {
                  input: "",
                  expectedOutput: "",
                  isSample: true,
                  score: 25,
                },
              ],
      }

      setFormData(problem)
      setError(null)
    } catch (err) {
      console.error("Error fetching problem:", err)
      setError("Error al cargar el problema. Por favor, intenta de nuevo más tarde.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleConstraintChange = (index, value) => {
    const newConstraints = [...formData.constraints]
    newConstraints[index] = value
    setFormData({ ...formData, constraints: newConstraints })
  }

  const addConstraint = () => {
    setFormData({
      ...formData,
      constraints: [...formData.constraints, ""],
    })
  }

  const removeConstraint = (index) => {
    const newConstraints = [...formData.constraints]
    newConstraints.splice(index, 1)
    setFormData({ ...formData, constraints: newConstraints })
  }

  const handleTagChange = (index, value) => {
    const newTags = [...formData.tags]
    newTags[index] = value
    setFormData({ ...formData, tags: newTags })
  }

  const addTag = () => {
    setFormData({
      ...formData,
      tags: [...formData.tags, ""],
    })
  }

  const removeTag = (index) => {
    const newTags = [...formData.tags]
    newTags.splice(index, 1)
    setFormData({ ...formData, tags: newTags })
  }

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...formData.testCases]
    newTestCases[index] = {
      ...newTestCases[index],
      [field]: field === "isSample" ? value === "true" : field === "score" ? Number.parseInt(value, 10) : value,
    }
    setFormData({ ...formData, testCases: newTestCases })
  }

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
    })
  }

  const removeTestCase = (index) => {
    const newTestCases = [...formData.testCases]
    newTestCases.splice(index, 1)
    setFormData({ ...formData, testCases: newTestCases })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar que los campos requeridos estén completos
    if (!formData.title || !formData.description || !formData.inputFormat || !formData.outputFormat) {
      alert("Por favor, completa todos los campos requeridos.")
      return
    }

    // Validar que haya al menos un caso de prueba
    if (formData.testCases.length === 0) {
      alert("Debes añadir al menos un caso de prueba.")
      return
    }

    // Validar que la suma de puntuaciones sea 100
    const totalScore = formData.testCases.reduce((sum, tc) => sum + tc.score, 0)
    if (totalScore !== 100) {
      alert(`La suma de puntuaciones debe ser 100. Actualmente es ${totalScore}.`)
      return
    }

    try {
      setSubmitting(true)

      // Filtrar tags y constraints vacíos
      const cleanedData = {
        ...formData,
        tags: formData.tags.filter((tag) => tag.trim() !== ""),
        constraints: formData.constraints.filter((constraint) => constraint.trim() !== ""),
      }

      await axios.patch(`http://localhost:3000/problems/update/${id}`, cleanedData)
      navigate(`/problems/${id}`)
    } catch (err) {
      console.error("Error updating problem:", err)
      alert("Error al actualizar el problema. Por favor, intenta de nuevo más tarde.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Cargando problema...</p>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Problema</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Información básica */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Información Básica</h2>

              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
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
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción *
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
                <label htmlFor="inputFormat" className="block text-sm font-medium text-gray-700 mb-1">
                  Formato de entrada *
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
                <label htmlFor="outputFormat" className="block text-sm font-medium text-gray-700 mb-1">
                  Formato de salida *
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

            {/* Restricciones */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Restricciones</h2>

              {formData.constraints.map((constraint, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={constraint}
                    onChange={(e) => handleConstraintChange(index, e.target.value)}
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
                + Añadir restricción
              </button>
            </div>

            {/* Configuración */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Configuración</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-1">
                    Límite de tiempo (ms)
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
                  <label htmlFor="memoryLimit" className="block text-sm font-medium text-gray-700 mb-1">
                    Límite de memoria (KB)
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
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                    Dificultad
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="easy">Fácil</option>
                    <option value="medium">Medio</option>
                    <option value="hard">Difícil</option>
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
                  <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                    Problema público
                  </label>
                </div>
              </div>
            </div>

            {/* Etiquetas */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Etiquetas</h2>

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
                + Añadir etiqueta
              </button>
            </div>

            {/* Casos de prueba */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Casos de prueba</h2>

              {formData.testCases.map((testCase, index) => (
                <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Caso de prueba #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Entrada</label>
                      <textarea
                        value={testCase.input}
                        onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Salida esperada</label>
                      <textarea
                        value={testCase.expectedOutput}
                        onChange={(e) => handleTestCaseChange(index, "expectedOutput", e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                      <select
                        value={testCase.isSample.toString()}
                        onChange={(e) => handleTestCaseChange(index, "isSample", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="true">Ejemplo (visible)</option>
                        <option value="false">Oculto (para evaluación)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Puntuación</label>
                      <input
                        type="number"
                        value={testCase.score}
                        onChange={(e) => handleTestCaseChange(index, "score", e.target.value)}
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
                + Añadir caso de prueba
              </button>

              <p className="mt-2 text-sm text-gray-500">
                Nota: La suma de puntuaciones de todos los casos de prueba debe ser 100.
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate(`/problems/${id}`)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {submitting ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProblemPage
