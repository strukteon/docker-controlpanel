<template>
  <div  class="volume-wrapper">
    <div class="volume-filter">
      <div class="usage-filter">
        <button :class="{'active': usageFilter == 'all'}" @click="usageFilter = 'all'">All</button>
        <button :class="{'active': usageFilter == 'in_use'}" @click="usageFilter = 'in_use'">In Use</button>
        <button :class="{'active': usageFilter == 'unused'}" @click="usageFilter = 'unused'">Unused</button>
      </div>

      <div class="sort-filter">
        <button>Sort by</button>
        <sort-select class="selected-option" ref="sortSelect" :options="['Name', 'Size', 'Created At']" @input="sort_method = $event.toLowerCase().replace(' ', '_')"/>
        <button @click="sort_desc = !sort_desc"><font-awesome-icon :icon="sort_desc ? faSortAlphaDown : faSortAlphaUp"/></button>
      </div>


    </div>
    <volume :ref="setVolumeRef" v-for="vol in visible_volumes" :volume-data="vol" :key="vol.Name" @select="update_infopanel"/>

    <teleport to="#infopanel" class="infopanel">
      <infopanel :selection="selection"/>
    </teleport>
  </div>
</template>

<script>
import Volume from "@/views/volumes/Volume";
import { faHdd, faTrashAlt, faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown, faSortAlphaDown, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import SortSelect from "@/views/volumes/SortSelect";
import Infopanel from "@/views/volumes/Infopanel";

export default {
  name: "index",
  components: {Infopanel, SortSelect, Volume},
  data() {
    return {
      faHdd,
      faTrashAlt,
      faCopy,
      faCaretDown,
      faSortAlphaDown,
      faSortAlphaUp,
      volumes: [],
      ip_containers_shown: false,

      selection: [],
      last_selected: -1,
      volumeRefs: [],

      usageFilter: 'all',
      usageFilters:{
        'all': () => true,
        'in_use': vol => vol.UsageData?.RefCount > 0,
        'unused': vol => vol.UsageData?.RefCount === 0,
      },
      sort_desc: true,
      sort_method: 'name',
      sort_methods: {
        'name': (a, b) => a.Name.localeCompare(b.Name),
        'size': (a, b) => a.UsageData.Size - b.UsageData.Size,
        'created_at': (a, b) => Date.parse(a.CreatedAt) - Date.parse(b.CreatedAt),
      }
    }
  },
  beforeMount() {
    console.log(this.$options.components)
    this.axios.get(`http://localhost/volumes/all`)
      .then(res => this.volumes = res.data)
    .then(() => {this.infopanel = this.volumes[0]})
  },
  methods: {
    setVolumeRef(el) {
      if (el) {
        this.volumeRefs.push(el)
      }
    },
    get_selected_volumes() {
      let sel_volumes = [];
      for (let vol of this.volumeRefs)
        if (vol.selected)
          sel_volumes.push(vol.volumeData);
      return sel_volumes;
    },
    update_infopanel(event) {
      let selIndex = this.volumeRefs.findIndex(val => val === event.$el);
      if (event.ctrlKey)
        event.$el.selected = ! event.$el.selected;
      else if (event.shiftKey) {
        if (this.last_selected === -1) return;
        console.log(this.last_selected, selIndex)
        for (let i = Math.min(this.last_selected, selIndex);
             i <= Math.max(this.last_selected, selIndex); i++) {
          this.volumeRefs[i].selected = true;
        }
      } else {
        this.volumeRefs.forEach(vol => vol.selected = false);
        event.$el.selected = true;
      }
      this.selection = this.get_selected_volumes();
      if (event.$el.selected) this.last_selected = selIndex;
      console.log('end', this.last_selected, selIndex)
    },
  },
  computed: {
    visible_volumes() {
      let out = this.volumes
          .filter(this.usageFilters[this.usageFilter])
          .sort(this.sort_methods[this.sort_method]);
      if (!this.sort_desc) return out.reverse();
      return out;
    }
  },
  beforeUpdate() {
    this.volumeRefs = []
  },
}
</script>

<style scoped>
  .volume-wrapper {
    width: 100%;
    background-color: #f4f4f6;
  }


  .volume-filter {
    padding: 1rem;
    background-color: #e9ebee;
    display: flex;
    flex-direction: row;
  }

  .volume-filter .usage-filter {
    display: inline-flex;
    margin: 0 1rem;
  }
  .volume-filter .usage-filter button:first-child {
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    color: rgba(0, 0, 0, .6);
    cursor: default;
  }
  .volume-filter .usage-filter button:last-child {
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
  }
  .volume-filter .usage-filter button {
    margin: 0;
    border-radius: 0;
    text-transform: uppercase;
    background-color: white;
    color: rgba(0, 0, 0, .6);
    font-weight: 500;
    /*background-color: rgba(0, 0, 0, .05);*/
  }
  .volume-filter .usage-filter button + button {
    border-left: 2px solid rgba(0, 0, 0, .1);
  }
  .volume-filter .usage-filter button.active {
    color: #057cfc;
    border-color: #057cfc;
    border-width: 2px;
  }
  .volume-filter .usage-filter button.active + button {
    border-left-color: transparent;
  }

  .volume-filter .sort-filter {
    display: inline-flex;
  }
  .volume-filter .sort-filter > * {
    background-color: white;
    border-radius: 0;
    margin: 0;
    border: 1px white solid;
  }
  .volume-filter .sort-filter > *:first-child {
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    color: rgba(0, 0, 0, .6);
    cursor: default;
  }
  .volume-filter .sort-filter > *:last-child {
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
  }
  .volume-filter .sort-filter > * + *{
    border-left: 2px solid rgba(0, 0, 0, .1);
  }

</style>
