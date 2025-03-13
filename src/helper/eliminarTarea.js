import userStore from "@/stores/userStore.js";

/**
 * Elimina una tarea en la base de datos con el id
 * @param id
 * @returns {Promise<any|null>}
 */
export const eliminarTarea = async (id) => {
    try {
        const token = userStore().access_token;

        if (!token) {
            console.error("No hay token de acceso.");
            return
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL_TAREAS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Si la respuesta no es OK, intentamos obtener detalles
        if (!res.ok) {
            const text = await res.text();
            console.error("Error en la respuesta del servidor:", text);
            return
        }

        // Intentamos parsear la respuesta como JSON
        try {
            return await res.json();
        } catch (error) {
            console.warn("No se pudo parsear la respuesta como JSON.");
            return null;
        }
    } catch (error) {
        console.error("Error en eliminarTarea:", error.message);
        throw error;
    }
};
