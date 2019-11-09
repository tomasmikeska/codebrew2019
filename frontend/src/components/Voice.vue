<template>
  <div>
    <div id="voice">
      <button v-on:click="transcribeFromMic">Start Microphone Transcription</button>
      <button v-on:click="stopTranscription">Stop</button>
      <p>Transcription: "{{ getTranscription() }}"</p>
      <h2>Output:</h2>
      <div id="output">--</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Voice",

  data() {
    return {
      SpeechSDK: null,
      transcription: "",
      stream: null
    };
  },

  methods: {
    getTranscription() {
      return this.transcription;
    },
    transcribeFromMic() {
      const speechConfig = this.SpeechSDK.SpeechConfig.fromSubscription(
        "", // token
        "" // region
      );
      speechConfig.speechRecognitionLanguage = "en-US";
      const audioConfig = this.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
      let recognizer = new this.SpeechSDK.SpeechRecognizer(
        speechConfig,
        audioConfig
      );

      recognizer.recognizeOnceAsync(
        result => {
          console.log(result);
          console.log(result);
          this.transcription = result.text ? result.text : "";
          console.log(result);

          recognizer.close();
          recognizer = undefined;
        },
        err => {
          this.transcription = err;
          console.log(err);

          recognizer.close();
          recognizer = undefined;
        }
      );
    },
    stopTranscription() {
      if (this.stream) {
        this.stream.stop();
      }
    }
  },

  mounted() {
    this.SpeechSDK = window.SpeechSDK;
  }
};
</script>

<style lang="scss" scoped>
#voice {
  display: block;
}
</style>
