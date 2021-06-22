<template>
  <p :class="`volume-usage ${isActive ? 'volume-active' : 'volume-inactive'}`">In Use</p>
</template>

<script>
export default {
  name: "UsageIndicator",
  props: {
    containers: Array
  },
  computed: {
    isActive() {
     for (let container of this.containers) {
       console.log(container.State)
        if (container.State === "running")
          return true;
      }
      return false;
    }
  }
}
</script>

<style scoped>

.volume-usage {
  display: inline-block;
  text-transform: uppercase;
  border: 1px solid;
  line-height: .8rem;
  padding: .15rem .4rem .1rem .4rem;
  font-size: .8rem;
  border-radius: 90px;
  font-weight: 500;
}
.volume-active {
  color: rgba(84, 212, 180, 0.7);
  border-color: #54d4b4;
}
.volume-inactive {
  color: rgba(160, 160, 160, 0.9);
  border-color: #a0a0a0;
}
</style>
