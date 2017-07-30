// For this example you need to install say lodash.get request-promise-native
// It uses the Accuweather Api. Get a key in developer.accuweather.com or run with stubby
const speeech = require("../src/index");
const get = require("lodash.get");
const say = require("say");
const rp = require("request-promise-native");

const serviceConfig = require("../witkeyfile.json");

const process = result => {
  const intent = get(result, "entities.intent[0].value");
  if (intent === "weather") {
    const location = get(result, "entities.location[0].value");
    getLocationKey(location)
      .then(getOneDayWeather)
      .then(data => say.speak(JSON.parse(data).Headline.Text + ", master"));
  } else {
    say.speak("I don't understand what you say, master");
  }
};

const getOneDayWeather = locationKey =>
  rp({
    url: "http://0.0.0.0:8882/forecasts/v1/daily/1day/" + locationKey,
    qs: {
      apikey: "myapikey"
    }
  });

const getLocationKey = location =>
  rp({
    url: "http://0.0.0.0:8882/locations/v1/cities/search",
    qs: {
      apikey: "myapikey",
      q: location
    }
  }).then(data => JSON.parse(data)[0].Key);

speeech.emit("start", speeech.witService(serviceConfig));
speeech.on("result", result => process(result));
