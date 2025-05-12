import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSubmission } from "../services/apiSubmission";
import { findProbleById } from "../services/apiProblem";
import SubmissionForm from "../components/submissionForm";

function SubmissionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProblem() {
      try {
        setLoading(true);
        const data = await findProbleById(id);
        setProblem(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar el problema:", err);
        setError(
          "Error al cargar el problema. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProblem();
  }, [id]);

  const handleSubmit = async (submission) => {
    try {
      const result = await createSubmission(submission);
      navigate(`/submissions/${result.codSubmission}`);
    } catch (err) {
      console.error("Error al enviar la solución:", err);
      alert("Hubo un problema al enviar la solución. Inténtalo nuevamente.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Cargando problema...</p>
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

  if (!problem) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Problema no encontrado.</p>
      </div>
    );
  }

  return <SubmissionForm problem={problem} onSubmit={handleSubmit} />;
}

export default SubmissionPage;
