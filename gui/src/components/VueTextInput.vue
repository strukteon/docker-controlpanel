<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id">{{ label }}</label>
    <input :id="id" :type="type" :value="value" :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  name: "VueTextInput",
  props: {
    type: {
      type: String,
      required: true
    },
    label: String,
    placeholder: String,
    value: Object
  },
  data() {
    return {
      id: ''
    }
  },
  mounted() {
    this.id = this._uid;
  }
}
</script>

<style scoped>
  .input-wrapper{
    display: flex;
    flex-direction: column;
    padding: .5rem;
  }
  label {
    text-transform: uppercase;
    line-height: .9rem;
    font-size: .75rem;
    font-weight: 500;
    color: #287c97;
  }

  input {
    border: none;
    outline: none;
    font-family: Poppins, sans-serif;
    background-color: rgba(0, 0, 0, .05);
    border-radius: .25rem;
  }
</style>
