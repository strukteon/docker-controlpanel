<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon v-if="container.State === 'created'" color="red">mdi-package-variant-closed</v-icon>
      <v-icon v-else-if="container.State === 'running'" color="green">mdi-package-variant-closed</v-icon>
      <v-icon v-else color="grey">mdi-package-variant-closed</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ container.Names[0].substring(1) }} <span class="blue--text text--darken-1 text-caption">{{ container.Image }}</span></v-list-item-title>
      <v-list-item-subtitle class="text--uppercase">{{ container.State }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "ContainerListItem",
  props: {
    container: Object
  },
}
</script>
