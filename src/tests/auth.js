const supertest = require("supertest");
const server = require("../index");
const {
  expectHtmlTypeHeader,
  expectCode,
  expect400,
  expect200,
} = require("../library/testUtils");
const { JWT_TOKEN } = require("../library/constants");

const requestWithSupertest = supertest(server);

process.env.JWT_KEY = JWT_TOKEN;

async function expectFailureOnSend(
  path,
  givenUsername = "william-mcgonagle",
  givenEmail = "testing@fairfieldprogramming.org",
  givenPassword = "Testing123!"
  ) {
    const res = await requestWithSupertest.post(path).send(
      {
        username: givenUsername,
        email: givenEmail,
        password: givenPassword,
      }
    );
    expect400(res);
    expectHtmlTypeHeader(res);
}

describe("Auth Endpoints", () => {
  const path = "/user/signup";

  describe("POST /user/signup", () => {
    it("should throw a 400 if not all params are given", async () => {

      const res = await requestWithSupertest.post(path);

      expect400(res);
      expectHtmlTypeHeader(res);
      expect
    });

    it("should throw a 400 if not all params are given (email)", async () => {
      expectFailureOnSend(path, email = null);
    });

    it("should throw a 400 if not all params are given (username)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          password: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if not all params are given (password)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad password (no uppercase)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "testing123!",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad password (no lowercase)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "TESTING123!",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad password (no numbers)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "Testing!",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad password (no symbols)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "Testing123",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad password (short)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "Te!",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad password (long)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "Testing11111111111111111111111!",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad email", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad username (spaces)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william mcgonagle",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad username (uppercase)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "William-McGonagle",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad username (numbers)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william-mcgonagle1",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad username (symbols)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william@mcgonagle",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad username (short)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "wil",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 400 if bad username (long)", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william-mcgonagle-the-best-programmer-in-the-world",
          email: "testing@fairfieldprogramming",
          password: "Testing123!",
        },
      );

      expect400(res);
      expectHtmlTypeHeader(res);
    });

    it("should throw a 200 if successful", async () => {
      const res = await requestWithSupertest.post(path).send(
        {
          username: "william-mcgonagle",
          email: "testing@fairfieldprogramming.org",
          password: "Testing123!",
        },
      );

      expect200(res);
      expect(res.type).toEqual(expect.stringContaining("json"));
    });
  });

});

describe("POST /user/login", () => {
  const path = "/user/login";
  
  it("should throw a 200 if successful (username)", async () => {
    const res = await requestWithSupertest.post(path).send(
      {
        username: "william-mcgonagle",
        password: "Testing123!",
      },
    );

    expect200(res);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("should throw a 200 if successful (email)", async () => {
    const res = await requestWithSupertest.post(path).send(
      {
        email: "testing@fairfieldprogramming.org",
        password: "Testing123!",
      },
    );

    expect200(res);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("should throw a 404 if account not found (email)", async () => {
    const res = await requestWithSupertest.post(path).send(
      {
        email: "testing@fairfieldprogramming.or",
        password: "Testing123!",
      },
    );

    expect(res.status).toEqual(404);
    expectHtmlTypeHeader(res);
  });

  it("should throw a 404 if account not found (username)", async () => {
    const res = await requestWithSupertest.post(path).send(
      {
        username: "will-mcgonagle",
        password: "Testing123!",
      },
    );

    expect(res.status).toEqual(404);
    expectHtmlTypeHeader(res);
  });

  it("should throw a 403 if incorrect password", async () => {
    const res = await requestWithSupertest.post(path).send(
      {
        username: "william-mcgonagle",
        password: "Testing123",
      },
    );

    expect(res.status).toEqual(403);
    expectHtmlTypeHeader(res);
  });
});
