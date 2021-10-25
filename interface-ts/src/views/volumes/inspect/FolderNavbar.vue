<template>
  <div>
    <v-btn icon @click="pushParentFolder"><v-icon>mdi-arrow-up</v-icon></v-btn>
    <v-btn icon disabled><v-icon>mdi-arrow-left</v-icon></v-btn>
    <v-btn icon disabled><v-icon>mdi-arrow-right</v-icon></v-btn>
    <div class="d-inline-flex ma-2">
      <p v-for="(folder, i) in path" :key="folder + i">
        <span class="folder-text px-1 blue--text text--darken-4" @click="pushPathIndex(i)">{{ folder }}</span>
        <span>/</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FolderNavbar",
  props: {
    value: Array
  },
  data() {
    return {
      path: [ '' ],
      history: [ [ '' ] ], // store up to ten past paths, not used yet
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
      if (this.path.length === 1)
        return;
      this.path.pop();
      this.updateHistory();
      this.notifyChanges()
    },
    pushPathIndex(index) {
      if (index === this.path.length - 1)
        return;
      this.path = this.path.slice(0, index + 1);
      this.updateHistory();
      this.notifyChanges();
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
      this.$emit("change", this.path.join('/'))
    },
    getPath() {
      return this.path.join('/');
    }
  }
}
</script>
