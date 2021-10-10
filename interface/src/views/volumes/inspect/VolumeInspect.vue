<template>
  <div>

    <v-row class="ma-2">
      <v-btn
          icon
          @click="$router.push({ name: 'VolumesOverview' })"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="px-2">
        <v-icon x-large v-if="volume.UsageData.RefCount === 0">mdi-harddisk</v-icon>
        <v-icon x-large color="green" v-else>mdi-harddisk</v-icon>
      </h1>
      <v-col class="pa-0">
        <h3 class="ma-0">{{ volume.Name }}</h3>
        <p class="text-caption grey--text text--darken-2">In use by {{ volume.UsageData.RefCount }} containers</p>
      </v-col>
    </v-row>

    <v-tabs v-model="openedTab">
      <v-tab>Files</v-tab>
      <v-tab>Details</v-tab>
      <v-tab>Containers</v-tab>
    </v-tabs>

    <v-tabs-items v-model="openedTab">
      <v-tab-item>
        <folder-navbar ref="fs_navbar" @change="loadCurFolder"/>

        <div v-if="filesAreLoading">
          <v-skeleton-loader
              v-for="i in [0,1,2,3]"
              :key="i"
              type="list-item-avatar-two-line"
          />
        </div>

        <v-list v-else>
          <file-list-item v-for="file in files"
                          :key="file.inode_number"
                          :path="$refs.fs_navbar.path.join('/')"
                          :file="file"
                          @click="handleFileClick"
          />
        </v-list>

      </v-tab-item>
      <v-tab-item>Details</v-tab-item>
      <v-tab-item>Containers</v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import FileListItem from "@/views/volumes/inspect/FileListItem";
import FolderNavbar from "@/views/volumes/inspect/FolderNavbar";

export default {
  name: "VolumeInspect",
  components: {FolderNavbar, FileListItem},
  data: () => ({
    openedTab: 0,
    volumeName: null
  }),
  mounted() {
    this.volumeName = this.$route.params.volume;
    this.$store.dispatch("volumes/loadFolder", {axios: this.axios, volumeId: this.volumeName, path: ''})
  },

  computed: {
    ...mapGetters({
      curFolder: 'volumes/curFolder',
      filesAreLoading: 'volumes/filesAreLoading'
    }),
    files() {
      if (!this.curFolder) return []

      const sortAlphabetically = (a, b) => a.file_name.localeCompare(b.file_name);
      const folders = this.curFolder.filter(f => f.file_type === "directory").sort(sortAlphabetically);
      const files = this.curFolder.filter(f => f.file_type !== "directory").sort(sortAlphabetically);
      return [...folders, ...files];
    },
    volume() {
      return this.$store.getters["volumes/volumes"][this.volumeName]
    }
  },

  methods: {
    handleFileClick(file) {
      if (file.file_type === "directory")
        this.$refs.fs_navbar.pushFolder(file.file_name)
    },
    loadCurFolder(e) {
      console.log('received', e)
      this.$store.dispatch("volumes/loadFolder", {
        axios: this.axios,
        volumeId: this.volumeName,
        path: e
      })
    },
  }
}
</script>

<style scoped>

</style>