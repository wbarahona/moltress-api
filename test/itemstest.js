/* jshint esversion: 6 */
//
// Unit test the items api
// -----------------------------------------------------------------
    import Lab from 'lab';
    import Code from 'code';
    import server from '../';

    const lab = exports.lab = Lab.script();
    const expect = Code.expect;

    lab.experiment('Items endpoint,', () => {
        //
        // test items response
        // -----------------------------------------------------------------
            lab.test('GET all items', (done) => {
                const options = {
                    method: 'GET',
                    url: '/api/v1/items/'
                };

                server.inject(options, (response) => {
                    const result = response.result;

                    // Assert that we are fetching the proper endpoint
                    expect(response.statusCode).to.not.be.equal(404);

                    // Assert that the endpoint results are valid
                    expect(result).to.be.instanceof(Object);
                    expect(result.code).to.be.number().equal(1);
                    expect(result.message).to.be.string().and.not.to.be.empty();
                    expect(result.content).to.be.array();

                    done();
                });
            });

        //
        // test item response by name
        // -----------------------------------------------------------------
            lab.test('GET item by name', (done) => {
                const options = {
                    method: 'GET',
                    url: '/api/v1/item/12333'
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
