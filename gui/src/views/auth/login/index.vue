<template>
  <vue-text-input type="text" label="username"/>
  <vue-text-input type="password" label="password"/>
  <vue-button>Login</vue-button>
</template>

<script>
import VueTextInput from "@/components/VueTextInput";
import VueButton from "@/components/VueButton";
export default {
  name: "Login",
  components: {VueButton, VueTextInput }
}
</script>

<style scoped>

</style>
