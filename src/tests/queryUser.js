// Setup Test
const fs = require('fs');
const path = require('path');
const { expectHtmlTypeHeader, expectCode, expect400, expect200 } = require('../library/testUtils');

if (fs.existsSync(path.join(__dirname, '../../database.db'))) {
	fs.rmSync(path.join(__dirname, '../../database.db'));
}

const supertest = require('supertest');
const server = require('../index');
const { JWT_TOKEN } = require('../library/constants');

const requestWithSupertest = supertest(server);

process.env.JWT_KEY = JWT_TOKEN;

// Create User
let token = '';

beforeAll((done) => {
	server.on('database-started', () => {
		requestWithSupertest
			.post('/user/signup')
			.send({
				username: 'william-mcgonagle',
				email: 'testing@fairfieldprogramming.org',
				password: 'Testing123!',
			})
			.then((res) => {
				token = res.body.token;
				done();
			});
	});
});

describe('GET /user', () => {
	it('should show all users', async () => {
		const res = await requestWithSupertest.get('/user/');

		expect(Array.isArray(res.body)).toEqual(true);
		expect200(res);
		expect(res.type).toEqual(expect.stringContaining('json'));
	});
});

describe('GET /user/:id', () => {
	it('should show a 404 when user not found', async () => {
		const res = await requestWithSupertest.get('/user/40000');

		// Expect HTTP Data
		expect(res.status).toEqual(404);
		expect(res.type).toEqual(expect.stringContaining('html'));
	});

	it('should show a user', async () => {
		const res = await requestWithSupertest.get('/user/1');

		// Expect to be Object
		expect(typeof res.body).toEqual('object');
		expect(Array.isArray(res.body)).toEqual(false);

		// Expect Parameters to be Existant
		expect(res.body.username).toBeDefined();
		expect(res.body.email).toBeDefined();
		expect(res.body.biography).toBeDefined();
		expect(res.body.profilePicture).toBeDefined();
		expect(res.body.createdAt).toBeDefined();
		expect(res.body.updatedAt).toBeDefined();
		expect(res.body.password).toBeUndefined();

		// Expect HTTP Data
		expect200(res);
		expect(res.type).toEqual(expect.stringContaining('json'));
	});
});

describe('GET /user/:id/status', () => {
	it('should show a user', async () => {
		const res = await requestWithSupertest.get('/user/1/status');

		// Check the Type
		expect(typeof res.text).toEqual('string');

		// Expect HTTP Data
		expect200(res);
		expect(res.type).toEqual(expect.stringContaining('html'));
	});
});
