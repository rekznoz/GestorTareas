/**
 * Función que obtiene los comentarios de una tarea
 * @param id
 * @returns {Promise<*>}
 */
const getComentarioFromTarea = async (id) => {
    if (!id) throw new Error("El ID de tarea es requerido");

    const res = await fetch(`${import.meta.env.VITE_API_URL_COMENTARIOS}?tarea_id=${id}`)
    const respuesta = await res.json();
    const data = respuesta.data;

    if (!Array.isArray(data)) {
        throw new Error("La respuesta de la API no es una lista de tareas");
    }

    return data.map(comentario => ({
        id: comentario.id,
        comentario: comentario.comentario,
        tarea: comentario.tarea,
        user: comentario.user,
    }));
}

export default getComentarioFromTarea;