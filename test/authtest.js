/* jshint esversion: 6 */
//
// Unit test the auth api
// -----------------------------------------------------------------
    import Lab from 'lab';
    import Code from 'code';
    import server from '../';
    // import AuthService from '../app/api/model/services/auth';
    // import UserService from '../app/api/model/services/user';

    const lab = exports.lab = Lab.script();
    const expect = Code.expect;

    lab.experiment('Auth endpoint,', () => {

        // lab.before(() => {
        //     const promise = UserService.createtoken('92222fd1-c3a1-4d5d-bb1c-f029b339138e');
        //
        //     return promise;
        // });
        //
        // lab.test('returns true when 1 + 1 equals 2', () => {
        //
        //     return AuthService.createtoken('92222fd1-c3a1-4d5d-bb1c-f029b339138e')
        //             .then((result) => {
        //
        //                 // Assert that the endpoint results are valid
        //                 expect(result).to.be.instanceof(Object);
        //                 expect(result.code).to.be.number().equal(1);
        //                 expect(result.message).to.be.string().and.not.to.be.empty();
        //                 expect(result.content).to.be.object();
        //             });
        // });

        //
        // test login user
        // -----------------------------------------------------------------
        lab.test('POST to login the user to the application', (done) => {
            const options = {
                method: 'POST',
                url: '/api/v1/login/',
                payload: {
                    email: 'test@tests.com',
                    password: 'abcs'
                }
            };

            server.inject(options, (response) => {
                const result = response.result;

                // Assert that we are fetching the proper endpoint
                expect(response.statusCode).to.not.be.equal(404);

                // Assert that the endpoint results are valid
                // OBSERVATION: this assertion will fail, for reasons
                expect(result).to.be.instanceof(Object);
                expect(result.code).to.be.number().equal(1);
                expect(result.message).to.be.string().and.not.to.be.empty();
                expect(result.content).to.be.object();

                done();
            });
        });

        //
        // test login user
        // -----------------------------------------------------------------
        lab.test('POST to logout the user from the application', (done) => {
            const options = {
                method: 'POST',
                url: '/api/v1/logout/'
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
