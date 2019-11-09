<template>
  <div id="app" class="container-fluid">
    <div class="row top">
      <Voice />
    </div>
  </div>
</template>

<script>
import Rona from "./components/Rona.vue";
import Messages from "./components/Messages.vue";
import Voice from "./components/Voice.vue";

export default {
  name: "app",
  components: {
    Voice
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
}

.rona-container {
  position: relative;
}
</style>
