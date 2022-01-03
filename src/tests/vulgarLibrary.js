const supertest = require("supertest");
const server = require("../index");
const { JWT_TOKEN } = require("../library/constants");

const requestWithSupertest = supertest(server);
const { DetectVulgarWords } = require("../library/VulgarTest");

describe("Test Vulgar Library", () => {
  it("should not trigger for normal sentences", async () => {
    expect(DetectVulgarWords("Hey there! My name is William.")).toBe(
      false,
    );
    expect(
      DetectVulgarWords("Do you guys like pandas? I love them!"),
    ).toBe(false);
  });

  it("should trigger when swears are detected", async () => {
    expect(DetectVulgarWords("Fuck")).toBe(true);
    expect(DetectVulgarWords("Shit")).toBe(true);
  });

  it("shouldn't care about capitalization", async () => {
    expect(DetectVulgarWords("FuCK")).toBe(true);
    expect(DetectVulgarWords("ShIt")).toBe(true);
  });

  it("should block symbols as well", async () => {
    expect(DetectVulgarWords("@ss")).toBe(true);
    expect(DetectVulgarWords("@$$")).toBe(true);
  });
});