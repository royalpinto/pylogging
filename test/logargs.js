// Copyright 2016 Lohith Royal Pinto <royalpinto@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE


var util = require('util');
var logging = require('../lib/main.js');

exports.withoutArgs = function(test) {
    var TestHandler = function() {
        logging.Handler.call(this);
    };

    util.inherits(TestHandler, logging.Handler);

    TestHandler.prototype.emit = function(record) {
        test.ok(record.excInfo === undefined);
        test.strictEqual(record.getMessage(), 'Without args...');
    };

    var handler = new TestHandler();
    handler.setLevel(logging.INFO);

    var logger = logging.getLogger('pylogging.test.withoutArgs');
    logger.setLevel(logging.INFO);
    logger.addHandler(handler);

    logger.warn('Without args...');

    test.done();
};


exports.withArgs = function(test) {
    var TestHandler = function() {
        logging.Handler.call(this);
    };

    util.inherits(TestHandler, logging.Handler);

    TestHandler.prototype.emit = function(record) {
        test.ok(record.excInfo === undefined);
        test.strictEqual(record.getMessage(),
            util.format('With args %s %s %s...', 'foo'));
    };

    var handler = new TestHandler();
    handler.setLevel(logging.INFO);

    var logger = logging.getLogger('pylogging.test.withArgs');
    logger.setLevel(logging.INFO);
    logger.addHandler(handler);

    logger.warn('With args %s %s %s...', 'foo');

    test.done();
};


exports.withExtraArgs = function(test) {
    var TestHandler = function() {
        logging.Handler.call(this);
    };

    util.inherits(TestHandler, logging.Handler);

    TestHandler.prototype.emit = function(record) {
        test.ok(record.excInfo === undefined);
        test.strictEqual(record.getMessage(),
            util.format('With args %s %s %s...', 'foo'));
        test.ok(record.statusCode);
        test.strictEqual(record.statusCode, 200);
    };

    var handler = new TestHandler();
    handler.setLevel(logging.INFO);

    var logger = logging.getLogger('pylogging.test.withExtraArgs');
    logger.setLevel(logging.INFO);
    logger.addHandler(handler);

    logger.warn('With args %s %s %s...', 'foo', {extra: {statusCode: 200}});

    test.done();
};
