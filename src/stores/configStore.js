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
        },
        loadData() {
            const storedDragAndDrop = JSON.parse(localStorage.getItem("dragAndDrop"));
            if (storedDragAndDrop !== null) {
                this.dragAndDrop = storedDragAndDrop;
            }

            const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
            if (storedDarkMode !== null) {
                this.darkMode = storedDarkMode;
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
