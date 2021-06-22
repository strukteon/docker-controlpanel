<template>
  <aside class="sidebar">
    <router-link class="nav-item" :to="{ name: 'Containers' }">Containers</router-link>
    <router-link class="nav-item" :to="{ name: 'Images' }">Images</router-link>
    <router-link class="nav-item" :to="{ name: 'Volumes' }">Volumes</router-link>
  </aside>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    background-color: #e9ebee;
  }

  .nav-item {
    font-family: Poppins, sans-serif;
    text-decoration: none;
    color: rgba(0, 0, 0, .5);
    transition: font-weight, color .2s ease;

    padding: .25rem 1rem;
  }

  .nav-item:hover {
    color: rgba(0, 0, 0, .7);
  }

  .router-link-active {
    color: rgba(0, 0, 0, .7);
    font-weight: 500;
  }
</style>
