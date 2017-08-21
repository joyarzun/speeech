const EventEmitter = require("events");
const { Detector, Models } = require("snowboy");

const models = new Models();

let detector;

const setDetector = speeech => {
  //to not create all again
  if (!detector) {
    models.add(speeech.config.snowboy.models);

    const detectorConfig = Object.assign({}, speeech.config.snowboy.detector, {
      models: models
    });

    detector = new Detector(detectorConfig);

    detector.on("hotword", function(index, hotword, buffer) {
      speeech.emit("hotword", { index, hotword });
    });
  }
  return detector;
};

module.exports = setDetector;
