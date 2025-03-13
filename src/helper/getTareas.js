/**
 * Obtiene la lista de tareas de la API
 * @returns {Promise<*>}
 */
export const getTareas = async () => {

    const res = await fetch(import.meta.env.VITE_API_URL_TAREAS);
    const data = await res.json();

    if (!Array.isArray(data)) {
        throw new Error("La respuesta de la API no es una lista de tareas");
    }

    return data.map(tarea => ({
        id: tarea.id,
        nombre: tarea.nombre,
        descripcion: tarea.descripcion,
        fecha_inicio: tarea.fecha_inicio,
        fecha_fin: tarea.fecha_fin,
        estado: tarea.estado,
        user_id: tarea.user.id,
    }));

};
