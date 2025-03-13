
/**
 * Función que obtiene una tarea por ID
 * @param id
 * @returns {Promise<any>}
 */
export const getTareaID = async (id) => {
    if (!id) throw new Error("El ID de usuario es requerido");

    const res = await fetch(`${import.meta.env.VITE_API_URL_TAREAS}/${id}`);
    const data = await res.json();

    if (!data) throw new Error("No se encontraron tareas");

    return data;

};
