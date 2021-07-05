<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>.</th>
        <th>ID</th>
        <th>Image</th>
        <th>Created</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cont of containers" :key="cont.Id">
        <td>{{ cont.Names[0] }}</td>
        <td>{{ cont.Id }}</td>
        <td>{{ cont.Image }}</td>
        <td>{{ readableDateDiff(cont.Created * 1000) }}</td>
        <td>{{ cont.Status }}</td>
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
      containersArray: 'containers/containersArray'
    }),
    containers() {
      const sorted = this.containersArray(()=>0);
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
