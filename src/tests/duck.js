const supertest = require("supertest");
const server = require("../index");
const { expectHtmlTypeHeader } = require("../library/testUtils");

const requestWithSupertest = supertest(server);

describe("GET /duck", () => {
  it("should return a 200 and a duck along with it", async () => {
    const res = await requestWithSupertest.get("/duck");

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("svg"));
  });
});

describe("GET /duck/:id/", () => {
  it("should return a 200 and a duck along with it", async () => {
    const res = await requestWithSupertest.get("/duck/10100000004000032");

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("svg"));
  });

  it("should return a 400 when a bad id is sent (short)", async () => {
    const res = await requestWithSupertest.get("/duck/1010000000400003");

    expect(res.status).toEqual(400);
    expectHtmlTypeHeader(res);
  });

  it("should return a 400 when a bad id is sent (long)", async () => {
    const res = await requestWithSupertest.get("/duck/101000000040000323");

    expect(res.status).toEqual(400);
    expectHtmlTypeHeader(res);
  });

  it("should return a 400 when a bad id is sent (cant parse)", async () => {
    const res = await requestWithSupertest.get("/duck/1010!0000@4000032");

    expect(res.status).toEqual(400);
    expectHtmlTypeHeader(res);
  });
});

describe("GET /duck/:id/:zoom", () => {
  it("should return a 200 and a duck along with it", async () => {
    const res = await requestWithSupertest.get("/duck/10100000004000032/20");

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("svg"));
  });

  it("should return a 400 when a bad id is sent (short)", async () => {
    const res = await requestWithSupertest.get("/duck/1010000000400003/20");

    expect(res.status).toEqual(400);
    expectHtmlTypeHeader(res);
  });

  it("should return a 400 when a bad id is sent (long)", async () => {
    const res = await requestWithSupertest.get("/duck/101000000040000323/20");

    expect(res.status).toEqual(400);
    expectHtmlTypeHeader(res);
  });

  it("should return a 400 when a bad id is sent (cant parse)", async () => {
    const res = await requestWithSupertest.get("/duck/10100(00@04000032/20");

    expect(res.status).toEqual(400);
    expectHtmlTypeHeader(res);
  });
});
