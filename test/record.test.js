const EventEmitter = require("events");
const speeech = require("../src/index")();
const record = require("../src/record");

describe("Record", () => {
  it("should be an instance of Stream", () => {
    expect(record(speeech)).toBeInstanceOf(EventEmitter);
  });
});
