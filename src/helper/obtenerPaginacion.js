export const obtenerPaginacion = (tareas, paginaActual, tareasPorPagina) => {
    const inicio = (paginaActual - 1) * tareasPorPagina;
    const fin = inicio + tareasPorPagina;
    return tareas.slice(inicio, fin);
};
