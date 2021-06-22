<template>
  <navbar/>
  <div class="mainview">
    <sidebar/>
    <router-view class="router-view"/>
    <aside id="infopanel"/>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
export default {
  components: {Sidebar}
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.mainview {
  display: flex;
  flex-direction: row;
  height: 100vh;

  font-family: Poppins, sans-serif;
}

.sidebar {
  width: 15rem;
}

.router-view {
  height: 100vh;
  overflow-y: scroll;
}

#infopanel {
  width: 50rem;
  height: 100vh;
  overflow-y: scroll;
}
</style>
