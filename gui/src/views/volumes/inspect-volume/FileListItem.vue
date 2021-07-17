<template>
  <tr @click="$emit('leftclick', fileObj)">
    <td>
      <font-awesome-icon :icon="fileObj.file_type === 'file' ? 'file' : 'folder'"/>
      {{ fileObj.file_name }}
    </td>
    <td>{{ new Date(fileObj.last_modification_time * 1000).toLocaleString() }}</td>
    <td>{{ readableSize(fileObj.total_size) }}</td>
    <td>
      <vue-custom-tooltip label="Download">
        <a :href="`//${getApiUrl()}/volumes/${$route.params.volumeName}/file?path=${path}/${fileObj.file_name}`"
        download="">
          <font-awesome-icon icon="download"/>
        </a>
      </vue-custom-tooltip>
    </td>
  </tr>
</template>

<script>
import { readableDateDiff, readableSize, getApiUrl } from "@/util/Tools";

export default {
  name: "FileListItem",
  props: {
    fileObj: Object,
    path: String
  },
  methods: {
    loadFolder() {
      this.$store.dispatch("volumes/loadFolder", { axios: this.axios, volumeId: this.$route.params.volumeName, path: this.fileObj.file_name })
    },
    readableDateDiff,
    readableSize,
    getApiUrl
  }
}
</script>

<style scoped>

</style>
