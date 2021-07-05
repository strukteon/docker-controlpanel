<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>.</th>
        <th>ID</th>
        <th>Image ID</th>
        <th>Created</th>
        <th>Size</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="netw of networks" :key="netw.Id">
        <td>{{ netw.Name }}</td>
        <td>{{ netw.Id }}</td>
        <td>{{ netw.Driver }}</td>
        <td>{{ netw.Scope }}</td>
        <td>{{ readableDateDiff(netw.Created * 1000) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {readableDateDiff, readableSize} from "@/util/Tools";

export default {
  name: "Containers",
  computed: {
    ...mapGetters({
      networksArray: 'networks/networksArray'
    }),
    networks() {
      const sorted = this.networksArray(()=>0);
      return sorted;
    }
  },
  methods: {
    readableSize,
    readableDateDiff
  }
}
</script>

<style scoped>

</style>
