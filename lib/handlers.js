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

'use strict';

var util = require('util');
var fs = require('fs');
var logging = require('./main.js');


/**
 * Initialize a file handler.
 * @class
 * @classdesc A handler class which writes formatted logging records to disk
 * files using `fs.appendFile`.
 * @param {string|buffer|number} filename filename or file descriptor
 * @param {object|string} options options to be used with `fs.appendFile`.
 */
var FileHandler = function(filename, options) {
    logging.Handler.call(this);
    this._filename = filename;
    this._options = options || {};
};

util.inherits(FileHandler, logging.Handler);

/**
 * Emit log record to the disk file.
 * @param {LogRecord} record the log record to be emitted.
 */
FileHandler.prototype.emit = function(record) {
    var message = this.format(record);
    try {
        console.log(this._options);
        fs.appendFile(this._filename, message, this._options);
    } catch (err) {
        this.handleError(err, record);
    }
};


module.exports.FileHandler = FileHandler;