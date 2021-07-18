<template>
  <button @click="show">Click me</button>
  <div :class="{ 'dropdown-menu': true, 'dropdown-visible': visible }">
    <slot>
      No Content
    </slot>
  </div>
</template>

<script>
export default {
  name: "VueDropdown",
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true;
    }
  }
}
</script>

<style scoped>

  .dropdown-menu:not(.dropdown-visible) {
    display: none;
  }


</style>
