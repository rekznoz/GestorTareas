import userStore from "@/stores/userStore.js";

export const crearTarea = async (tarea) => {
    try {
        tarea.user_id = userStore().user.id
        const res = await fetch(import.meta.env.VITE_API_URL_TAREAS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Barier token
                'Authorization': `Bearer ${userStore().access_token}`
            },
            body: JSON.stringify(tarea),
        });

        if (!res.ok) {
            const text = await res.text();  // Obtener el contenido como texto
            console.error("Error en la respuesta del servidor:", text);
            return
        }

        // Intentar obtener JSON si la respuesta es correcta
        return await res.json();
    } catch (error) {
        console.error("Error en crearTarea:", error);
        throw new Error(error.message || 'Error desconocido');
    }
}
