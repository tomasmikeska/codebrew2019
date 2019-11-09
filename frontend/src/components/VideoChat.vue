<template>
  <div class="remote-video-wrapper">
    <video class="remote-video" ref="remoteVideo" autoplay></video>
  </div>
</template>

<script>
export default {
  name: 'VideoChat',
  data() {
    return {
      configuration: {
        iceServers: [
          { url: 'stun:stun.l.google.com:19302' },
        ],
      },
      drone: {},
      roomName: 'observable-ARTIN-Rona',
      pc: {},
      room: {},
      isCalling: false,
      iceCandidates: [],
    };
  },
  methods: {
    onSuccesConnection() {
      console.log('Succefully connected to the signaling server');
    },
    onFailureConnection(erorr) {
      console.log(`Error during connection ${erorr}`);
    },
    connectToTheSignalingServer() {
      if (!navigator.mediaDevices) {
        console.log('Cannot acces audio and camera of the device');
        return;
      }
      // eslint-disable-next-line
        this.drone = new ScaleDrone(this.$store.state.videoChatChannelId);

      this.drone.on('open', (error) => {
        this.connectToChatRoom(error);
      });

      this.drone.on('reconnect', (error) => {
        this.connectToChatRoom(error);
      });
    },

    connectToChatRoom(error) {
      if (error) {
        return this.onFailureConnection(error);
      }
      this.room = this.drone.subscribe(this.roomName);
      this.room.on('open', (e) => {
        if (error) {
          this.onFailureConnection(e);
        }
      });

      this.startWebRTC();
      this.startListeningToSignals();

      return this.onSuccesConnection();
    },

    startWebRTC() {
      this.pc = new RTCPeerConnection(this.configuration);
      // 'onicecandidate' notifies us whenever an ICE agent needs to deliver a
      // message to the other peer through the signaling server
      this.pc.onicecandidate = (event) => {
        if (event.candidate) {
          this.iceCandidates.push({ candidate: event.candidate });
        }
      };

      this.resolveMediaDevices();
    },

    resolveMediaDevices() {
      this.pc.ontrack = (event) => {
        const firstStreamIndex = 0;
        this.$refs.remoteVideo.srcObject = event.streams[firstStreamIndex];
      };

      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      }).then((stream) => {
        stream.getTracks().forEach((track) => {
          this.pc.addTrack(track, stream);
        });
      }, this.onFailureConnection);
    },

    startListeningToSignals() {
      this.room.on('message', (message) => {
        // eslint-disable-next-line no-unused-vars
        const { data, clientId } = message;

        // Message was sent by us
        if (clientId === this.drone.clientId) {
          return;
        }
        if (data.sdp) {
          // This is called after receiving an offer or answer from another peer
          this.pc.setRemoteDescription(new RTCSessionDescription(data.sdp), () => {
            // When receiving an offer lets answer it
            if (this.pc.remoteDescription.type === 'offer') {
              this.pc.createAnswer().then(this.localDescCreated).catch(this.onFailureConnection);
            }
          }, this.onFailureConnection);
          const self = this;
          if (self.pc && self.pc.remoteDescription && self.pc.remoteDescription.type) {
            for (let i = 0; i < self.iceCandidates.length; i += 1) {
              console.log(self.iceCandidates[i]);
              this.sendMessage(self.iceCandidates.shift());
            }
          }
        } else if (data.candidate) {
          // Add the new ICE candidate to our connections remote description
          this.pc.addIceCandidate(
            new RTCIceCandidate(data.candidate), this.onSuccesConnection, this.onFailureConnection,
          );
        }
      });
    },

    sendMessage(message) {
      this.drone.publish({
        room: this.roomName,
        message,
      });
    },

    localDescCreated(desc) {
      this.pc.setLocalDescription(
        desc,
        () => this.sendMessage({ sdp: this.pc.localDescription }),
        this.onFailureConnection,
      );
    },
  },

  beforeDestroy() {
    console.log('Disconnecting from peer-to-peer connection');
    this.pc.close();
  },

  mounted() {
    this.connectToTheSignalingServer();
  },

};
</script>

<style lang="scss" scoped>
  .remote-video-wrapper {
    position: relative;
    background-color: #ffffff;
    z-index: 9999999;
  }

  .remote-video {
    position: absolute;
    transform: rotate(90deg);

    transform-origin: bottom left;
    width: 100vh;
    height: 100vw;
    margin-top: -100vw;
    object-fit: cover;

    visibility: visible;
  }

</style>
