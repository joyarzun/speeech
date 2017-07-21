const speeech = require("../src/index");

const serviceConfig = require("../witkeyfile.json");

speeech.emit("start", speeech.witService(serviceConfig));
speeech.on("result", result => console.log("result", result));
