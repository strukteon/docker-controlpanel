<template>
  <div class="fs-navbar">
    <div class="arrow" @click="goBackHistory();"><font-awesome-icon icon="arrow-left"/></div>
    <div class="arrow" @click="goForwardHistory();"><font-awesome-icon icon="arrow-right"/></div>
    <div class="arrow" @click="pushParentFolder();"><font-awesome-icon icon="arrow-up"/></div>
    <div class="path-list">
      <div class="path-item" v-for="(folder, index) in path" :key="folder + index">
        <span class="folder-text">{{ folder }}</span>
        <font-awesome-icon class="chevron-right" icon="chevron-right"/>
      </div>
    </div>
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
      path: [ '' ],
      history: [ [ '' ] ], // store up to ten past paths,
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
      console.log(`old history ${this.history.join("|")}`)
      if (this.historyPos !== 0) {
        this.history = this.history.slice(0, - this.historyPos)
        console.log(`pos[0, ${-this.historyPos}] sliced history ${this.history.join("|")}`)
        this.historyPos = 0;
      }

      this.history.push([...this.path]);
      if (this.history.length > 10)
        this.history.shift();
      console.log(`new history ${this.history.join("|")}`)
    },
    goBackHistory() {
      if (this.historyPos >= this.history.length - 1)
        return;
      this.historyPos += 1;
      console.log(this.historyPos)
      this.path = this.history[this.history.length - this.historyPos - 1];
      this.notifyChanges();
    },
    goForwardHistory() {
      if (this.historyPos <= 0)
        return;
      this.historyPos -= 1;
      console.log(this.historyPos)
      this.path = this.history[this.history.length - this.historyPos - 1];
      this.notifyChanges();
    },
    notifyChanges() {
      console.log("new path: ", this.path.join("/"))
      this.$emit("locChange", this.path.join('/'))
    }
  }
}
</script>

<style scoped>
  .fs-navbar {
    display: flex;
    background-color: rgba(0, 0, 0, .05);
    padding: .2rem;
  }

  .fs-navbar .arrow {
    padding: .4rem;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: all .2s ease;
  }
  .fs-navbar .arrow:hover {
    background-color: rgba(0, 0, 0, .1);
  }

  .path-list {
    display: flex;
  }
  .path-list .path-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .path-list .path-item .chevron-right {
    font-size: .75rem;
    padding: .3rem;
    color: rgba(0, 0, 0, .5)
  }
  .path-list .path-item .folder-text {
    color: #0db7ed;
    text-decoration: underline;
    cursor: pointer;
  }
</style>