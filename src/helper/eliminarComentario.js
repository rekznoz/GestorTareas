import userStore from "@/stores/userStore.js";

/**
 * Elimina un comentario de la base de datos por su id
 * @param idComentario
 * @returns {Promise<any>}
 */
const eliminarComentario = async (idComentario) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL_COMENTARIOS}/${idComentario}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${userStore().access_token}`
            },
        });

        return await res.json();

    } catch (error) {
        console.error("Error al crear comentario:", error);
        throw new Error(error.message || "Error inesperado en la creación del comentario");
    }
}

export default eliminarComentario;