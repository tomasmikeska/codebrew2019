<template>
  <div class="tool-bar">
    <div class="tool-bar-button" @click="hidden = !hidden"></div>
    <div class="tool-bar-context" v-show="!hidden">
      Day:
      <input type="number" v-model="day" min="1" max="7" />
      Hours:
      <input type="number" v-model="hours" min="0" max="24" />
      <button @click="sendContext">Send context</button>
    </div>
    <div class="tool-bar-message" v-show="!hidden">
      <input type="text" v-model="message" />
      <button @click="sendMessage">Send message</button>
      {{ botState }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolBar",

  data() {
    return {
      day: 1,
      hours: 0,
      message: "",
      hidden: true
    };
  },
  computed: {
    botState() {
      return this.$store.state.botState;
    }
  },
  methods: {
    sendMessage() {
      this.$store.dispatch("sendMessage", this.message);
    },

    sendContext() {
      this.$store.dispatch("sendContext", {
        day: parseInt(this.day),
        hours: parseInt(this.hours)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tool-bar {
  display: flex;
  position: fixed;
  top: 0;
  justify-content: center;
  width: 100%;
  z-index: 99999999;

  .tool-bar-button {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: orange;
    opacity: 0.15;
  }
}

.tool-bar-context {
  margin-right: 16px;
}
</style>
