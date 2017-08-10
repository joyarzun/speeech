const record = require("node-record-lpcm16");
const detector = require("./detector");

module.exports = speeech => {
  const mic = record.start({
    threshold: 0,
    verbose: false
  });
  speeech.detector = detector(speeech);
  speeech.record = record;
  //to not create detector again, end: false
  mic.pipe(speeech.detector, { end: false });
  return mic;
};
