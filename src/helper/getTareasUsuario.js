// http://127.0.0.1:8000/api/v1/tareas

export const getTareasUsuario = async (id) => {
    if (!id) throw new Error("El ID de usuario es requerido");

    const res = await fetch(`${import.meta.env.VITE_API_URL_TAREAS}?user_id=${id}`);
    const respuesta = await res.json();
    const data = respuesta.data;

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
