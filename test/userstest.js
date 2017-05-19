/* jshint esversion: 6 */
//
// Unit test the users api
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

    lab.experiment('Users endpoint,', () => {
        //
        // test user response by id
        // -----------------------------------------------------------------
        lab.test('GET user by id', (done) => {
            const injoptions = {
                method: 'GET',
                url: '/api/v1/user/92222fd1-c3a1-4d5d-bb1c-f029b339138e',
                credentials: {
                    scope: 'user'
                }
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

        //
        // test user response to create
        // ----------------------------------------------------------------
        lab.test('POST new user', (done) => {
            const injoptions = {
                method: 'POST',
                url: '/api/v1/user/',
                payload: {
                    active: false,
                    age: 24,
                    code: '1324567890ABCDEF',
                    fname: 'fname',
                    lname: 'lname',
                    dob: '1489881121232',
                    email: 'email@metalocalypse.us',
                    password: 'password',
                    scope: 'scope',
                    uid: '1324567890ABCDEF'
                },
                credentials: {
                    scope: 'user'
                }
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
