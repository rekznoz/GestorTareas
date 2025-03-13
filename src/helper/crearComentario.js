
const crearComentario = async (comentario) => {
    if (!comentario) throw new Error("El comentario es requerido");

    const res = await fetch(`${import.meta.env.VITE_API_URL_COMENTARIOS}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comentario),
    });

    const respuesta = await res.json();

    if (respuesta.status !== "success") {
        throw new Error(respuesta.message);
    }

    return respuesta.data;
}

export default crearComentario;