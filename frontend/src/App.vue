<template>
  <div id="app" class="container-fluid">
    <tool-bar />
    <div class="row top">
      <div class="col-4 rona-container">
        <Rona />
      </div>
      <div class="col-8">
        <Messages />
      </div>
    </div>
  </div>
</template>

<script>
import Rona from "./components/Rona.vue";
import Messages from "./components/Messages.vue";
import ToolBar from './ToolBar.vue';

export default {
  name: "app",

  components: {
    ToolBar,
    Rona,
    Messages
  },
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
