<template>
  <div class="infopanel-entry">
    <h5>{{ title }}</h5>
    <div class="value">
      <span class="content">{{ content }}</span>
      <font-awesome-icon class="btn-copy" :icon="faCopy"/>
    </div>
  </div>
</template>

<script>
import { faCopy } from "@fortawesome/free-regular-svg-icons";

export default {
  name: "InfopanelEntry",
  props: {
    title: String,
    content: String
  },
  data() {
    return {
      faCopy
    }
  }
}
</script>

<style scoped>
h5 {
  text-transform: uppercase;
  letter-spacing: .05rem;
  font-size: .75rem;
  color: rgba(0, 0, 0, .7);
  margin-left: 1rem;
  padding: .3rem 0 .075rem 0;
}
.value {
  background-color: #e9ebee;
  padding: .2rem .4rem;
  display: flex;
  align-items: center;
  margin-bottom: .5rem;
}
.content {
  flex-grow: 1;
  white-space: nowrap;
  font-size: .8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: .5rem;
  font-family: monospace;
}

.value .btn-copy {
  padding: .5rem;
  cursor: pointer;
  margin: 0 1rem 0 .25rem;
}
</style>
