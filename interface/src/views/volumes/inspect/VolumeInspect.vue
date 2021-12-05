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
      <file-explorer :volume-name="volumeName"/>

      <v-tab-item>

        <v-simple-table class="pt-8">
          <tbody>
            <tr v-for="[title, value] in
                    [['Created At', volume.CreatedAt],
                    ['Driver', volume.Driver],
                    ['Scope', volume.Scope],
                    ['Mountpoint', volume.Mountpoint]]"
                   :key="title" class="px-6">
              <td>{{ title }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </v-simple-table>

        <p class="px-2 pt-8 blue--text font-weight-bold text--lighten-1">Labels</p>
        <v-simple-table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in volume.Labels"
                   :key="key">
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </v-simple-table>

      </v-tab-item>
      <v-tab-item>

        <container-list-item
            v-for="container in volume.Containers"
            :key="container.Id"
            :container="container"/>

        <p
            class="pa-2 grey--text"
            v-if="volume.Containers.length < 1">Not used in any container</p>

      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
import ContainerListItem from "@/views/containers/ContainerListItem";
import FileExplorer from "@/views/volumes/inspect/FileExplorer";

export default {
  name: "VolumeInspect",
  components: {FileExplorer, ContainerListItem},
  data: () => ({
    openedTab: 0,
    volumeName: null,
  }),
  mounted() {
    this.volumeName = this.$route.params.volume;
  },

  computed: {
    volume() {
      return this.$store.getters["volumes/volumes"][this.volumeName] || {
        UsageData: { },
        Containers: [ ]
      }
    }
  },

  methods: {
    log(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
