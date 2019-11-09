<template>
    <div>
        <div class="instruction_text">
            Prosím vyfoť se minimalne 3-krát (z různých úhlu).
        </div>
        <div class="instruction_text">
            Príklad fotek z různých úhlu.
        </div>
        <img alt="Sample of different head pose" src="../assets/sample_of_photos.png" >
        <div class="photo_and_video_conainer">

            <div>
                <div class="video_container">
                    <video class="video_stream" ref="videoStream" autoplay muted></video>
                </div>
                <div class="take_photo" style="cursor: pointer" @click="takePhoto">
                    <i class="fa fa-camera fa-7x" aria-hidden="true"></i>
                </div>
            </div>
            <div>
                <div v-for="(item, index) in takenPhotos" :key="item.id">
                    <TakenImage :source="item.photoUrl" :index="index"  @remove="handleRemove" ></TakenImage>
                </div>
            </div>

            <div v-if="takenPhotos.length >= 3">
                <button class="btn-info" style="margin-right: 50px" @click="nextState()"> Pokračuj </button>
            </div>
        </div>
    </div>
</template>

<script>
  import TakenImage from "./TakenImage";
  export default {
    name: "TakePhoto",
    components:{
      TakenImage,
    },
    data() {
      return {
        takenPhotos:[],
        nextPhotoId: 0,
      };
    },
    methods: {
      loadVideo() {
        navigator.mediaDevices.getUserMedia({
          video: true,
        }).then((stream) => {
          this.$refs.videoStream.srcObject = stream;
        });
      },

      nextState(){
        const self = this;
        let counterOfConvertedPhotos = 0;

        for(let i=0; i < self.takenPhotos.length; i++) {
          let reader = new FileReader();

          reader.onload = function () {
            self.$store.state.photos.push(reader.result.replace(/^data:.+;base64,/, ''));
            counterOfConvertedPhotos ++;
            if (counterOfConvertedPhotos >= self.takenPhotos.length) {
              self.$store.state.stateOfForm = 'finish'
            }
          };

          reader.readAsDataURL(self.takenPhotos[i].blob);
        }
      },

      takePhoto() {
        const videoTrack = this.$refs.videoStream.srcObject.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);
        imageCapture.takePhoto().then((photo) => {
          this.takenPhotos.push(
            {
              id: this.nextPhotoId,
              blob: photo,
              photoUrl: URL.createObjectURL(photo),
            });
          this.nextPhotoId++;
        });
      },
      handleRemove(event, index) {
        this.takenPhotos.splice(index, 1);
      }

    },
    mounted() {
      this.loadVideo()
    }
  }
</script>

<style scoped>
    .video_stream{
        width: 500px;
    }
    .take_photo{
        color: #354a5e;
    }
    .photo_and_video_conainer{
        display: flex;
        justify-content: flex-start;
        margin-top: 50px;
    }

    .video_container{
        margin-left: 50px;
    }


</style>
