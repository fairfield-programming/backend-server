const server = require("../index.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("GET /jokes", () =>
{
    it("should return a 200 and all the jokes", async () =>
    {
        const res = await requestWithSupertest.get("/jokes");

        expect(typeof res.body).toBe("object");
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("json"));
    });
});

describe("GET /jokes/:id", () =>
{
    it("should return a 200 and all the jokes", async () =>
    {
        const res = await requestWithSupertest.get("/jokes/0");
        expect(res.type).toEqual(expect.stringContaining("html"));
    });
});

describe("GET /jokes/count", () =>
{
    it("should return a 200 and the joke count", async () =>
    {
        const res = await requestWithSupertest.get("/jokes/count");

        expect(typeof res.text).toBe("string");

        const number = parseInt(res.text, 10);
        expect(isNaN(number)).toBe(false);

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("html"));
    });
});

describe("GET /jokes/random", () =>
{
    it("should return a 200 and a joke", async () =>
    {
        const res = await requestWithSupertest.get("/jokes/random");

        expect(typeof res.text).toBe("string");
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("html"));
    });
});

describe("GET /joke", () =>
{
    it("should return a 200 and a joke", async () =>
    {
        const res = await requestWithSupertest.get("/joke");

        expect(typeof res.text).toBe("string");
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("html"));
    });
});