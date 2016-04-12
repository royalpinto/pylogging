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

var CRITICAL = 50;
var FATAL = CRITICAL;
var ERROR = 40;
var WARNING = 30;
var WARN = WARNING;
var INFO = 20;
var DEBUG = 10;
var NOTSET = 0;

var logLevels = {
    50: CRITICAL,
    40: ERROR,
    30: WARNING,
    20: INFO,
    10: DEBUG,
    0: NOTSET,
    CRITICAL: CRITICAL,
    ERROR: ERROR,
    WARN: WARNING,
    WARNING: WARN,
    INFO: INFO,
    DEBUG: DEBUG,
    NOTSET: NOTSET,
    FATAL: FATAL,
};

var logLevelNames = {
    50: 'CRITICAL',
    40: 'ERROR',
    30: 'WARN',
    20: 'INFO',
    10: 'DEBUG',
    0: 'NOTSET',
};

var checkLevel = function(level) {
    var loglevel = logLevels[level];
    if (loglevel === undefined) {
        throw new TypeError("Invalid Level is not a valid integer or string");
    }
    return loglevel;
};

var getLevelName = function(level) {
    return logLevelNames[level];
};

