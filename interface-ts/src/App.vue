<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
    >
      <v-toolbar-title>Dockstation</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/strukteon/docker-controlpanel"
        target="_blank"
        text
      >
        <span class="mr-2">Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn
        href="https://ko-fi.com/strukteon"
        target="_blank"
        text
      >
        <span class="mr-2">Made with <v-icon>mdi-heart</v-icon> by strukteon</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
    >
      <v-list>
        <v-list-item-group
            v-model="selectedNavItem"
            color="primary"
        >
          <v-list-item
              v-for="(item, i) in navigationItems"
              :key="i"
              link
              :to="{ name: item.to }"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    selectedNavItem: 'Dashboard',
    navigationItems: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', to: 'Dashboard' },
      { title: 'Containers', icon: 'mdi-package-variant-closed', to: 'ContainersOverview' },
      { title: 'Volumes', icon: 'mdi-harddisk', to: 'VolumesOverview' },
      { title: 'Networks', icon: 'mdi-lan', to: 'NetworksOverview' },
      { title: 'Images', icon: 'mdi-image', to: 'ImagesOverview' },
    ]
  }),
};
</script>
