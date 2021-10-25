<template>
  <div>
    <v-list>
      <container-list-item v-for="container in containers" :key="container.Id" :container="container"/>
    </v-list>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ContainerListItem from "@/views/containers/ContainerListItem";

export default {
  name: "ContainersOverview",
  components: {ContainerListItem},
  computed: {
    ...mapGetters({
      containersArray: "containers/containersArray"
    }),
    containers() {
      return this.containersArray(() => 0);
    }
  }
}
</script>

<style scoped>
  .text--uppercase {
    text-transform: uppercase;
  }
</style>
