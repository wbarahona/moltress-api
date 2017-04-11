/*jshint esversion: 6 */
//
// Unit test the auth api
// -----------------------------------------------------------------
    import Lab from 'lab';
    import Code from 'code';
    import server from '../';
    import AuthService from '../app/api/model/services/auth';

    const lab = exports.lab = Lab.script();
    const expect = Code.expect;

    lab.experiment('Auth endpoint,', () => {

        lab.before(() => {
            const promise = AuthService.createtoken('92222fd1-c3a1-4d5d-bb1c-f029b339138e');

            return promise;
        });

        lab.test('create the token service', () => {

            return AuthService.createtoken('92222fd1-c3a1-4d5d-bb1c-f029b339138e')
                    .then((result) => {

                        // Assert that the endpoint results are valid
                        expect(result).to.be.instanceof(Object);
                        expect(result.code).to.be.number().equal(1);
                        expect(result.message).to.be.string().and.not.to.be.empty();
                        expect(result.content).to.be.object();
                    });
        });
        //
        // test check token response
        // -----------------------------------------------------------------
            lab.test('POST to check my token', (done) => {
                const options = {
                    method: 'POST',
                    url: '/api/v1/checktoken/',
                    payload: {
                        token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI5MjIyMmZkMS1jM2ExLTRkNWQtYmIxYy1mMDI5YjMzOTEzOGUiLCJpYXQiOjE0ODk5Njc5MzMsImV4cCI6MTQ4OTk3MTUzMywiYXVkIjoiaHR0cHM6Ly9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1mNjk1ckBwcm9qZWN0LTgzNTcyNjcyOTQxMzIyNTU0NzEuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay1mNjk1ckBwcm9qZWN0LTgzNTcyNjcyOTQxMzIyNTU0NzEuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20ifQ.YJpcH0ea1D6ZigyeuZwlB_-ib5k5ozFiwqdoNaPuVCGjNcuF2W2E5kXVk4QLTSKU81Lr5s5OcPwabDHXFlR3aSQ9O36A0Xec0dO2fq3aMej3JQHDQ9cZXMGC0zG7vqP0-wiTurivq1iJCmp2QP2LAnCYcv52CJ9i56lbOtetEwJDlCbcjQ7_6gXtZ5eSciWwqhNAhs8qLVlX6bb4e6zeA7TxWe7QTlD8mYSCRJxvZR37OhBYJl9--3PP0m0Fdndc0A5_tK-f0isBJr97m5aEFuftsUw_EL-FxP-C_9afDif8n2HvM-ErEQi3FZv1V3D7nrbs4IV_BmloBDJxKfK1yA'
                    }
                };

                server.inject(options, (response) => {
                    const result = response.result;
                    // Assert that we are fetching the proper endpoint
                    expect(response.statusCode).to.not.be.equal(404);

                    // Assert that the endpoint results are valid
                    expect(result).to.be.instanceof(Object);
                    expect(result.code).to.be.number().equal(1);
                    expect(result.message).to.be.string().and.not.to.be.empty();
                    expect(result.content).to.be.object();

                    done();
                });
            });
        //
        // test create token response
        // -----------------------------------------------------------------
            lab.test('POST to create a custom token', (done) => {
                const options = {
                    method: 'POST',
                    url: '/api/v1/createtoken/92222fd1-c3a1-4d5d-bb1c-f029b339138e'
                };

                server.inject(options, (response) => {
                    const result = response.result;
                    // Assert that we are fetching the proper endpoint
                    expect(response.statusCode).to.not.be.equal(404);

                    // Assert that the endpoint results are valid
                    expect(result).to.be.instanceof(Object);
                    expect(result.code).to.be.number().equal(1);
                    expect(result.message).to.be.string().and.not.to.be.empty();
                    expect(result.content).to.be.object();

                    done();
                });
            });
    });
