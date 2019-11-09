import { mapGetters, mapActions } from "vuex";
const axios = require('axios');

export default {
  data() {
    return {
      SpeechSDK: null,
      transcription: "",
      stream: null,
      token: null,
    };
  },
  computed: {
    ...mapGetters(["isListening"])
  },
  methods: {
    ...mapActions(["sendMessage"]),
    getTranscription() {
      return this.transcription;
    },
    transcribeFromMic() {
      const speechConfig = this.SpeechSDK.SpeechConfig.fromSubscription(
        this.token, // token
        "francecentral" // region
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
          this.sendMessage(result.text);

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
    }
  },
  async created() {
    console.log('created from listen voice mixin');
    this.token = (await axios.get('http://localhost:3333/azure')).data;
  },
  mounted() {
    this.SpeechSDK = window.SpeechSDK;
  },
  watch: {
    isListening(newValue, oldValue) {
      if (!oldValue && newValue) {
        this.transcribeFromMic();
      }
    }
  }
};
