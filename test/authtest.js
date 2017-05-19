/* jshint esversion: 6 */
//
// Unit test the auth api
// -----------------------------------------------------------------
    import Lab from 'lab';
    import Code from 'code';
    import app from '../';
    import conf from '../app/config';

    const { init } = app;
    const { manifest } = conf('/');
    const lab = exports.lab = Lab.script();
    const expect = Code.expect;
    const options = {
        relativeTo: __dirname
    };

    lab.experiment('Auth endpoint,', () => {
        //
        // test login user
        // -----------------------------------------------------------------
        lab.test('POST to login the user to the application', (done) => {
            const injoptions = {
                method: 'POST',
                url: '/api/v1/login/',
                payload: {
                    email: 'test@tests.com',
                    password: 'abcs'
                }
            };

            init(manifest, options, (err, Server) => {
                Server.inject(injoptions, (response) => {
                    const { result } = response;

                    // Assert that we are fetching the proper endpoint
                    expect(response.statusCode).to.not.be.equal(404);

                    // Assert that the endpoint results are valid
                    // OBSERVATION: this assertion will fail, cuz won't expose real usernames and passwords
                    expect(result).to.be.instanceof(Object);
                    expect(result.code).to.be.number().equal(1);
                    expect(result.message).to.be.string().and.not.to.be.empty();
                    expect(result.content).to.be.object();

                    done();
                });
            });
        });

        //
        // test login user
        // -----------------------------------------------------------------
        lab.test('POST to logout the user from the application', (done) => {
            const injoptions = {
                method: 'POST',
                url: '/api/v1/logout/'
            };

            init(manifest, options, (err, Server) => {
                Server.inject(injoptions, (response) => {
                    const { result } = response;

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
    });
