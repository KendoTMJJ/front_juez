import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import React from 'react';

export function SubmissionForm({ problem, onSubmit }) {
    const [sourceCode, setSourceCode] = useState("");
    const [language, setLanguage] = useState("python");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const languages = [
        { id: "python", name: "Python" },
        { id: "javascript", name: "JavaScript" },
        { id: "java", name: "Java" },
        { id: "cpp", name: "C++" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sourceCode.trim()) {
            alert("Por favor, ingresa el código fuente");
            return;
        }

        setIsSubmitting(true);

        try {
            const submission = {
                sourceCode,
                language,
                problemId: problem.codProblem,
                userId: "test-user-id", // Este valor debería venir del sistema de autenticación
            };

            await onSubmit(submission);
            setSourceCode(""); // Limpiar código después del envío
        } finally {
            setIsSubmitting(false);
        }
    };

    return (

    <div>

        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">{problem.title}</h1>

                    <div className="mb-10 text-center">
                        <h2 className="text-lg font-semibold mb-2">Descripción</h2>
                        <p className="text-gray-700">{problem.description}</p>
                    </div>


                    <div className="grid md:grid-cols-2 gap-4 mb-6">

                        <div>
                            <h2 className="text-lg font-semibold mb-2">Formato de entrada</h2>
                            <p className="text-gray-700">{problem.inputFormat}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Formato de salida</h2>
                            <p className="text-gray-700">{problem.outputFormat}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">Restricciones</h2>
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

        </div>      

            <form onSubmit={handleSubmit}>
                <div className="mb-4 mt-5 text-center space-x-20">
                    <label htmlFor="language" className="text-2xl font-medium text-gray-700 mb-5 mt-5">
                        Lenguaje
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

                <div className="mb-4">
                
                    <div className="border border-gray-300 rounded-md overflow-hidden">
                        <Editor
                            height="300px"
                            language={language}
                            value={sourceCode}
                            onChange={(value) => setSourceCode(value ?? "")}
                            theme="vs-dark"
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono'
                            />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                    {isSubmitting ? "Enviando..." : "Enviar solución"}
                </button>
            </form>
        
    </div>
    );
}

export default SubmissionForm;
