const speeech = require("../src/index");
const get = require("lodash.get");
const say = require("say");

const serviceConfig = require("../witkeyfile.json");

const process = result => {
  const intent = get(result, "entities.intent[0].value");
  if (intent === "weather") {
    const location = get(result, "entities.location[0].value");
    say.speak("You want weather of " + location);
  }
  console.log(result.entities);
};

speeech.emit("start", speeech.witService(serviceConfig));
speeech.on("result", result => process(result));
