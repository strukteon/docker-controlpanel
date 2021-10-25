<template>
  <div>

    <v-simple-table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Tag</th>
          <th>ID</th>
          <th>Created</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="image in images" :key="image.Id">
          <td>{{ image.RepoTags[0].split(":")[0] }}</td>
          <td>{{ image.RepoTags[0].split(":")[1] }}</td>
          <td>{{ image.Id }}</td>
          <td>{{ readableDateDiff(image.Created * 1000) }}</td>
          <td>{{ readableSize(image.Size) }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import { readableSize, readableDateDiff } from "@/util/Tools";

export default {
  name: "ImagesOverview",
  computed: {
    ...mapGetters({
      imagesArray: "images/imagesArray"
    }),
    images() {
      return this.imagesArray(() => 0)
    }
  },
  methods: {
    readableDateDiff,
    readableSize
  }
}
</script>

<style scoped>

</style>