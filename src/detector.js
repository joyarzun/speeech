const EventEmitter = require("events");
const { Detector, Models } = require("snowboy");

const models = new Models();

models.add({
  file: "node_modules/snowboy/resources/snowboy.umdl",
  sensitivity: "0.5",
  hotwords: "snowboy"
});

const detector = new Detector({
  resource: "node_modules/snowboy/resources/common.res",
  models: models,
  audioGain: 2.0
});

const setDetector = speeech => {
  //to not create detector again
  if (EventEmitter.listenerCount(detector, "hotword") == 0) {
    detector.on("hotword", function(index, hotword, buffer) {
      speeech.emit("hotword", { index, hotword });
    });
  }
  return detector;
};

module.exports = setDetector;
