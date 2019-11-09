export default {
  data() {
    return {
      videoSource: null,
      takePhotosInterval: null
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
      this.takePhotosInterval = setInterval(() => {
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
      console.log("photo :", photo);
    },
    stopTakingPhotos() {
      clearInterval(this.takePhotosInterval);
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
