<template>
  <div>
    <div v-for="file in files" :key="file.inode_number" @click="loadFolder(file.file_name)">
      {{ file.file_name }} [{{ file.file_type }}]
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "InspectVolume",
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
      files: 'volumes/currentOpenFolder'
    }),
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
