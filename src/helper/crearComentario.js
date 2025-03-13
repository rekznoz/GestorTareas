import userStore from "@/stores/userStore.js";

/**
 * Crea un comentario en la base de datos con el objeto comentario
 * @param comentario
 * @returns {Promise<*>}
 */
const crearComentario = async (comentario) => {
    if (!comentario) throw new Error("El comentario es requerido");

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL_COMENTARIOS}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${userStore().access_token}`
            },
            body: JSON.stringify(comentario),
        });

        const respuesta = await res.json();
        return respuesta.data;

    } catch (error) {
        console.error("Error al crear comentario:", error);
        throw new Error(error.message || "Error inesperado en la creación del comentario");
    }
};

export default crearComentario;
