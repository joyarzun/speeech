const configStreamingService = config => speeech => () => {
  const speechService = require("@google-cloud/speech").v1(config.auth);
  const recognizeStream = speechService.streamingRecognize(config.streaming);

  recognizeStream.on("data", data => {
    if (data.results[0] && data.results[0].isFinal === true) {
      const result = data.results[0].alternatives[0].transcript;
      speeech.mic.unpipe(recognizeStream);
      speeech.emit("result", result);
      recognizeStream.end();
    }
  });

  speeech.mic.pipe(recognizeStream);
};

module.exports = configStreamingService;
