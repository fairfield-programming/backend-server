function expectHtmlTypeHeader(res) {
	expect(res.type).toEqual(expect.stringContaining('html'));
}

function expectCode(res, code) {
	expect(res.status).toEqual(code);
}

function expect400(res) {
	expectCode(res, 400);
}

function expect200(res) {
	expectCode(res, 200);
}

module.exports = {
	expectHtmlTypeHeader,
	expect400,
	expect200,
	expectCode,
};
