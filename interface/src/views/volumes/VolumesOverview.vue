<template>
  <div>


    <v-row>
      <v-col md="2">
        <v-btn-toggle
            v-model="filter"
            mandatory
            class="pa-4"
        >
          <v-btn small>All</v-btn>
          <v-btn small>In Use</v-btn>
          <v-btn small>Unused</v-btn>
        </v-btn-toggle>
      </v-col>

      <v-col md="3">
        <v-toolbar
          dense
          class="ma-2"
        >
          <v-btn
              :value="1"
              text
              disabled
              small
          >
            Sort by
          </v-btn>

          <v-overflow-btn
              v-model="sortingMethod"
              :items="sortMethodsStrings"
              hide-details
          />

          <v-btn
              :value="1"
              text
              dense
              @click="sortDescending = !sortDescending"
          >
            <v-icon v-if="sortDescending">mdi-sort-alphabetical-ascending</v-icon>
            <v-icon v-else>mdi-sort-alphabetical-descending</v-icon>
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <p
      class="pl-4 grey--text text--darken-2"

    >
      0 volumes selected
    </p>




    <v-list
      two-line
    >
      <v-list-item
          v-for="volume in volumes"
          :key="volume.Name"
          :to="{ name: 'VolumeInspect', params: { volume: volume.Name } }">

        <v-list-item-icon>
          <v-icon :color="volume.UsageData.RefCount > 0 ? 'green' : 'grey'">mdi-harddisk</v-icon>
        </v-list-item-icon>

        <v-list-item-content>

          <v-list-item-title>{{ volume.Name }}</v-list-item-title>

          <v-list-item-subtitle>
            <v-row>
              <v-col md="1">{{ readableSize(volume.UsageData.Size) }}</v-col>
              <v-col>{{ readableDateDiff(volume.CreatedAt) }}</v-col>
            </v-row>
          </v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { readableSize, readableDateDiff } from "@/util/Tools";

export default {
  name: "VolumesOverview",

  data: () => ({
    sortDescending: true,
    sortingMethod: 'Name',
    sortMethods: {
      'Name': (o1, o2) => o1.Name.localeCompare(o2.Name),
      'Size': (o1, o2) => o2.UsageData.Size - o1.UsageData.Size,
      'Creation Date': (o1, o2) => (Date.parse(o1.CreatedAt) - Date.parse(o2.CreatedAt))
    },
    filter: null,
    volumeAdvancedOptions: [
      {
        icon: 'mdi-delete',
        title: 'Delete',
        onclick: () => console.log('deleted')
      }
    ]
  }),

  methods: {
    readableSize,
    readableDateDiff
  },

  computed: {
    ...mapGetters({
      volumesArray: 'volumes/volumesArray'
    }),
    volumes() {
      const sorted = this.volumesArray(this.sortMethods[this.sortingMethod]);
      if (!this.sortDescending) return sorted.reverse();
      return sorted;
    },
    sortMethodsStrings() {
      return Object.keys(this.sortMethods);
    }
  },
}
</script>

<style scoped>

</style>