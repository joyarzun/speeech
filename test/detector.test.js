const defaultConfig = require("../src/defaultConfig");

describe("Detector", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("When create detector and emit hotword", () => {
    it("should emit an hotword event in speeech", () => {
      const detector = require("../src/detector");
      const mockSpeeech = {
        emit: jest.fn(),
        config: defaultConfig
      };

      const mydetector = detector(mockSpeeech);
      mydetector.emit("hotword");

      expect(mockSpeeech.emit.mock.calls.length).toBe(1);
    });
  });

  describe("When create two detector and emit hotword", () => {
    it("should emit just one hotword event in speeech", () => {
      const detector = require("../src/detector");
      const mockSpeeech = {
        emit: jest.fn(),
        config: defaultConfig
      };

      let mydetector = detector(mockSpeeech);
      mydetector = detector(mockSpeeech);
      mydetector.emit("hotword");

      expect(mockSpeeech.emit.mock.calls.length).toBe(1);
    });
  });
});
