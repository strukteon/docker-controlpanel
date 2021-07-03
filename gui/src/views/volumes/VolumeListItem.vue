<template>
  <div class="volume-item-wrapper">
    <div class="volume-icon-wrapper">
      <vue-custom-tooltip
          :label="volumeData.UsageData.RefCount > 0 ? `In use by ${volumeData.UsageData.RefCount} containers` : 'Unused'"
          position="is-right">
        <font-awesome-icon :class="{
        'volume-icon': true,
        'in-use': volumeData.UsageData.RefCount > 0
      }" icon="hdd"/>
      </vue-custom-tooltip>
    </div>
    <div class="volume-infos">
      <div class="volume-title">{{ volumeData.Name }}</div>
      <div class="bottom-row">
        <div class="volume-size">{{ readableSize(volumeData.UsageData.Size) }}</div>
        <div class="volume-creation-date">2 months ago</div>
      </div>
    </div>
  </div>
</template>

<script>
import {readableSize} from "@/util/Tools";

export default {
  name: "VolumeListItem",
  props: {
    volumeData: Object,
  },
  methods: {
    readableSize
  }
}
</script>

<style scoped>
.volume-item-wrapper {
  display: flex;
  padding: .2rem 1rem;
}
  .volume-icon-wrapper {
    display: block;
    margin: .5rem 1rem;
  }
  .volume-icon {
    color: rgba(0, 0, 0, .25);
  }
  .volume-icon.in-use {
    color: #42b983;
  }
  .volume-infos {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .volume-title {
    display: block;
  }
  .bottom-row {
    display: flex;
  }
  .bottom-row > div {
    color: rgba(0, 0, 0, .6);
    font-size: .9rem;
  }
  .volume-size {
    width: 5rem;
  }
</style>
