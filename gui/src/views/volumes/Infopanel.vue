<template>
  <modal title="Delete Volume" text="The deleted Volume will not be recoverable." button_color="red" ref="modal" @okay="delete_volume()"/>
  <div class="infopanel" v-if="selection.length === 1">
    <font-awesome-icon class="volume-icon" :icon="faHdd"/>
    <p class="volume-name">{{ selection[0].Name }}</p>
    <div class="below-name">
      <p class="volume-size">{{ readableSize(selection[0]?.UsageData?.Size) }}</p>
      <usage-indicator v-if="selection[0].UsageData?.RefCount > 0" :containers="selection[0].Containers"/>
    </div>
    <div class="buttons">
      <button class="btn-inspect">Inspect</button>
      <button class="btn-delete" @click="$refs.modal.show()"><font-awesome-icon :icon="faTrashAlt"/></button>
    </div>
    <div class="details">
      <infopanel-entry title="Created at" :content="created_at"/>
      <infopanel-entry title="Mountpoint" :content="selection[0].Mountpoint"/>

      <div :class="{'containers': true, 'containers-visible': ip_containers_shown}">
        <div class="header" @click="ip_containers_shown = !ip_containers_shown">
          <p>Used by {{ selection[0].UsageData?.RefCount }} container{{ selection[0].UsageData?.RefCount !== 1 ? 's' : '' }}</p>
          <font-awesome-icon class="dropdown-icon" :icon="faCaretDown"/>
        </div>
        <div class="used-by-containers">
          <div v-for="container of selection[0].Containers" :key="container.Id">
            <div class="status"/>
            <p>{{ container.Names[0] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="infopanel" v-else>
    <font-awesome-icon class="volume-icon" :icon="faHdd"/>
    <p class="volume-name">{{ selection.length == 0 ? 'No' : selection.length }} volumes selected</p>
    <div class="below-name">
      <p class="volume-size">{{ readableSize(size_of_selections()) }}</p>
      <usage-indicator v-if="infopanel.UsageData?.RefCount > 0" :containers="infopanel.Containers"/>
    </div>

    <div class="buttons">
      <button class="btn-delete-all">Delete All <font-awesome-icon :icon="faTrashAlt"/></button>
    </div>
  </div>
</template>

<script>
import { readableSize } from "@/util/Tools";
import InfopanelEntry from "@/views/volumes/InfopanelEntry";
import UsageIndicator from "@/views/volumes/UsageIndicator";
import {faCopy, faHdd, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/Modal";
export default {
  name: "Infopanel",
  props: {
    selection: Array
  },
  data() {
    return {
      faHdd,
      faTrashAlt,
      faCopy,
      faCaretDown,
      ip_containers_shown: false,

      infopanel: {}
    }
  },
  components: {Modal, InfopanelEntry, UsageIndicator },
  methods: {
    readableSize,
    close_dropdown(val) {
      this.selected_sort_filter_name = val;
      setTimeout(() => {
        this.options_visible = false;
      }, 1)
    },
    size_of_selections() {
      let total = 0;
      for (let sel of this.selection)
        total += sel.UsageData.Size;
      return total;
    },
    delete_volume() {
      this.axios.delete("")
    }
  },
  computed: {
    created_at() {
      let date = new Date(this.selection[0].CreatedAt);
      return date.toLocaleString();
    },
  }
}
</script>

<style scoped>

.infopanel {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f6;
  min-height: 100%;
}

.infopanel .volume-icon {
  font-size: 5rem;
  margin: 2rem auto;
  color: rgba(0, 0, 0, .5);
}

.infopanel .volume-name {
  width: min(90%, 30rem);
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.below-name {
  display: flex;
}
.below-name .volume-size {
  font-size: .9rem;
  color: rgba(0, 0, 0, .7);
}
.infopanel .volume-usage {
  margin-left: 1rem;
}

.buttons {
  margin: 1rem 0;
}

.btn-inspect {
  text-transform: uppercase;
  font-weight: 500;
  background-color: #057cfc;
  color: white;
}
.btn-delete {
  border-color: red;
  color: red;
  border-width: 1px;
  font-size: .75rem;
}
.btn-delete-all {
  text-transform: uppercase;
  letter-spacing: .01rem;
  border-color: red;
  font-weight: 500;
  background-color: red;
  color: white;
  border-width: 1px;
  font-size: .75rem;
}

.details {
  width: 100%;
  flex-grow: 1;
  background-color: #f4f4f6;
}

.details > div {
  border-top: 1px solid rgba(0, 0, 0, .07);
}


.details .containers .header {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.5rem;
  background-color: #f4f4f6;
  cursor: pointer;
}
.details .containers .header p {
  text-transform: uppercase;
  letter-spacing: .05rem;
  font-size: .75rem;
  color: rgba(0, 0, 0, .7);
  margin-left: 1rem;
  padding: .3rem 0 .075rem 0;
  font-weight: 600;
}
.details .containers .header .dropdown-icon {
  padding: .5rem;
  transform: rotate(90deg);
  font-size: 1.25rem;
  color: grey;
  transition: all .1s ease;
}
.details .containers-visible .header .dropdown-icon {
  transform: rotate(0deg);
}

.details .containers .used-by-containers {
  margin: 0 1rem .5rem 1rem;
  border: 1px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .2s ease;
}
.details .containers-visible .used-by-containers {
  max-height: 999px;
}
.details .containers .used-by-containers > div {
  font-size: .9rem;
  background-color: #e9ebee;
  cursor: pointer;
  letter-spacing: .01rem;
  display: flex;
  align-items: stretch;
  flex-direction: row;
}
.details .containers .used-by-containers > div + * {
  border-top: 1px solid rgba(255, 255, 255, .8)
}

.used-by-containers .status {
  display: inline-block;
  background-color: grey;
  width: .5rem;
}
.used-by-containers p {
  display: inline-block;
  margin: .5rem;
}

.details .containers .used-by-containers > div .view-icon {
  color: rgba(0, 0, 0, .5);
  text-transform: uppercase;
  font-size: .7rem;
  border: 1px solid rgba(0, 0, 0, .5);
  border-radius: 4px;
  line-height: .7rem;
  padding: .15rem .2rem;
  opacity: 0;
  transition: opacity .1s ease;
  margin-left: 1rem;
}
.details .containers .used-by-containers > div:hover .view-icon {
  opacity: 1;
}
</style>
