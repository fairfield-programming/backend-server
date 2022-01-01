// Setup Test
const fs = require('fs');
const path = require('path');
const { JWT_TOKEN } = require("../library/constants");

if (fs.existsSync(path.join(__dirname, '../../database.db'))) fs.rmSync(path.join(__dirname, '../../database.db'));

// Run Test
const server = require('../index.js');
const supertest = require('supertest');

const requestWithSupertest = supertest(server);

process.env.JWT_KEY = JWT_TOKEN;

// Create User
let token = '';

beforeAll((done) => {
  server.on('database-started', () => {
    requestWithSupertest
      .post('/user/signup')
      .send(
        {
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

it('empty', () => {
  expect(1).toEqual(1);
});