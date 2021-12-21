const server = require('../index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('User Endpoints', () => {

    describe('POST /user/signup', () => {

        it('should throw a 400 if not all params are given', async () => {
        
            const res = await requestWithSupertest.post('/user/signup');
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('html'));
        
        });
    
        it('should throw a 400 if not all params are given (email)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william-mcgonagle',
                password: 'Testing123!'
            });
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('html'));
        
        });
    
        it('should throw a 400 if not all params are given (username)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                password: 'william-mcgonagle',
                email: 'testing@fairfieldprogramming.org'
            });
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('html'));
        
        });
    
        it('should throw a 400 if not all params are given (password)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william-mcgonagle',
                email: 'testing@fairfieldprogramming.org'
            });
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('html'));
        
        });

        it('should throw a 200 if successful', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william-mcgonagle',
                email: 'testing@fairfieldprogramming.org',
                password: 'Testing123!'
            });
    
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
        
        });

    })

    describe('GET /user', () => {

        it('should show all users', async () => {
        
            const res = await requestWithSupertest.get('/user/');

            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
        
        });

    })

});
