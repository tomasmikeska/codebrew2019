<template>
  <div id="app">
    <Rona />
  </div>
</template>

<script>
import Rona from './components/Rona.vue';

export default {
  name: "app",
  components: {
    Rona
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
