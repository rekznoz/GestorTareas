
export const crearTarea = async (tarea) => {
    const res = await fetch(import.meta.env.VITE_API_URL_TAREAS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarea),
    });
    const data = await res.json();
    if (res.status !== 201) {
        throw new Error(data.message);
    }
    return data;
}
