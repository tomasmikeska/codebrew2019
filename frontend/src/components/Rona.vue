<template>
  <div>
    <Microphone class="microphone" />
    <div id='divVHSS'></div>
  </div>
</template>

<script>
import takePhotosMixin from '../mixins/take-photos-mixin.js';
import listenVoiceMixin from '../mixins/listen-voice-mixin.js';
import Microphone from './Microphone';

export default {
  name: 'Rona',

  mixins: [takePhotosMixin, listenVoiceMixin],

  components: {
    Microphone
  },

  methods: {
    createAvatar() {
      const options = {
        // 0 false ; 1 true
        displayControl: 0,
        width: window.innerWidth/3,
        height: window.innerHeight,
        avatarImgUrl: 'vhss.oddcast.com/ccs2/vhss/user/cf5/7111608/thumbs/show_2658390.jpg',
        sitePalOptionHash: 'cb0103293341f84cf3ca7b7a5b73bf18',
        position: {
          x: 15,
          y: 0,
        },
        alignment: 'L',
        idleMovement: {
          frequency: 70,
          radius: 30
        },
      };

      // eslint-disable-next-line
      AC_VHost_Embed(7111608,
        options.height, options.width,
        '', 1, options.displayControl, 2658390, 0, 1, 0,
        options.sitePalOptionHash, 0,
        `0|0|${options.position.x}|${options.position.y}|${options.alignment}|B|true|0|0|0|0|${options.avatarImgUrl}|Double%20click%20to%20play%20me|0|'C'|0|0|0|1828`);

      window.vh_talkStarted = () => {
        this.$store.dispatch('startTalking');
      };

      window.vh_talkEnded = () => {
        this.$store.dispatch('stopTalking');
      };

      window.vh_sceneLoaded = () => {
        // eslint-disable-next-line
        setIdleMovement(options.idleMovement.frequency, options.idleMovement.radius);
        this.$store.commit('SET_SITEPAL_LOADED', true);
      };

      window.addEventListener('beforeunload', () => {
        this.$store.commit('SET_SITEPAL_LOADED', false);
      });
    },
  },

  mounted() {
    this.createAvatar();
  },

  beforeDestroy() {
    console.log('BEFORE DESTROY IN RONA VUE');
    // this.$store.commit('SITEPAL_LOADED', false);
  },
};
</script>

<style lang="scss" scoped>
</style>
