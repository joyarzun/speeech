const speeech = require("../src/index");
const get = require("lodash.get");

const serviceConfig = require("../witkeyfile.json");

const process = result => {
  const intent = get(result, "entities.intent[0].value");
  console.log(`The  intent is ${intent}`);
};

speeech.emit("start", speeech.witService(serviceConfig));
speeech.on("result", result => process(result));
