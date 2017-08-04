const speeech = require("../src/index")();

const serviceConfig = {
  auth: {
    projectId: "streaming-speech-sample",
    keyFilename: "./keyfile.json"
  },
  streaming: {
    config: {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "en-US"
    },
    singleUtterance: true,
    interimResults: true
  }
};

speeech.emit("start", speeech.googleService(serviceConfig));
speeech.on("result", result => console.log("result", result));
