<template>
  <div class="home">
    What is <VueCustomTooltip label="This is a tooltip">a tooltip</VueCustomTooltip>?
    <p>This is a <vue-custom-tooltip label="Neat!">tooltip</vue-custom-tooltip>.</p>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  }
}
</script>
