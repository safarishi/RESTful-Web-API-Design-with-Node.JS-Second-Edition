'use strict';

const math = require('./modules/math');

exports.testAdd = (test) => {
    test.equal(math.add(1, 1), 2);
    test.done();
};
exports.testSubtract = (test) => {
	test.equals(math.subtract(4,2), 2);
	test.done();
};
