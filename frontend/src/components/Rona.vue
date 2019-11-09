<template>
  <div>
    <div id='divVHSS'></div>
    <img v-if="!$store.state.isSitePalLoaded" alt="Rona image when sitePal not loaded" class="rona_img"  src="../assets/rona.png">
  </div>
</template>

<script>
export default {
  name: 'Rona',

  methods: {
    createAvatar() {
      const options = {
        // 0 false ; 1 true
        displayControl: 0,
        width: window.innerWidth,
        height: 1487,
        avatarImgUrl: 'vhss.oddcast.com/ccs2/vhss/user/cf5/7111608/thumbs/show_2658390.jpg',
        sitePalOptionHash: 'cb0103293341f84cf3ca7b7a5b73bf18',
        position: {
          x: 15,
          y: -180,
        },
        alignment: 'C',
        idleMovement: {
          frequency: 70,
          radius: 30,
        },
      };

      // eslint-disable-next-line
      AC_VHost_Embed(7111608,
        options.height, options.width,
        '', 1, options.displayControl, 2658390, 0, 1, 0,
        options.sitePalOptionHash, 0,
        `0|0|${options.position.x}|${options.position.y}|${options.alignment}|B|true|0|0|0|0|${options.avatarImgUrl}|Double%20click%20to%20play%20me|0|'C'|0|0|0|1828`);

      window.vh_talkEnded = () => {
        this.$store.commit('STOPPED_TALKING');
      };

      window.vh_sceneLoaded = () => {
        // eslint-disable-next-line
        setIdleMovement(options.idleMovement.frequency,options.idleMovement.radius);
        this.$store.commit('SITEPAL_LOADED', true);
      };

      window.addEventListener('beforeunload', () => {
        this.$store.commit('SITEPAL_LOADED', false);
      });
    },
  },

  mounted() {
    this.createAvatar();
  },

  beforeDestroy() {
    console.log('BEFORE DESTROY IN RONA VUE');
    this.$store.commit('SITEPAL_LOADED', false);
  },
};
</script>

<style lang="scss" scoped>
  .rona_img {
    position: fixed;
    left: 0;
    bottom: -130px;
    width: 96vw;
    height: auto;
    margin: 0 2vw;
    z-index: 9999;
  }

</style>
