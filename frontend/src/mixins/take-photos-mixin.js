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
      const videoTrack = this.videoSource.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);
      imageCapture.takePhoto().then(photo => {
        this.sendPhoto(photo);
      });
    },
    sendPhoto(photo) {
      const faceRecognitionMock = {
        "facePresent": Math.random() >= 0.5,
        "landmarks": {
          "eyesCenter": {
            "x": 0,
            "y": 0
          }
        },
        "personId": (Math.floor(Math.random() * 3) + 1).toString()
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
