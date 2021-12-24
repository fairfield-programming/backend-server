const server = require('../index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

process.env.JWT_KEY = '4f1dde6a54346ab08b04785a7a8baf076e917293ae189ccda95358045eba4831b41449a1526014f1c3796b66a7a48ac9880b7447dba7cb70f2f65de29ec22e30d802ab8685a738c9e6fb889cdf7a810fe752e24f6827c4386b5bc565b906f88f62b7dcce813a8a57975cee9613b5b20c428db8a9619896d7078aa20b3a50b89a928179a9c8ccd8ce458889be7f0ee8b802f97b6150e66ae46824d6a3738594eec9118883aa629a7f93442823f3dd177a02fbe3f39a3462527dda6e44e8ba92f72c509e2b77d676821f97fc1639408d6fd85c64c42343261dea9e664d7a9544f1940d6db691712bb8a593d81c1315dae054e3b87025580c456cd65054183d92962756f62e1040d0d11486d3a912b1bfa99e5e311461f319d544d4b22b0e1d33bc1ad85dc2552248ae38c06064e14725e38df8f97f131e7ef562c227c7b34e94c184885ebfbfb86e11cfd732ef2002fda14c9524551aa6ca72204b12fe0f3bc25f69f5788c0db5a8f0c1ceaacf0718d9324355f580823497bbe2f3033d70ebd478588ab9c64965820dd668e86ea81e5364af111f5a1ccb0a356240e5c90fcfc381c21ef3c31dc78b4c995e0790600779768a4910fe58d1df64525462504f3beb1c9d83e3a2b095e5a525cf766db0dbd6d649267f581674c6cca92be26aa8cfc07f24967509c150494f662aba7e9e1616c59b0747c2498b4d99b85dc05380fcdeed5b379475ab426b5758d905b342049ea69806a029b1a494e7b0e297c03f301bb7a749c5ff6bccf7ff8ffb0878482f970d546e5e7e3d72523d10dd67fe5d1bb13f5a9e1001d11cc9db9f4b738cb2f521fc799f02018d4f863468aab94b8aa4c252361f44c35824beefc6e06136bf94b6152afe99d119a9dfab40e0550069a3994fb7ba6ddbc371c3da4fa1a33167164510888a356013b0f90e3cbff751f03912814b740e51a20a3cb82ab91c35c427063568df846a972017d5e97c2cad975ec7f05f0f643861e33d920a7a2b0e47bebed39ca13576ca63bf14a82820d8ed2dbb0901fc0f36c1e2cbc5eaf92a3b0a7a9f329409eb2cbb1bb24aae5f39de7515230ee0ebb58bb48954c77dbab1f01d4b93f70700f27ec0fe805845a1b41c29e44b49d63625da534cf096edab7dc85b933a3e7e3494ad5144ec6885a174d1b197797f45a3ea0dde1686d76f04cb82544fd08fb5a501f8a9cc56856c50cda7ab20694053b749a4629220cbdaa022f12dec2951bf6f6bff8f4854c6b34f712f029aba3dc29a375e6ea91958c68390321b319faadb32e824897b39b3086e0b269d060d23a3c6015115d9b876f00825db7dae7858b6f3018aaef348aa4b9a41c71ead9e336df9996c1327e49dd8b5b3888efa2e66eb2ca0830b1b231e2b247994610d7455232f4af5474c00a2c12cf07a7d5dd9f012b708da6cac0e95a95008eedfd4840c';

describe('User Endpoints', () => {

    describe('GET /duck', () => {

        it('should return a 200 and a duck along with it', async () => {

            const res = await requestWithSupertest.get('/duck');
    
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('svg'));

        });

    });

    describe('GET /duck/:id/', () => {

        it('should return a 200 and a duck along with it', async () => {

            const res = await requestWithSupertest.get('/duck/0000000000');
    
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('svg'));

        });

        it('should return a 400 when a bad id is sent (short)', async () => {

            const res = await requestWithSupertest.get('/duck/000000000');
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('svg'));

        });

        it('should return a 400 when a bad id is sent (long)', async () => {

            const res = await requestWithSupertest.get('/duck/00000000000');
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('svg'));

        });

        it('should return a 400 when a bad id is sent (cant parse)', async () => {

            const res = await requestWithSupertest.get('/duck/0z000@0000');
    
            expect(res.status).toEqual(400); 
            expect(res.type).toEqual(expect.stringContaining('svg'));

        });

    });

    describe('GET /duck/:id/:zoom', () => {

        it('should return a 200 and a duck along with it', async () => {

            const res = await requestWithSupertest.get('/duck/0000000000/20');
    
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('svg'));

        });

        it('should return a 400 when a bad id is sent (short)', async () => {

            const res = await requestWithSupertest.get('/duck/000000000/20');
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('svg'));

        });

        it('should return a 400 when a bad id is sent (long)', async () => {

            const res = await requestWithSupertest.get('/duck/00000000000/20');
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('svg'));

        });

        it('should return a 400 when a bad id is sent (cant parse)', async () => {

            const res = await requestWithSupertest.get('/duck/0z00000@00/20');
    
            expect(res.status).toEqual(400); 
            expect(res.type).toEqual(expect.stringContaining('svg'));

        });

    });

    describe('GET /jokes', () => {

        it ('should return a 200 and all the jokes', async () => {

            const res = await requestWithSupertest.get('/jokes');
            
            // Make Sure None of the Jokes are Funny
            var funny = false;
            expect(funny).toBe(false);

            expect(typeof res.body).toBe('object');
            expect(Array.isArray(res.body)).toBe(true);

            expect(res.status).toEqual(200); 
            expect(res.type).toEqual(expect.stringContaining('json'));

        });

    });

    describe('GET /jokes/random', () => {

        it ('should return a 200 and a joke', async () => {

            const res = await requestWithSupertest.get('/jokes/random');
            
            // Make Sure None of the Jokes are Funny
            var funny = false;
            expect(funny).toBe(false);

            expect(typeof res.text).toBe('string');

            expect(res.status).toEqual(200); 
            expect(res.type).toEqual(expect.stringContaining('html'));

        });

    });

    describe('GET /joke', () => {

        it ('should return a 200 and a joke', async () => {

            const res = await requestWithSupertest.get('/joke');
            
            // Make Sure None of the Jokes are Funny
            var funny = false;
            expect(funny).toBe(false);

            expect(typeof res.text).toBe('string');

            expect(res.status).toEqual(200); 
            expect(res.type).toEqual(expect.stringContaining('html'));

        });

    });

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

        it('should throw a 400 if bad password (no uppercase)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william-mcgonagle',
                email: 'testing@fairfieldprogramming.org',
                password: 'testing123!'
            });
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('html'));
        
        });

        it('should throw a 400 if bad password (no lowercase)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william-mcgonagle',
                email: 'testing@fairfieldprogramming.org',
                password: 'TESTING123!'
            });
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('html'));
        
        });

        it('should throw a 400 if bad password (no numbers)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william-mcgonagle',
                email: 'testing@fairfieldprogramming.org',
                password: 'Testing!'
            });
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('html'));
        
        });

        it('should throw a 400 if bad password (no symbols)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william-mcgonagle',
                email: 'testing@fairfieldprogramming.org',
                password: 'Testing123'
            });
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('html'));
         
        });

        it('should throw a 400 if bad password (short)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william-mcgonagle',
                email: 'testing@fairfieldprogramming.org',
                password: 'Te!'
            });
    
            expect(res.status).toEqual(400);
            expect(res.type).toEqual(expect.stringContaining('html'));
         
        });

        it('should throw a 400 if bad password (long)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william-mcgonagle',
                email: 'testing@fairfieldprogramming.org',
                password: 'Testing11111111111111111111111!'
            });
    
            expect(res.status).toEqual(400); 
            expect(res.type).toEqual(expect.stringContaining('html'));
         
        });

        it('should throw a 400 if bad email', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william-mcgonagle',
                email: 'testing@fairfieldprogramming',
                password: 'Testing123!'
            });
    
            expect(res.status).toEqual(400); 
            expect(res.type).toEqual(expect.stringContaining('html'));
         
        });

        it('should throw a 400 if bad username (spaces)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william mcgonagle',
                email: 'testing@fairfieldprogramming',
                password: 'Testing123!'
            });
    
            expect(res.status).toEqual(400); 
            expect(res.type).toEqual(expect.stringContaining('html'));
         
        });

        it('should throw a 400 if bad username (uppercase)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'William-McGonagle',
                email: 'testing@fairfieldprogramming',
                password: 'Testing123!'
            });
    
            expect(res.status).toEqual(400); 
            expect(res.type).toEqual(expect.stringContaining('html'));
         
        });

        it('should throw a 400 if bad username (numbers)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william-mcgonagle1',
                email: 'testing@fairfieldprogramming',
                password: 'Testing123!'
            });
    
            expect(res.status).toEqual(400); 
            expect(res.type).toEqual(expect.stringContaining('html'));
         
        });

        it('should throw a 400 if bad username (symbols)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william@mcgonagle',
                email: 'testing@fairfieldprogramming',
                password: 'Testing123!'
            });
    
            expect(res.status).toEqual(400); 
            expect(res.type).toEqual(expect.stringContaining('html'));
         
        });

        it('should throw a 400 if bad username (short)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'wil',
                email: 'testing@fairfieldprogramming',
                password: 'Testing123!'
            });
    
            expect(res.status).toEqual(400); 
            expect(res.type).toEqual(expect.stringContaining('html'));
         
        });

        it('should throw a 400 if bad username (long)', async () => {
            
            const res = await requestWithSupertest.post('/user/signup').send({
                username: 'william-mcgonagle-the-best-programmer-in-the-world',
                email: 'testing@fairfieldprogramming',
                password: 'Testing123!'
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

    describe('POST /user/login', () => {

        it('should throw a 200 if successful (username)', async () => {
            
            const res = await requestWithSupertest.post('/user/login').send({
                username: 'william-mcgonagle',
                password: 'Testing123!'
            });
    
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
        
        }); 

        it('should throw a 200 if successful (email)', async () => {
            
            const res = await requestWithSupertest.post('/user/login').send({
                email: 'testing@fairfieldprogramming.org',
                password: 'Testing123!'
            });
    
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
        
        });

        it('should throw a 404 if account not found (email)', async () => {
            
            const res = await requestWithSupertest.post('/user/login').send({
                email: 'testing@fairfieldprogramming.or',
                password: 'Testing123!' 
            });
    
            expect(res.status).toEqual(404);
            expect(res.type).toEqual(expect.stringContaining('html'));
        
        });

        it('should throw a 404 if account not found (username)', async () => {
            
            const res = await requestWithSupertest.post('/user/login').send({
                username: 'will-mcgonagle', 
                password: 'Testing123!' 
            });
    
            expect(res.status).toEqual(404);
            expect(res.type).toEqual(expect.stringContaining('html'));
        
        });

        it('should throw a 403 if incorrect password', async () => {
            
            const res = await requestWithSupertest.post('/user/login').send({
                username: 'william-mcgonagle',
                password: 'Testing123'
            });
    
            expect(res.status).toEqual(403);
            expect(res.type).toEqual(expect.stringContaining('html'));
        
        });

    })

    describe('GET /user', () => {

        it('should show all users', async () => {
        
            const res = await requestWithSupertest.get('/user/');

            expect(Array.isArray(res.body)).toEqual(true);
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
        
        });

    })

    describe('GET /user/:id', () => {

        it('should show a user', async () => {

            const res = await requestWithSupertest.get('/user/1');

            // Expect to be Object
            expect(typeof res.body).toEqual('object');
            expect(Array.isArray(res.body)).toEqual(false);

            // Expect Parameters to be Existant
            expect(res.body.username).toBeDefined();
            expect(res.body.email).toBeDefined();
            expect(res.body.createdAt).toBeDefined();
            expect(res.body.updatedAt).toBeDefined();
            expect(res.body.password).toBe(undefined);

            // Expect HTTP Data
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));

        });

    })

});
