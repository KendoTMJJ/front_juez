const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// mostrar todos los submissions
export async function fetchSubmissions() {
    const response = await fetch(`${BACKEND_URL}/api/submissions/all`);
    if (!response.ok) {
        throw new Error("Problemas al obtener los datos");
    }
    return await response.json();
}

// crear una Submission para un problema

export async function createSubmission(submission) {
    const response = await fetch(`${BACKEND_URL}/api/submissions/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
    });

    if (!response.ok) {
        throw new Error("Problemas al enviar la solución");
    }
    return await response.json();

}

// Función mock para simular la API
export async function fetchUserSubmissions(userId) {
  // Simulamos un retraso de red
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Datos mock para pruebas
  const mockSubmissions = [
    {
      id: "1",
      problemTitle: "Suma de dos números",
      status: "Aceptado",
      createdAt: "2023-05-15T10:30:00Z",
      language: "JavaScript"
    },
    {
      id: "2",
      problemTitle: "Fibonacci",
      status: "Rechazado",
      createdAt: "2023-05-10T14:45:00Z",
      language: "Python"
    },
    {
      id: "3",
      problemTitle: "Palíndromos",
      status: "En Proceso",
      createdAt: "2023-05-05T09:15:00Z",
      language: "Java"
    }
  ];

  // Filtramos por el ID quemado (aunque en este mock todos son del mismo usuario)
  return mockSubmissions.filter(sub => sub.userId === userId || true);
}
