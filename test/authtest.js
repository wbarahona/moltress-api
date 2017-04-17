/* jshint esversion: 6 */
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

        //
        // test login user
        // -----------------------------------------------------------------
            lab.test('POST to login the user to the application', (done) => {
                const options = {
                    method: 'POST',
                    url: '/api/v1/login/',
                    payload: {
                        email: 'email@metalocalypse.us',
                        password: 'password'
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
        // test login user
        // -----------------------------------------------------------------
            lab.test('GET to logout the user from the application', (done) => {
                const options = {
                    method: 'GET',
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
