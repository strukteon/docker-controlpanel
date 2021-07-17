<template>
  <button><slot/></button>
</template>

<script>
export default {
  name: "VueButton"
}
</script>

<style scoped>
  button {
    background-color: #0db7ed;
    color: white;
    outline: none;
    border: none;
    border-radius: 4px;
    padding: .5rem;
    line-height: .7rem;
    cursor: pointer;
    transition: all .2s ease  ;
  }
  button:hover {
    background-color: #0ca7d9;
  }
  button:active {
    background-color: #0b93bf;
  }
</style>
