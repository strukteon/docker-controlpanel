<template>
  <div class="auth-wrapper">
    <div class="form-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth"
}
</script>

<style scoped>
  .auth-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #42b983;
    justify-content: center;
    align-items: center;
  }

  .form-wrapper {
    background-color: white;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 0;
    padding: 1rem;
    border-radius: 1rem;
  }
</style>
