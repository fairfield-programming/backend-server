function expectHtmlTypeHeader(res) {
  expect(res.type).toEqual(expect.stringContaining("html"));
}

function expectCode(res, code) {
  expect(res.status).toEqual(code);
}

function expect400(res) {
  expectCode(res, 400);
}

module.exports = {
  expectHtmlTypeHeader,
  expect400,
  expectCode,
}
