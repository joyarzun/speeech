const serviceConfig = {
  snowboy: {
    models: {
      file: "jarvis.pmdl",
      hotwords: "jarvis"
    }
  },
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
  },
  apiAiToken: require("../apiAikeyfile.json").apiAiToken,
  defautResponse: "Oh, I don't understand",
  userTitle: "master"
};
const sayp = require("say-promise");
const apiai = require("apiai");
const app = apiai(serviceConfig.apiAiToken);
const speeech = require("../src/index")(serviceConfig);

speeech.on("result", result => processIntent(result));
speeech.emit("start", speeech.googleService(serviceConfig));

const processIntent = result => {
  if (!result) return console.log(result);
  const request = app.textRequest(result, {
    sessionId: "1234"
  });

  request.on("response", function(response) {
    if (!response.result.actionIncomplete) {
      const intentName = response.result.metadata.intentName;
      const speech = response.result.fulfillment.messages[0].speech;

      switchcaseF({
        "Default Welcome Intent": speechResult(speech),
        weather: speechResult(speech)
      })(defaultIntent)(intentName);
    } else defaultIntent();
  });

  request.on("error", function(error) {
    console.log(error);
  });

  request.end();
};

const defaultIntent = () =>
  sayp.speak(`${serviceConfig.defautResponse}, ${serviceConfig.userTitle}`);

const speechResult = speech => () => {
  sayp.speak(`${speech}, ${serviceConfig.userTitle}`);
};

// More functional programming :)
const switchcase = cases => defaultCase => key =>
  key in cases ? cases[key] : defaultCase;
const switchcaseF = cases => defaultCase => key =>
  switchcase(cases)(defaultCase)(key)();
