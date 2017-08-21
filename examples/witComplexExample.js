// For this example you need to install say-promise lodash.get request-promise-native sound-player
// It uses the Accuweather Api. Get a key in developer.accuweather.com or run with stubby
// Put jarvis.pmdl detector model in root project. Get from https://snowboy.kitt.ai
// Finally you need to train you wit.ai model with intents: weather, greeting, todo and alarm
const speeechConfig = {
  snowboy: {
    models: {
      file: "jarvis.pmdl",
      hotwords: "jarvis"
    }
  }
};
const speeech = require("../src/index")(speeechConfig);
const get = require("lodash.get");
const sayp = require("say-promise");
const rp = require("request-promise-native");
const soundplayer = require("sound-player");
const serviceConfig = require("../witkeyfile.json");

const dong = new soundplayer({
  gain: 3,
  filename: "node_modules/snowboy/resources/dong.wav"
});

speeech.on("hotword", () => dong.play());
speeech.emit("start", speeech.witService(serviceConfig));
speeech.on("result", result => process(result));

const process = result => {
  const intent = get(result, "entities.intent[0].value");

  switchcaseF({
    weather: weatherIntent(result),
    greeting: greetingIntent(result),
    todo: todoIntent(result)
  })(defaultIntent)(intent);
};

const weatherIntent = result => () => {
  const location = get(result, "entities.location[0].value");
  console.log(location);
  getLocationKey(location)
    .then(getOneDayWeather)
    .then(data => sayp.speak(JSON.parse(data).Headline.Text + ", master"));
};

const greetingIntent = result => () => {
  sayp.speak("Hello, master");
};

const todoList = [];

const todoIntent = result => () => {
  const message = get(result, "entities.message[0].value");
  if (message) {
    sayp.speak(`The message is ${message}`);
    todoList.push(message);
  } else {
    if (todoList.length == 0) sayp.speak("There is no messages");
    else {
      let s = sayp.speak("List of messages");
      todoList.forEach((e, i) => {
        s = s.then(() => sayp.speak(`${i + 1}, ${e}`));
      });
    }
  }
};

const defaultIntent = () =>
  sayp.speak("I don't understand what you say, master");

const getOneDayWeather = locationKey =>
  rp({
    url:
      "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" +
      locationKey,
    qs: {
      apikey: "XXXXXX",
      language: "en-us"
    }
  });

const getLocationKey = location =>
  rp({
    url: "http://dataservice.accuweather.com/locations/v1/cities/autocomplete",
    qs: {
      apikey: "XXXXXX",
      q: location,
      language: "en-us"
    }
  }).then(data => JSON.parse(data)[0].Key);

// More functional programming :)
const switchcase = cases => defaultCase => key =>
  key in cases ? cases[key] : defaultCase;
const switchcaseF = cases => defaultCase => key =>
  switchcase(cases)(defaultCase)(key)();
