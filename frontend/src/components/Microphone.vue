<script>
import IconMicrophoneOn from './icons/IconMicrophoneOn.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Microphone',

  components: {
    IconMicrophoneOn,
  },

  computed: {
    ...mapGetters([
      'isListening'
    ])
  }
};
</script>

<template>
  <transition name="slide">
    <div class="microphone-wrapper">
      <div v-if="isListening" class="microphone"><IconMicrophoneOn :size="55" fill="e15913" /></div>
    </div>
  </transition>
</template>


<style lang="scss" scoped>
  .slide-enter-active, .slide-leave-active {
    .microphone {
      transition: all 2s;
    }
  }
  .slide-enter, .slide-leave-to {
    .microphone {
      top: 50px;
    }
  }

  .microphone-wrapper {
    position: fixed;
    top: 15px;
    left: 50px;
    height: 105px;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    margin-bottom: 48px;
  }

  .microphone {
    padding: 25px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(6px);
    width: fit-content;
  }
</style>
