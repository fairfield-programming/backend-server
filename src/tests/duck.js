const supertest = require("supertest");
const server = require("../index");
const {
  expectHtmlTypeHeader,
  expectCode,
  expect200,
} = require("../library/testUtils");

const requestWithSupertest = supertest(server);

describe("GET /duck", () => {
  it("should return a 200 and a duck along with it", () => {
    expectSuccess("/duck");
  });
});

describe("GET /duck/:id/", () => {
  it("should return a 200 and a duck along with it", () => {
    expectSuccess("/duck/10100000004000032");
  });

  it("should return a 400 when a bad id is sent (short)", () => {
    expectFailure("/duck/1010000000400003");
  });

  it("should return a 400 when a bad id is sent (long)", () => {
    expectFailure("/duck/101000000040000323");
  });

  it("should return a 400 when a bad id is sent (cant parse)", () => {
    expectFailure("/duck/1010!0000@4000032");
  });
});

describe("GET /duck/:id/:zoom", () => {
  it("should return a 200 and a duck along with it", () => {
    expectSuccess("/duck/10100000004000032/20");
  });

  it("should return a 400 when a bad id is sent (short)", () => {
    expectFailure("/duck/1010000000400003/20");
  });

  it("should return a 400 when a bad id is sent (long)", () => {
    expectFailure("/duck/101000000040000323/20");
  });

  it("should return a 400 when a bad id is sent (cant parse)", () => {
    expectFailure("/duck/10100(00@04000032/20");
  });
});

async function expectSuccess(path) {
  const res = await requestWithSupertest.get(path);
  expect200(res);
  expect(res.type).toEqual(expect.stringContaining("svg"));
}

async function expectFailure(path) {
  const res = await requestWithSupertest.get("/duck/10100(00@04000032/20");
  expect(res.status).toEqual(400);
  expect(res.type).toEqual(expect.stringContaining("html"));
}
