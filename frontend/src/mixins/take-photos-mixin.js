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
      const isNewPerson = Math.random() >= 0.5;
      let personId = null;
      if (isNewPerson || !this.$store.state.person) {
        personId = (Math.floor(Math.random() * 3) + 1).toString();
      } else {
        personId = this.$store.state.person.id;
      }

      const faceRecognitionMock = {
        "facePresent": Math.random() >= 0.5,
        "landmarks": {
          "eyesCenter": {
            "x": 0,
            "y": 0
          }
        },
        "personId": personId
      };
      this.$store.dispatch('setFaceRecognitionData', faceRecognitionMock);
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
