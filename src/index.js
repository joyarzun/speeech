const EventEmitter = require("events");
const defaultsDeep = require("lodash.defaultsdeep");
const record = require("./record");
const googleService = require("./googleService");
const witService = require("./witService");
const defaultConfig = require("./defaultConfig");

const speeech = new class extends EventEmitter {}();
speeech.googleService = googleService;
speeech.witService = witService;

speeech.on("start", streamingService => {
  speeech.mic = record(speeech);
  if (streamingService)
    speeech.startStreamingService = streamingService(speeech);
});

speeech.on("hotword", ({ index, hotword }) => {
  console.log("hotword", hotword);
  speeech.startStreamingService();
});

speeech.on("error", err => console.error(err));

const setup = config => {
  speeech.config = defaultsDeep({}, config, defaultConfig);
  return speeech;
};

module.exports = config => setup(config);
