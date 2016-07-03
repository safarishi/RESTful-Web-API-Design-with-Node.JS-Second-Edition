var sinon = require('sinon');

exports.test_handle_GET_request = (test) => {

	var response = {writeHead: () => {}, end: () => {}};
	var responseMock = sinon.mock(response);

    responseMock.expects('writeHead').once().withArgs(200, {
        'Content-Type' : 'text/plain'
    });
    responseMock.expects('end').once().withArgs('Get action was requested');

    var request = {};
    var requestMock = sinon.mock(request);
    requestMock.method = 'GET';

    var http_module = require('./modules/http-module');

    http_module.handle_request(requestMock, response);

    responseMock.verify();
    test.done();
};


exports.testDemo = (test) => {
    var api = {
        methodY: (arg) => {
            return arg;
        }
    }

    var mock = sinon.mock(api);

    mock.expects('methodY').once().withArgs('xyz').returns('xyz');

    test.equals(api.methodY('xyz'), 'xyz');

    test.done();
}
