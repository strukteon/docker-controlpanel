<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>.</th>
          <th>Tag</th>
          <th>Image ID</th>
          <th>Created</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="img of images" :key="img.Id">
          <td>{{ img.RepoTags[0].split(":")[0] }}</td>
          <td>{{ img.RepoTags[0].split(":")[1] }}</td>
          <td>{{ img.Id.split(":")[1] }}</td>
          <td>{{ readableDateDiff(img.Created * 1000) }}</td>
          <td>{{ readableSize(img.Size) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {readableDateDiff, readableSize} from "@/util/Tools";

export default {
  name: "Images",
  computed: {
    ...mapGetters({
      imagesArray: 'images/imagesArray'
    }),
    images() {
      const sorted = this.imagesArray(()=>0);
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
