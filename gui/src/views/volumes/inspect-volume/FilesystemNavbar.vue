<template>
  <div class="fs-navbar">
    <div @click="goBackHistory();"><font-awesome-icon icon="arrow-left"/></div>
    <div @click="path.pop();"><font-awesome-icon icon="arrow-right"/></div>
    <div @click="pushParentFolder();"><font-awesome-icon icon="arrow-up"/></div>
    /{{ path.join("/") }}
  </div>
</template>

<script>
export default {
  name: "FilesystemNavbar",
  props: {
    value: Array
  },
  data() {
    return {
      path: [ ],
      history: [ ], // store up to ten past paths,
      historyPos: 0,
    }
  },
  methods: {
    pushFolder(folder) {
      this.path.push(folder);
      this.updateHistory();
      this.notifyChanges();
    },
    pushParentFolder() {
      this.path.pop();
      this.updateHistory();
      this.notifyChanges()
    },
    updateHistory() {
      this.historyPos = 0;
      this.history.push([...this.path]);
      if (this.history.length > 10)
        this.history.shift();
      console.log(this.history)
    },
    goBackHistory() {
      console.log(this.historyPos, this.history)
      if (this.historyPos >= this.history.length)
        return;
      this.historyPos += 1;
      this.path = this.history[this.history.length - this.historyPos - 1];
      this.notifyChanges();
    },
    notifyChanges() {
      this.$emit("locChange", `/${this.path.join('/')}`)
    }
  }
}
</script>

<style scoped>
  .fs-navbar {
    display: flex;
  }
</style>