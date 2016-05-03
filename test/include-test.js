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


exports.includeTest = function(test) {
    test.doesNotThrow(
        function() {
            require('../lib/main.js');
        },
        Error,
        'Failed to import pylogging.'
    );

    test.done();
};


exports.checkLibFields = function(test) {
    var logging = require('../lib/main.js');
    test.ok(logging.getLogger);

    test.ok(logging.setLoggerClass);
    test.ok(logging.setLogRecordClass);

    test.ok(logging.Logger);
    test.ok(logging.Handler);
    test.ok(logging.ConsoleHandler);
    test.ok(logging.Filter);
    test.ok(logging.Formatter);

    test.ok(logging.CRITICAL);
    test.ok(logging.ERROR);
    test.ok(logging.EXCEPTION);
    test.ok(logging.WARNING);
    test.ok(logging.WARN);
    test.ok(logging.INFO);
    test.ok(logging.DEBUG);
    test.ok(logging.NOTSET !== undefined);

    test.ok(logging instanceof logging.Logger);
    test.ok(logging.getLogger instanceof Function);

    test.ok(logging.setLoggerClass instanceof Function);
    test.ok(logging.setLogRecordClass instanceof Function);

    test.ok(logging.Logger instanceof Function);
    test.ok(logging.Handler instanceof Function);
    test.ok(logging.ConsoleHandler instanceof Function);
    test.ok(logging.Filter instanceof Function);
    test.ok(logging.Formatter instanceof Function);

    test.ok(logging.CRITICAL === 50);
    test.ok(logging.ERROR === 40);
    test.ok(logging.EXCEPTION === 40);
    test.ok(logging.WARNING === 30);
    test.ok(logging.WARN === 30);
    test.ok(logging.INFO === 20);
    test.ok(logging.DEBUG === 10);
    test.ok(logging.NOTSET === 0);

    test.done();
};
