<template>
  <div class="v-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
          v-for="(option, i) of options"
          :key="i"
          @click="
          selected = option;
          open = false;
          $emit('input', option);"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SortSelect",
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
          ? this.default
          : this.options.length > 0
              ? this.options[0]
              : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
  methods: {
    set_opened(val) {
      this.open = val;
    }
  }
};
</script>

<style scoped>

.v-select {
  position: relative;
  text-align: left;
  outline: none;
  display: inline-block;
}

.v-select .selected {
  position: relative;
  background-color: white;
  color: #000;
  cursor: pointer;
  user-select: none;
  width: 7rem;
  line-height: .75rem;
  font-size: .9rem;
  padding: 7.5px 6px;
  border: 1px white solid;
}

.v-select .selected.open {
  z-index: 3;
}

.v-select .items {
  color: #000;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  position: absolute;
  background-color: #eaeaea;
  left: 0;
  right: 0;
  z-index: 2;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .3);
}

.v-select .items div {
  color: #000;
  cursor: pointer;
  user-select: none;
  line-height: .75rem;
  font-size: .9rem;
  padding: 6px;
  border: 1px transparent solid;
}

.v-select .items div:hover {
  background-color: #ad8225;
}

.selectHide {
  display: none;
}
</style>
