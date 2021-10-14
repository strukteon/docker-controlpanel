<template>
  <v-list-item @click="emitClick(file)">
    <v-list-item-icon>
      <v-icon v-if="file.file_type === 'directory'">mdi-folder</v-icon>
      <v-icon v-else>mdi-file</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ file.file_name }}</v-list-item-title>
      <v-list-item-subtitle v-if="file.file_type !== 'directory'">{{ readableSize(file.total_size) }}</v-list-item-subtitle>
      <v-list-item-subtitle v-else>a few files</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <div class="d-inline-flex">
        <v-btn icon @click="downloadFile">
          <v-icon>mdi-download</v-icon>
        </v-btn>

        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
                v-for="option in fileAdvancedOptions"
                :key="option.title"
                @click="option.onclick"
            >
              <v-list-item-icon><v-icon>{{ option.icon }}</v-icon></v-list-item-icon>
              <v-list-item-content>{{ option.title }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import {getApiUrl, readableSize} from "@/util/Tools";

export default {
  name: "FileListItem",
  props: {
    path: String,
    file: Object,
  },
  data: () => ({
    actionClickTime: 0,
    fileAdvancedOptions: [
      {
        icon: 'mdi-delete',
        title: 'Delete',
        onclick: () => console.log('deleted')
      }
    ]
  }),
  methods: {
    readableSize,
    emitClick(data) {
      console.log('emit', Date.now() - this.actionClickTime > 10)
      if (Date.now() - this.actionClickTime > 10)
        this.$emit('click', data);
    },
    preventClick() {
      this.actionClickTime = Date.now();
    },
    downloadFile() {
      this.preventClick();
      console.log(this.file)
      let link = document.createElement("a");
      link.setAttribute("href", `//${getApiUrl()}/volumes/${this.$route.params.volume}/download-file?path=${this.path}/${this.file.file_name}`);
      console.log(link.getAttribute("href"))
      link.setAttribute("download", this.file.file_name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>

<style scoped>

</style>
