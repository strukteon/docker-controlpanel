<template>
  <div class="app">
    <app-header/>
    <div class="app-body">
      <div class="sidebar" v-if="! isLoginPage">
        <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
        <router-link :to="{ name: 'Containers' }">Containers</router-link>
        <router-link :to="{ name: 'Volumes' }">Volumes</router-link>
        <router-link :to="{ name: 'Networks' }">Networks</router-link>
        <router-link :to="{ name: 'Images' }">Images</router-link>
        <div class="spacing"/>
        <router-link to="/settings">
          <font-awesome-icon icon="cog"/>
          Settings
        </router-link>
      </div>
      <router-view :class="{'view-content': ! isLoginPage}"/>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
export default {
  components: { AppHeader },
  computed: {
    isLoginPage() {
      return this.$route.path.startsWith("/auth");
    }
  }
}
</script>

<style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .app-body {
    flex-grow: 1;
    display: flex;
    overflow: hidden;
  }
  .sidebar {
    width: 15rem;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    background-color: #e9ebee;
    padding: .75rem 0;
  }

  .sidebar > * {
    text-decoration: none;
    color: rgba(0, 0, 0, .5);
    transition: font-weight, color .2s ease;

    padding: .25rem 1rem;
  }
  .sidebar > *:hover {
    color: rgba(0, 0, 0, .7);
  }
  .sidebar .spacing {
    flex-grow: 1;
  }
  .router-link-active {
    color: rgba(0, 0, 0, .7);
    font-weight: 500;
  }

  .view-content {
    overflow-y: scroll;
    flex-grow: 1;
  }
</style>
