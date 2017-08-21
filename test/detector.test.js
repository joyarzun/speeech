const detector = require("../src/detector");

describe("When detector emit hotword", () => {
  it("should emit an hotword event in speeech", () => {
    const mockSpeeech = {
      emit: jest.fn()
    };

    const mydetector = detector(mockSpeeech);
    mydetector.emit("hotword");

    expect(mockSpeeech.emit.mock.calls.length).toBe(1);
  });
});
