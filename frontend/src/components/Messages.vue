<template>
  <div class="messages">
    <transition-group name="list-messages" tag="div" ref="messages">
      <div
        v-for="(message, index) of messages"
        :key="index"
        :class="{message: true, 'list-messages-item': true, 'is-user': message.isUser, 'is-bot': !message.isUser}"
      >
        <div class="message_content">
          <!--        <span v-if="message.isUser">User: </span>-->
          <!--        <span v-else>Bot: </span>-->
          <span>{{ message.content }}</span>
        </div>
      </div>
    </transition-group>
    <div :class="{'message': true, 'list-messages-item': true, 'is-user': true}">
      <div class="message_content">
        <span>{{ currentMessage.content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Messages",

  computed: {
    currentMessage() {
      return this.$store.state.currentMessage;
    },
    messages() {
      return this.$store.state.messages;
    }
  },

  methods: {
    scrollBottom() {
      if (this.$refs.messages.$el.lastElementChild) {
        this.$refs.messages.$el.lastElementChild.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      }
    }
  },
  updated() {
    this.scrollBottom();
  }
};
</script>

<style lang="scss" scoped>
.list-messages-item {
  transition: all 0.5s;
}
.list-messages-enter,
.list-messages-leave-to {
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
    margin-bottom: 0;
    align-items: flex-end;

    &.is-bot {
      margin-right: 20px;
      text-align: left;
    }

    &.is-user {
      margin-left: 20px;
      justify-content: flex-end;
      text-align: right;
    }

    .message_content {
      font-family: "Roboto", sans-serif;
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
    margin-right: calc(100vw / 12);

    .message_content {
      background-color: #d1d5d7;
      color: #414141;
    }
  }

  .user {
    justify-content: flex-end;
    margin-left: calc(100vw / 12);

    .message_content {
      background-color: #4849a1;
      color: #ffffff;
    }
  }
}
</style>
