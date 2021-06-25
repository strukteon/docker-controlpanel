<template>
  <teleport to="body" v-if="open">
    <div class="modal-bg-dark" @click="close_cancel()"/>
    <div class="modal-wrapper">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button class="btn-close" @click="close_cancel()"><font-awesome-icon :icon="faTimes"/></button>
        </div>
        <div class="modal-content">
          {{ text }}
        </div>
        <div class="buttons">
          <button :class="`btn btn-${button_color}`" @click="close_okay()">Okay</button>
          <button class="btn" @click="close_cancel()">Cancel</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import {faTimes} from '@fortawesome/free-solid-svg-icons';
export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    button_color: {
      type: String,
      default: "blue"
    },
  },
  data() {
    return {
      faTimes,
      open: false,
    }
  },
  methods: {
    show() {
      this.open = true;
    },
    close_cancel() {
      this.open = false;
      this.$emit("cancel");
    },
    close_okay() {
      this.open = false;
      this.$emit("okay");
    }
  }
}
</script>

<style scoped>
  .modal-bg-dark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .6);
    z-index: 100;
  }
  .modal-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: white;
    display: inline-block;
    border-radius: 1rem;
    padding: 1rem;
    width: min(90%, 30rem);
    box-shadow: 1px 1px 5rem rgba(0, 0, 0, .2);
    z-index: 110;
  }

  .modal-header {
    display: flex;
    border-bottom: 4px solid rgba(0, 0, 0, .03);
    padding: 1rem;
  }
  .modal-title {
    flex-grow: 1;
  }
  .modal-content {
    padding: 1rem;
  }
  .buttons {
    display: flex;
    justify-content: right;
    align-items: end;
  }
  .buttons > button {
    padding: .6rem;
  }
  .buttons .btn-blue {
    background-color: #057cfc;
    color: white;
  }
  .buttons .btn-red {
    background-color: red;
    color: white;
  }
</style>
