<template>
    <div class="tool-bar">
        <div class="tool-bar-context">
            Day: <input type="number" v-model="day" min="1" max="7" />
            Hours: <input type="number" v-model="hours" min="0" max="24" />
            <button @click="sendContext">Send context</button>
        </div>
        <div class="tool-bar-message">
            <input type="text" v-model="message" />
            <button @click="sendMessage">Send message</button>
            {{ botState }}
        </div>
    </div>
</template>

<script>
  export default {
    name: 'ToolBar',

    data() {
      return {
        day: 1,
        hours: 0,
        message: ""
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
        this.$store.dispatch("sendContext", {day: this.day, hours: this.hours});
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
    }

    .tool-bar-context {
        margin-right: 16px;
    }

</style>
