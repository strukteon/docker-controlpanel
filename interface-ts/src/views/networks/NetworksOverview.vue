<template>
  <div>
    <v-list>
      <v-list-item v-for="network in networks" :key="network.Id">
        <v-list-item-icon>
          <v-icon>mdi-lan</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ network.Name }}</v-list-item-title>
          <v-list-item-subtitle>{{ network.Driver }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NetworksOverview",
  computed: {
    ...mapGetters({
      networksArray: "networks/networksArray"
    }),
    networks() {
      return this.networksArray(() => 0);
    }
  }
}
</script>

<style scoped>

</style>