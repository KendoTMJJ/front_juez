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
        console.error("Error loading problem:", err);
        setError(
          "Error loading problem. Please try again later."
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
      console.error("Error submitting solution:", err);
      alert("There was a problem submitting the solution. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Loading problem...</p>
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
        <p className="text-gray-500">Problem not found.</p>
      </div>
    );
  }

  return <SubmissionForm problem={problem} onSubmit={handleSubmit} />;
}

export default SubmissionPage;
