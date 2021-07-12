<template>
  <div>
    <font-awesome-icon :icon="fileObj.file_type == 'regular file' ? 'file' : 'folder'"/>
    {{ fileObj.file_name }}
  </div>
</template>

<script>
export default {
  name: "FileListItem",
  props: {
    fileObj: Object
  },
  methods: {
    loadFolder() {
      this.$store.dispatch("volumes/loadFolder", { axios: this.axios, volumeId: this.$route.params.volumeName, path: this.fileObj.file_name })
    }
  }
}
</script>

<style scoped>

</style>