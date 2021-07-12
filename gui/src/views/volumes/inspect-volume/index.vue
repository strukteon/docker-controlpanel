<template>
  <div>
    <file-list-item v-for="file in files" :key="file.inode_number" :file-obj="file"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import FileListItem from "./FileListItem";

export default {
  name: "InspectVolume",
  components: {FileListItem},
  mounted() {
    this.$store.dispatch("volumes/loadFolder", { axios: this.axios, volumeId: this.$route.params.volumeName, path: '' })
    console.log(this.$route.params)
  },
  beforeUnmount() {
    this.$store.commit("volumes/clearCurrentOpenFolder");
    console.log("cleared")
  },
  computed: {
    ...mapGetters({
      curFolder: 'volumes/curFolder'
    }),
    files() {
      const sortAlphabetically = (a, b) => a.file_name.localeCompare(b.file_name);
      const folders = this.curFolder.filter(f => f.file_type === "directory").sort(sortAlphabetically);
      const files = this.curFolder.filter(f => f.file_type !== "directory").sort(sortAlphabetically);
      console.log([...folders, ...files])
      return [...folders, ...files];
    }
  },
  methods: {
    loadFolder(path) {
      this.$store.dispatch("volumes/loadFolder", { axios: this.axios, volumeId: this.$route.params.volumeName, path: path })
    }
  }
}
</script>

<style scoped>

</style>
