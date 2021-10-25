<template>
  <v-textarea :value="content"/>
</template>

<script>
export default {
  name: "FileEditor",
  components: {
  },
  props: {
    content: String,
  }
}
</script>

<style scoped>

</style>
