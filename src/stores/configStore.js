import { defineStore } from "pinia";

const configStore = defineStore("configStore", {
    state: () => ({
        dragAndDrop: false,
        darkMode: false,
    }),

    actions: {
        setDragAndDrop(value) {
            this.dragAndDrop = value;
            console.log(value);  // Puedes dejar este log si es necesario para depuración
            localStorage.setItem("dragAndDrop", JSON.stringify(this.dragAndDrop));
        },
        setDarkMode(value) {
            this.darkMode = value;
            console.log(value);  // Lo mismo aquí, si es útil para la depuración
            localStorage.setItem("darkMode", JSON.stringify(this.darkMode));
            // Aquí puedes agregar el código para cambiar el tema de tu aplicación
            // agregar/quitar la clase darkMode al body
            document.body.classList.toggle("darkMode", this.darkMode);
        },
        loadData() {
            const storedDragAndDrop = JSON.parse(localStorage.getItem("dragAndDrop"));
            if (storedDragAndDrop !== null) {
                this.dragAndDrop = storedDragAndDrop;
            }

            const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
            if (storedDarkMode !== null) {
                this.darkMode = storedDarkMode;
                document.body.classList.toggle("darkMode", this.darkMode);
            }
        }
    },

    persist: {
        enabled: true,
        key: "configStore",
        storage: localStorage, // Pinia se encarga de la persistencia automáticamente
    },
});

export default configStore;
