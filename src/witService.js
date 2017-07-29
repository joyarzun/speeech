const request = require("request");

const configStreamingService = config => speeech => () => {
  const witService = witToken => {
    return request.post(
      {
        url: "https://api.wit.ai/speech?v=20170307",
        headers: {
          Authorization: "Bearer " + witToken,
          "Content-Type": "audio/wav"
        }
      },
      (err, resp, body) => {
        if (err) speeech.emit("error", err);
        else speeech.emit("result", JSON.parse(body));
        speeech.emit("start", null);
      }
    );
  };

  speeech.record.stop();
  speeech.record.start().pipe(witService(config.witToken));
};

module.exports = configStreamingService;
