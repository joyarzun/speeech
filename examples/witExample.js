// For this example you need to install lodash.get
const speeech = require("../src/index")();
const get = require("lodash.get");

const serviceConfig = require("../witkeyfile.json");

const process = result => {
  const entities = get(result, "entities");
  console.log(`The  entities are `, entities);
};

speeech.emit("start", speeech.witService(serviceConfig));
speeech.on("result", result => process(result));
