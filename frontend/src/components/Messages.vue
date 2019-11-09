<template>
  <transition-group name="list-messages" tag="div" class="messages" ref="messages">
    <div
      v-for="(message, index) of messages"
      :key="index"
      :class="['message', 'list-messages-item']"
    >
      <div class="message_content">
        <span v-if="message.isUser">User: </span>
        <span v-else>Bot: </span>
        <span>{{ message.content }}</span>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'Messages',
  computed: {
    messages() {
      return this.$store.state.messages;
    },
  },
  methods: {
    scrollBottom() {
      if (this.$refs.messages.$el.lastElementChild) {
        this.$refs.messages.$el.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    },
  },
  updated() {
    this.scrollBottom();
  },
};
</script>

<style lang="scss" scoped>
  .list-messages-item {
    transition: all 0.5s;
    margin-right: 10px;
  }
  .list-messages-enter, .list-messages-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
    transform-origin: bottom;
  }
  .list-messages-leave-active {
    position: absolute;
  }

  .messages {
    width: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      height: 0;
      width: 0;
      background: transparent;
    }

    .message {
      display: flex;
      margin-bottom: 42px;
      align-items: flex-end;

      .avatar {
        padding-left: 24px;
        padding-bottom: 5px;
      }

      .message_content {
        font-family: 'Roboto', sans-serif;
        width: fit-content;
        padding: 20px 34px 21px 34px;
        border-radius: 38px;
        font-size: 1.938em;
        line-height: 36px;
        letter-spacing: 0.02em;
        word-break: break-word;
      }
    }

    .rona {
      justify-content: flex-start;
      margin-right: calc(100vw/12);

      .message_content {
        background-color: #d1d5d7;
        color: #414141;
      }
    }

    .user {
      justify-content: flex-end;
      margin-left: calc(100vw/12);

      .message_content {
        background-color: #4849A1;
        color: #ffffff;
      }
    }
  }
</style>
