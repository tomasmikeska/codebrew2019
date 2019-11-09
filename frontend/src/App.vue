<template>
  <div id="app" class="container-fluid">
    <div class="row top">
      <div class="col-4 rona-container">
        <Rona />
      </div>
      <div class="col-8">
        {{ botState }}
        <Messages />
      </div>
    </div>
  </div>
</template>

<script>
import Rona from "./components/Rona.vue";
import Messages from "./components/Messages.vue";

export default {
  name: "app",
  components: {
    Rona,
    Messages
  },
  computed: {
    botState() {
      return this.$store.state.botState;
    }
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
