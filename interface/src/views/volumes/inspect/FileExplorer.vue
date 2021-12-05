<template>
  <v-tab-item>

    <v-dialog
        v-model="dialog"
        width="600px"
        fullscreen
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ openFile.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-textarea auto-grow :value="openFile.content"/>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialog = false">Close</v-btn>
          <v-btn color="primary" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <folder-navbar ref="fs_navbar" @change="loadFolder"/>

    <v-btn @click="$refs.filePicker.click()">Upload file</v-btn>
    <input @change="log($event.target.files)" ref="filePicker" type="file" style="display: none"/>

    <div v-if="filesAreLoading">
      <v-skeleton-loader
          v-for="i in [0,1,2,3]"
          :key="i"
          type="list-item-avatar-two-line"
      />
    </div>

    <v-list v-else>
      <file-list-item v-for="file in files"
                      :key="file.inodeNumber"
                      :path="$refs.fs_navbar.path.join('/')"
                      :file="file"
                      @click="handleFileClick"
      />
    </v-list>
  </v-tab-item>
</template>

<script>
import FileListItem from "@/views/volumes/inspect/FileListItem";
import FolderNavbar from "@/views/volumes/inspect/FolderNavbar";
import axios from "axios";
import {getApiUrl} from "@/util/Tools";

export default {
  name: "FileExplorer",
  components: {
    FileListItem,
    FolderNavbar
  },
  props: {
    volumeName: String,
  },
  data: () => ({
    feWebsocket: null,
    filesAreLoading: true,
    curFolder: [],
    openFile: {},
    fileOpen: false,
    dialog: false
  }),
  mounted() {
    this.feWebsocket = new WebSocket(`ws://localhost/`);

    this.feWebsocket.onmessage = ev => {
      const msg = JSON.parse(ev.data);
      if (msg.type === "info" && msg.data === "setup_finished")
        this.loadFolder("/");
      else if (msg.type === "message") {
        this.curFolder = msg.data;
        this.filesAreLoading = false;
      }
    }
    this.feWebsocket.onopen = () => this.feWebsocket.send(JSON.stringify({
      type: "set_room",
      data: "volume_file_explorer",
      options: this.volumeName
    }));
  },
  beforeDestroy() {
    this.feWebsocket.close();
  },
  computed: {
    files() {
      const sortAlphabetically = (a, b) => a.fileName.localeCompare(b.fileName);
      const folders = this.curFolder.filter(f => f.fileType === "directory").sort(sortAlphabetically);
      const files = this.curFolder.filter(f => f.fileType !== "directory").sort(sortAlphabetically);
      return [...folders, ...files];
    },
  },
  methods: {
    handleFileClick(file) {
      if (file.fileType === "directory")
        this.$refs.fs_navbar.pushFolder(file.fileName)
      else {
        axios.get(`//${getApiUrl()}/volumes/${this.volumeName}/download-file?path=${this.$refs.fs_navbar.getPath()}/${file.fileName}`)
        .then(res => {
          console.log("---------------------------", res.data)
          this.openFile = {
            name: file.fileName,
            content: res.data
          }
          this.fileOpen = true;
          this.dialog = true;
          console.log(this, this.editorValue);
        })
      }
    },
    loadFolder(path) {
      console.log("loading folder", path)
      this.feWebsocket.send(JSON.stringify({
        type: "message",
        data: path
      }));
      this.filesAreLoading = true;
    },
    log(e) {
      console.log(e)
    }
  }
}
</script>
