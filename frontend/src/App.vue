<template>
  <div id="app">
    <Rona />
    <Camera />
  </div>
</template>

<script>
import Rona from './components/Rona.vue';
import Camera from './components/Camera.vue';

export default {
  name: "app",
  components: {
    Rona,
    Camera
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
