<script>
export default {
  name: "ModalComentario",
  data() {
    return {
      comentario: "",
    };
  },
  methods: {
    guardarComentario() {
      if (!this.comentario.trim()) return;

      const nuevoComentario = {
        id: Date.now(), // Simulación de ID
        texto: this.comentario,
        fecha: new Date().toLocaleDateString(),
      };

      this.$emit("guardar", nuevoComentario);
      this.comentario = "";
    },
  },
};
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>Agregar Comentario</h3>
      <textarea v-model="comentario" placeholder="Escribe tu comentario..."></textarea>
      <div class="modal-buttons">
        <button @click="$emit('cerrar')" class="btn-cancelar">Cancelar</button>
        <button @click="guardarComentario" class="btn-guardar">Guardar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-top: 10px;
  box-sizing: border-box;
  resize: none;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn-cancelar {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
}

.btn-guardar {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
}
</style>
