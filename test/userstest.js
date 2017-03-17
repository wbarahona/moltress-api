//
// Unit test the users api
// -----------------------------------------------------------------
    import Lab from 'lab';
    import Code from 'code';
    import server from '../';

    const lab = exports.lab = Lab.script();
    const expect = Code.expect;

    lab.experiment('Users endpoint,', function() {
        //
        // test user response by id
        // -----------------------------------------------------------------
            lab.test('GET user by id', function(done) {
                const options = {
                    method: 'GET',
                    url: '/api/v1/user/12333'
                };

                server.inject(options, function(response) {
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
