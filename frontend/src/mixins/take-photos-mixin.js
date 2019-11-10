const axios = require('axios');

export default {
  data() {
    return {
      videoSource: null,
      takePhotosLoop: null
    };
  },
  methods: {
    loadVideo() {
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then(stream => {
          this.videoSource = stream;
        });
    },
    startTakingPhotos(intervalInMilliseconds) {
      this.takePhotosLoop = setInterval(() => {
        this.takePhoto();
      }, intervalInMilliseconds);
    },
    takePhoto() {
      if (this.videoSource && this.$store.state.isSitePalLoaded) {
        const videoTrack = this.videoSource.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);
        imageCapture.takePhoto().then(photo => {
          this.sendPhoto(photo);
        });
      }
    },
    sendPhoto(photo) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onloadend = () => {
        const base64data = reader.result;

        axios.post('http://34.89.243.150:5050', {
          img: base64data
        })
          .then(resp => {
            this.$store.dispatch('setFaceRecognitionData', resp.data);
          });
      }
    },
    stopTakingPhotos() {
      clearInterval(this.takePhotosLoop);
    }
  },
  mounted() {
    this.loadVideo();
    this.startTakingPhotos(1000);
  },
  beforeDestroy() {
    this.stopTakingPhotos();
  }
};
