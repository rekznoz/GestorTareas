import userStore from "@/stores/userStore.js";

/**
 * Edita una tarea en la base de datos con el objeto tarea
 * @param tarea
 * @returns {Promise<any|null>}
 */
export const editarTarea = async (tarea) => {
    console.log("editarTarea", tarea);
    tarea.user_id = userStore().user.id
    try {
        const token = userStore().access_token;

        if (!token) {
            console.error("No hay token de acceso.");
            return
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL_TAREAS}/${tarea.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(tarea)
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
        console.error("Error en editarTarea:", error.message);
        throw error;
    }
}