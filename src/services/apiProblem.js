const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// mostrar un problema según el id

export async function findProbleById(id) {
  const response = await fetch(`${BACKEND_URL}/api/problems/findOne/${id}`)
  if (!response.ok) {
    throw new Error(`Problema no encontrado con ID: ${id}`)
  }
  return await response.json()
}

// mostrar todos los problemas
export async function fetchProblems() {
    const response = await fetch(`${BACKEND_URL}/api/problems/all`);
    if (!response.ok) {
        throw new Error("Problemas al obtener los datos");
    }
    return await response.json();
}

export async function createProblem(problem) {
    const response = await fetch(`${BACKEND_URL}/api/problems/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(problem),
    });

    if (!response.ok) {
        throw new Error("Problemas al enviar la solución");
    }
    return await response.json();

}