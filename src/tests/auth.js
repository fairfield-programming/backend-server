const supertest = require("supertest");
const server = require("../index");
const { JWT_TOKEN } = require("../library/constants");

const requestWithSupertest = supertest(server);
const { DetectVulgarWords } = require("../library/VulgarTest");

process.env.JWT_KEY = JWT_TOKEN;

describe("Auth Endpoints", () => {
  describe("POST /user/signup", () => {
    it("should throw a 400 if not all params are given", async () => {
      const res = await requestWithSupertest.post("/user/signup");

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if not all params are given (email)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william-mcgonagle",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if not all params are given (username)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          password: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if not all params are given (password)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad password (no uppercase)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "testing123!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad password (no lowercase)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "TESTING123!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad password (no numbers)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "Testing!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad password (no symbols)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "Testing123",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad password (short)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "Te!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad password (long)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "Testing11111111111111111111111!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad email", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad username (spaces)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william mcgonagle",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad username (uppercase)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "William-McGonagle",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad username (numbers)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william-mcgonagle1",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad username (symbols)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william@mcgonagle",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad username (short)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "wil",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 400 if bad username (long)", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william-mcgonagle-the-best-programmer-in-the-world",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 200 if successful", async () => {
      const res = await requestWithSupertest.post("/user/signup").send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
    });
  });

  describe("POST /user/login", () => {
    it("should throw a 200 if successful (username)", async () => {
      const res = await requestWithSupertest.post("/user/login").send(
        {
          username: "william-mcgonagle",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
    });

    it("should throw a 200 if successful (email)", async () => {
      const res = await requestWithSupertest.post("/user/login").send(
        {
          email: "testing@fairfieldprogramming.org",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
    });

    it("should throw a 404 if account not found (email)", async () => {
      const res = await requestWithSupertest.post("/user/login").send(
        {
          email: "testing@fairfieldprogramming.or",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 404 if account not found (username)", async () => {
      const res = await requestWithSupertest.post("/user/login").send(
        {
          username: "will-mcgonagle",
          password: "Testing123!",
        },
      );

      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });

    it("should throw a 403 if incorrect password", async () => {
      const res = await requestWithSupertest.post("/user/login").send(
        {
          username: "william-mcgonagle",
          password: "Testing123",
        },
      );

      expect(res.status).toEqual(403);
      expect(res.type).toEqual(expect.stringContaining("html"));
    });
  });

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
});
