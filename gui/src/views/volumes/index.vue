<template>
  <div>
    <div class="sorting">
      <div class="options-row">
        <div class="filters">
          <button>All</button>
          <button>Used</button>
          <button>Unused</button>
        </div>

        <div class="sort">
          <span class="sort-by-text">Sort by</span>
          <sort-select :options="[ 'Name', 'Size', 'Creation Date' ]"/>

          <div class="direction-button-wrapper">
            <vue-custom-tooltip
                class="aksdkasjdkajsdk"
                :style="{display: 'block'}"
                :label="sortDescending ? 'Descending' : 'Ascending'"
                position="is-bottom">
              <button @click="sortDescending = !sortDescending">
                <font-awesome-icon :icon="sortDescending ? 'sort-alpha-down' : 'sort-alpha-up'"/>
              </button>
            </vue-custom-tooltip>
          </div>
        </div>
      </div>

      <div class="description">
        {{ selection.length }} volume{{ selection.length !== 1 ? 's' : '' }} selected
      </div>
    </div>

    <div class="volumes">
      <volume-list-item v-for="vol in volumes" :key="vol.Name" :volume-data="vol"/>
    </div>
  </div>
</template>

<script>
import SortSelect from "@/views/volumes/SortSelect";
import {mapGetters} from "vuex";
import VolumeListItem from "@/views/volumes/VolumeListItem";

export default {
  name: "VolumesView",
  components: {VolumeListItem, SortSelect},
  data() {
    return {
      sortDescending: true,

      selection: [],
    }
  },
  computed: {
    ...mapGetters({
      volumesArray: 'volumes/volumesArray'
    }),
    volumes() {
      const sorted = this.volumesArray(()=>0);
      if (!this.sortDescending) return sorted.reverse();
      return sorted;
    }
  },
}
</script>

<style scoped>
  .sorting {
    padding: 1rem;
  }
  .options-row {
    display: flex;
  }

  .filters {
    display: block;
  }
  .filters > button {
    border: 1px transparent solid;
    text-transform: uppercase;
    cursor: pointer;
  }
  .filters > button:hover {
    border-color: red;
  }
  .filters > :first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .filters > :last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .sort {
    background-color: #42b983;
    border: 1px solid transparent;
    border-radius: 8px;
    display: flex;
  }
  .sort .sort-by-text {
    user-select: none;
    display: block;
  }
  .sort .vue-custom-tooltip {
    display: block;
  }
</style>
