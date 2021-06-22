<template>
  <div class="volume" @click="click">
    <input class="volume-checkbox" type="checkbox" v-model="selected">
    <font-awesome-icon class="volume-icon" :icon="faHdd"/>
    <div>
      <h4 class="volume-name">{{ volumeData.Name }}</h4>
      <div class="detail-overview">
        <p class="volume-size">{{ readableSize(volumeData?.UsageData?.Size) }}</p>
        <usage-indicator v-if="volumeData.UsageData?.RefCount > 0" :containers="volumeData.Containers"/>
      </div>
    </div>
    <div class="btn-inspect">
      Inspect &gt;
    </div>
  </div>
</template>

<script>
import { readableSize } from "@/util/Tools";
import { faHdd } from "@fortawesome/free-regular-svg-icons";
import UsageIndicator from "@/views/volumes/UsageIndicator";

export default {
  name: "Volume",
  components: {UsageIndicator},
  props: {
    volumeData: Object,
  },
  data() {
    return {
      faHdd,
      selected: false,
    }
  },
  methods: {
    readableSize,
    click(event) {
      let $el = this;
     this.$emit("select", {
       ...event,
       ctrlKey: event.ctrlKey,
       shiftKey: event.shiftKey,
       $el
     })
    }
  },
}
</script>

<style scoped>
  .volume {
    display: flex;
    align-items: center;
    padding: .5rem 2.5rem;
    user-select: none;
    transition: background-color .1s ease;
  }

  .volume:hover {
    background-color: #fafafb ;
  }

  .volume-icon {
    font-size: 1.25rem;
    color: rgba(0, 0, 0, .5);
    margin: .9rem;
  }

  .volume-name {
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 15rem;
  }

  .volume-creation, .volume-size {
    text-transform: uppercase;
    font-size: .8rem;
    color: rgba(0, 0, 0, .7);
  }

  .detail-overview {
    display: flex;
  }
  .volume-size {
    width: 5rem;
  }

  .btn-inspect {
    text-transform: uppercase;
    font-size: .75rem;
    font-weight: 500;
    background-color: #057cfc;
    color: white;
    line-height: .75rem;
    padding: 4px;
    border-radius: 4px;
    margin: 0 1rem;

    cursor: pointer;
    opacity: 0;
    transition: all .1s ease;
  }

  .volume:hover .btn-inspect {
    opacity: 1;
  }

  .volume-checkbox {
    margin: .7rem;
    pointer-events: none;
  }
</style>
