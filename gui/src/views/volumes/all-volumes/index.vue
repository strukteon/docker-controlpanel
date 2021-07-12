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
          <sort-select :options="[ 'Name', 'Size', 'Creation Date' ]" @input="sortingMethod = $event.toLowerCase().replace(' ', '_')"/>

          <vue-custom-tooltip
              id="direction-button-wrapper"
              :style="{display: 'block'}"
              :label="sortDescending ? 'Descending' : 'Ascending'"
              position="is-bottom">
            <button @click="sortDescending = !sortDescending">
              <font-awesome-icon :icon="sortDescending ? 'sort-alpha-down' : 'sort-alpha-up'"/>
            </button>
          </vue-custom-tooltip>
        </div>
      </div>

      <div class="description">
        {{ selection.length }} volume{{ selection.length !== 1 ? 's' : '' }} selected
      </div>
    </div>

    <div class="volumes">
      <router-link v-for="vol in volumes" :key="vol.Name"
                   :to="{ name: 'InspectVolume', params: { volumeName: vol.Name } }">
        <volume-list-item :volume-data="vol"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import SortSelect from "@/views/volumes/all-volumes/SortSelect";
import {mapGetters} from "vuex";
import VolumeListItem from "@/views/volumes/all-volumes/VolumeListItem";

export default {
  name: "AllVolumesView",
  components: {VolumeListItem, SortSelect},
  data() {
    return {
      sortDescending: true,
      sortingMethod: 'name',
      sortMethods: {
        'name': (o1, o2) => o1.Name.localeCompare(o2.Name),
        'size': (o1, o2) => o2.UsageData.Size - o1.UsageData.Size,
        'creation_date': (o1, o2) => (Date.parse(o1.CreatedAt) - Date.parse(o2.CreatedAt))
      },

      selection: [],
    }
  },
  computed: {
    ...mapGetters({
      volumesArray: 'volumes/volumesArray'
    }),
    volumes() {
      const sorted = this.volumesArray(this.sortMethods[this.sortingMethod]);
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
  .description {
    margin: .2rem 1rem;
    font-size: .8rem;
    color: rgba(0, 0, 0, .7);
  }

  .options-row {
    display: flex;
    align-items: center;
  }

  .filters {
    display: block;
    margin: 0 1rem;
    height: 100%;
  }
  .filters > button {
    border: 1px #e6e6e6 solid;
    text-transform: uppercase;
    cursor: pointer;
    background-color: rgba(0, 0, 0, .1);
    height: 100%;
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
    display: flex;
    align-items: center;
    background-color: #e6e6e6;
    border-radius: 8px;
  }
  .sort .sort-by-text {
    user-select: none;
    display: block;
    background-color: #e6e6e6;
    border: 0px solid transparent;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    font-size: .9rem;
    margin: .2rem;
    margin-left: .4rem;
  }
  .sort button {
    display: block;
    border: 1px transparent solid;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    cursor: pointer;
    background-color: #e6e6e6;
    height: 100%;
    padding: 0 .4rem;
    line-height: .875rem;
  }

  .volumes a {
    text-decoration: unset;
    color: unset;
  }
</style>

<style>

.sort #direction-button-wrapper {
  display: flex;
  height: 100%;
}
</style>
