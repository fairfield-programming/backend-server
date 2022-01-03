function expectHtmlTypeHeader(res) {
  expect(res.type).toEqual(expect.stringContaining("html"));
}

module.exports = { expectHtmlTypeHeader };
