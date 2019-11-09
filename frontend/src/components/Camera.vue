<template>
  <div>
    <h1>Camera</h1>
    <div>
      <video class="video_stream" ref="videoStream" autoplay muted></video>
    </div>
  </div>
</template>

<script>
export default {
  name: "Camera",
  data() {
    return {
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
          this.$refs.videoStream.srcObject = stream;
        });
    },
    takePhotosPeriodically(intervalInMilliseconds) {
      this.takePhotosInterval = setInterval(() => {
        this.takePhoto();
      }, intervalInMilliseconds);
    },
    takePhoto() {
      const videoTrack = this.$refs.videoStream.srcObject.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);
      console.log("imageCapture :", imageCapture);
      imageCapture.takePhoto().then(photo => {
        this.sendPhoto(photo);
      });
    },
    sendPhoto(photo) {
      console.log("photo :", photo);
    }
  },
  mounted() {
    this.loadVideo();
    this.takePhotosPeriodically(1000);
  },
  beforeDestroy() {
    clearInterval(this.takePhotosInterval);
  }
};
</script>

<style lang="scss" scoped>
.video_stream {
  width: 500px;
}
</style>
