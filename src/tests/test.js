const server = require('../index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('User Endpoints', () => {

    it('GET /user should show all users', async () => {
      const res = await requestWithSupertest.get('/user/');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        // expect(res.body)
    });
  
});