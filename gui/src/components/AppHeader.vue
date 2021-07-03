<template>
  <nav class="app-header">
    <div class="title">DockerGUI</div>
    <div class="filler"/>
    <vue-custom-tooltip
        label="Buy me a coffee"
        position="is-bottom">
      <a href="https://ko-fi.com/strukteon" target="_blank">
        <font-awesome-icon icon="mug-hot"/>
      </a>
    </vue-custom-tooltip>
    <vue-custom-tooltip
        label="Login"
        position="is-bottom">
      <router-link to="/">
        <font-awesome-icon icon="sign-in-alt"/>
      </router-link>
    </vue-custom-tooltip>
  </nav>
</template>

<script>
export default {
  name: "AppHeader"
}
</script>

<style scoped>
  .app-header {
    background-color: var(--primary-color);
    display: flex;
    align-items: center;
    padding-left: .5rem;
    padding-right: .5rem;
  }
  .title {
    font-size: 1.25rem;
    font-weight: 500;
    color: white;
    user-select: none;
    cursor: pointer;
  }
  .filler {
    flex-grow: 1;
  }
  a {
    display: block;
    color: white;
    font-size: 1.2rem;
    padding: .5rem;
    margin-left: .5rem;
    background-color: red;
  }
</style>
