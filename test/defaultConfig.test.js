const fs = require("fs");
const defaultConfig = require("../src/defaultConfig");

describe("Default config", () => {
  describe("snowboy models", () => {
    it("should have an existing file model", () => {
      expect(fs.existsSync(defaultConfig.snowboy.models.file)).toBe(true);
    });
  });

  describe("snowboy detector", () => {
    it("should have an existing file detector", () => {
      expect(fs.existsSync(defaultConfig.snowboy.detector.resource)).toBe(true);
    });
  });
});
