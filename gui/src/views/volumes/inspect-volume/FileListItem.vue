<template>
  <tr @click="$emit('leftclick', fileObj)">
    <td>
      <font-awesome-icon :icon="fileObj.file_type === 'file' ? 'file' : 'folder'"/>
      {{ fileObj.file_name }}
    </td>
    <td>{{ new Date(fileObj.last_modification_time * 1000).toLocaleString() }}</td>
    <td>{{ readableSize(fileObj.total_size) }}</td>
    <td>x</td>
  </tr>
</template>

<script>
import { readableDateDiff, readableSize } from "../../../util/Tools";

export default {
  name: "FileListItem",
  props: {
    fileObj: Object
  },
  methods: {
    loadFolder() {
      this.$store.dispatch("volumes/loadFolder", { axios: this.axios, volumeId: this.$route.params.volumeName, path: this.fileObj.file_name })
    },
    readableDateDiff,
    readableSize
  }
}
</script>

<style scoped>

</style>