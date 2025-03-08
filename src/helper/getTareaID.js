// http://127.0.0.1:8000/api/v1/tareas

export const getTareaID = async (id) => {
    if (!id) throw new Error("El ID de usuario es requerido");

    const res = await fetch(`http://127.0.0.1:8000/api/v1/tareas/${id}`);
    const data = await res.json();

    if (!data) throw new Error("No se encontraron tareas");

    return data;

};
