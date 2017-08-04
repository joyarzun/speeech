module.exports = {
  snowboy: {
    models: {
      file: "node_modules/snowboy/resources/snowboy.umdl",
      sensitivity: "0.5",
      hotwords: "snowboy"
    },
    detector: {
      resource: "node_modules/snowboy/resources/common.res",
      audioGain: 2.0
    }
  }
};
