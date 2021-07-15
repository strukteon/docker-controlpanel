<template>
  <div :class="{ 'volume-active': volumeData?.UsageData?.RefCount > 0 }">
    <div class="titlebar">
      <router-link class="go-back" :to="{ name: 'Volumes' }"><font-awesome-icon icon="arrow-left"/></router-link>
      <font-awesome-icon class="volume-icon" icon="hdd"/>
      <div class="volume-title-section">
        <div class="volume-name">
          {{ volumeData?.Name }} {{ filesAreLoading }}
        </div>
        <div class="in-use-by">In use by {{ volumeData?.UsageData?.RefCount }} containers</div>
      </div>
      <div class="volume-actions">
        <font-awesome-icon icon="trash"/>
      </div>
    </div>

    <filesystem-navbar ref="fs_navbar" @loc-change="loadCurFolder"/>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Modified</th>
          <th>Size</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="! filesAreLoading">
        <file-list-item v-for="file in files" :key="file.inode_number" :file-obj="file"
                        @leftclick="handleFileClick"/>
      </tbody>
      <div v-else>
        Loading...
      </div>
    </table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import FileListItem from "./FileListItem";
import FilesystemNavbar from "./FilesystemNavbar";

export default {
  name: "InspectVolume",
  components: {FilesystemNavbar, FileListItem},
  data() {
    return {
      volumeName: '',
    }
  },
  mounted() {
    this.volumeName = this.$route.params.volumeName;
    this.$store.dispatch("volumes/loadFolder", {axios: this.axios, volumeId: this.volumeName, path: ''})
  },
  beforeUnmount() {
    this.$store.commit("volumes/clearCurrentOpenFolder");
    console.log("cleared")
  },
  computed: {
    ...mapGetters({
      curFolder: 'volumes/curFolder',
      volumeByName: 'volumes/volumeByName',
      filesAreLoading: 'volumes/filesAreLoading'
    }),
    files() {
      if (!this.curFolder) return []

      const sortAlphabetically = (a, b) => a.file_name.localeCompare(b.file_name);
      const folders = this.curFolder.filter(f => f.file_type === "directory").sort(sortAlphabetically);
      const files = this.curFolder.filter(f => f.file_type !== "directory").sort(sortAlphabetically);
      return [...folders, ...files];
    },
    volumeData() {
      return this.volumeByName(this.volumeName);
    }
  },
  methods: {
    loadCurFolder(e) {
      console.log(e)
      this.$store.dispatch("volumes/loadFolder", {
        axios: this.axios,
        volumeId: this.volumeName,
        path: e
      })
    },
    handleFileClick(file) {
      if (file.file_type === "directory")
        this.$refs.fs_navbar.pushFolder(file.file_name)

    }
  }
}
</script>

<style scoped>
  .titlebar {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, .03);
  }

  .titlebar .go-back {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    line-height: 1.5rem;
    border-radius: 50%;
    border: none;
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    margin: .5rem;
    background-color: transparent;
    transition: all .2s ease;
  }
  .titlebar .go-back:hover {
    background-color: #eaeaea;
  }

  .volume-active .titlebar .volume-icon {
    color: #42b983;
  }
  .titlebar .volume-icon {
    font-size: 1.75rem;
    padding: .75rem;
  }

  .titlebar .volume-title-section {
    align-self: end;
  }
  .titlebar .volume-name {
    font-size: 1.25rem;
    line-height: 1.25rem;
  }
  .volume-active .titlebar .in-use-by {
    color: #42b983;
  }
  .volume-active .titlebar .in-use-by::before {
    background-color: rgba(66, 185, 131, 0.5);
  }
  .titlebar .in-use-by::before {
    background-color: #000;
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 4px;
    margin-bottom: 2px;
  }
  .titlebar .in-use-by {
    font-size: .85rem;
  }
</style>
