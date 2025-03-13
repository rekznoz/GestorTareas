
const getComentarioFromTarea = async (id) => {
    if (!id) throw new Error("El ID de tarea es requerido");

    const res = await fetch(`${import.meta.env.VITE_API_URL_COMENTARIOS}?tarea_id=${id}`)
    const respuesta = await res.json();
    const data = respuesta.data;

    if (!Array.isArray(data)) {
        throw new Error("La respuesta de la API no es una lista de tareas");
    }

    /*
    {
      "id": 1955,
      "comentario": "Molestias quis in laudantium quae ex vero. Voluptatum quidem eaque repellendus voluptas praesentium aperiam. Esse molestias eius distinctio impedit.",
      "tarea_id": 196,
      "user_id": 1966
    },
    */

    return data.map(comentario => ({
        id: comentario.id,
        comentario: comentario.comentario,
        tarea_id: comentario.tarea_id,
        user_id: comentario.user_id,
    }));
}

export default getComentarioFromTarea;