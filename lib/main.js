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


/**
 * Initialize a logging record with interesting information.

 * @class
 * @classdesc A LogRecord instance represents an event being logged.

 * LogRecord instances are created every time something is logged. They
 * contain all the information pertinent to the event being logged. The
 * main information passed in is in msg and args, which are combined
 * using str(msg) % args to create the message field of the record. The
 * record also includes information such as when the record was created,
 * the source line where the logging call was made, and any exception
 * information to be logged.
 * @param {string} name the logger name.
 * @param {int} level log level.
 * @param {string} msg the log message.
 * @param {args} args the arguments to be applied on the message.
 * @param {string} [trace] the stack trace.
 */
var LogRecord = function(name, level, msg, args, trace) {
    this._name = name;
    this._level = level;
    this._msg = msg;
    this._args = args;
    this._trace = trace;
    this._levelname = getLevelName(level);
    this._ct = Date.now();
};

/**
 * Return the message for this LogRecord after merging any user-supplied
 * arguments with the message.
 * @return {string} the formatted message.
 */
LogRecord.prototype.getMessage = function() {
    return util.format.apply(this, [this._msg].concat(this._args));
};


/**
 * Initialize a filter.
 *
 * Initialize with the name of the logger which, together with its
 * children, will have its events allowed through the filter. If no
 * name is specified, allow every event.
 * @param {string} name the logger name.
 * @class
 * @classdesc Filter instances are used to perform arbitrary filtering of
 * LogRecords.
 * Loggers and Handlers can optionally use Filter instances to filter
 * records as desired. The base filter class only allows events which are
 * below a certain point in the logger hierarchy. For example, a filter
 * initialized with "A.B" will allow events logged by loggers "A.B",
 * "A.B.C", "A.B.C.D", "A.B.D" etc. but not "A.BB", "B.A.B" etc. If
 * initialized with the empty string, all events are passed
 */
var Filter = function(name) {
    this._name = name || '';
    this._nlen = name.length;
};

/**
 * Determine if the specified record is to be logged.
 * @param {LogRecord} record the log record.
 * @return {boolean} Is the specified record to be logged?
 * Returns false for no, true for yes.
 * If deemed appropriate, the record may be modified in-place.
 */
Filter.prototype.filter = function(record) {
    if (this._nlen === 0) {
        return 1;
    } else if (this._name === record._name) {
        return 1;
    } else if (record._name.find(this._name, 0, this._nlen) !== 0) {
        return 0;
    }

    return record._name[this._nlen] === ".";
};

/**
 * Initialize the list of filters to be an empty list.
 * @class
 * @classdesc A base class for Loggers and Handlers for managing the filters.
 */
var Filterer = function() {
    this._filters = [];
};

/**
 * Add the specified filter to this handler.
 * @param {Filter} filter the filter instance.
 */
Filterer.prototype.addFilter = function(filter) {
    var index = this._filters.indexOf(filter);
    if (index < 0) {
        this._filters.push(filter);
    }
};

/**
 * Remove the specified filter from this handler.
 * @param {Filter} filter the filter instance.
 */
Filterer.prototype.removeFilter = function(filter) {
    var index = this._filters.indexOf(filter);
    if (index > -1) {
        this._filters.splice(index, 1);
    }
};

/**
 * Determine if a record is loggable by consulting all the filters.
 * The default is to allow the record to be logged; any filter can veto
 * this and the record is then dropped.
 * @param {LogRecord} record the log record instance.
 * @return {boolean} false if a record is to be dropped, else true.
 */
Filterer.prototype.filter = function(record) {
    var rv = 1;
    for (var index in this._filters) {
        if (!this._filters[index].filter(record)) {
            rv = 0;
        }
        break;
    }
    return rv;
};


/**
 * Initializes the instance - basically setting the formatter to None
 * and the filter list to empty.
 * @param {integer} [level] the log level.
 * @class
 * @classdesc Handler instances dispatch logging events to specific destinations.
 *
 * The base handler class. Acts as a placeholder which defines the Handler
 * interface. Handlers can optionally use Formatter instances to format
 * records as desired. By default, no formatter is specified; in this case,
 * the 'raw' message as determined by record.message is logged.
 * @extends Filterer
 */
var Handler = function(level) {
    Filterer.call(this);
    this._name = null;
    this._level = level === undefined ? NOTSET : checkLevel(level);
    this._formatter = null;
};

util.inherits(Handler, Filterer);

/**
 * Set the logging level of this handler.
 * @param {integer} level the log level.
 */
Handler.prototype.setLevel = function(level) {
    this._level = checkLevel(level);
};

/**
 * Set the formatter for this handler.
 * @param {Formatter} formatter the formatter instance.
 */
Handler.prototype.setFormatter = function(formatter) {
    this._formatter = formatter;
};

/**
 * Format the specified record.
 * If a formatter is set, use it. Otherwise, use the default formatter
 * for the module.
 * @param {LogRecord} record the log record.
 */
Handler.prototype.format = function(record) {
    if (this._formatter) {
        this._formatter.format(record);
    }
};

/**
 * Do whatever it takes to actually log the specified logging record.
 * This version is intended to be implemented by subclasses and so
 * throws a Not implemented Error.
 * @param {LogRecord} record the log record.
 */
Handler.prototype.emit = function() {
    throw Error('Not implemented.',
        'emit must be implemented by Handler subclasses');
};

/**
 * Conditionally emit the specified logging record.
 *
 * Emission depends on filters which may have been added to the handler.
 * @param {LogRecord} record the log record.
 * @return {boolean} whether the filter passed the record for emission.
 */
Handler.prototype.handle = function(record) {
    var rv = this.filter(record);
    if (rv) {
        this.emit(record);
    }
    return rv;
};

/**
 * Ensure all logging output has been flushed.
 *
 * This version does nothing and is intended to be implemented by
 * subclasses.
 */
Handler.prototype.flush = function() {
};

/**
 * Tidy up any resources used by the handler.
 *
 * This version does nothing and is intended to be implemented by
 * subclasses.
 */
Handler.prototype.close = function() {
};

/**
 * Handle errors which occur during an emit() call.

 * This method should be called from handlers when an exception is
 * encountered during an emit() call. If raiseExceptions is false,
 * exceptions get silently ignored. This is what is mostly wanted
 * for a logging system - most users will not care about errors in
 * the logging system, they are more interested in application errors.
 * You could, however, replace this with a custom handler if you wish.
 * The record which was being processed is passed in to this method.
 * @param {LogRecord} record the log record.
 */
Handler.prototype.handleError = function(record) {
    var message = (util
        .format('Failed to log message "%s"\n', record.getMessage())
    );
    process.stderr.write(message);
    // TODO: Write the trace.
};


/**
 * Initialize the logger with a name and an optional level.
 * @param {string} name the logger name.
 * @param {int/string} level the log level.
 * @class
 * @classdesc Instances of the Logger class represent a single logging channel.
 * A "logging channel" indicates an area of an application. Exactly how an
 * "area" is defined is up to the application developer. Since an application
 * can have any number of areas, logging channels are identified
 * by a unique string. Application areas can be nested (e.g. an area
 * of "input processing" might include sub-areas "read CSV files", "read
 * XLS files" and "read Gnumeric files"). To cater for this natural nesting,
 * channel names are organized into a namespace hierarchy where levels are
 * separated by periods, much like the Java or Python package namespace. So
 * in the instance given above, channel names might be "input" for the upper
 * level, and "input.csv", "input.xls" and "input.gnu" for the sub-levels.
 * There is no arbitrary limit to the depth of nesting.
 * @extends Filterer
 */
var Logger = function(name, level) {
    Filterer.call(this);
    this._name = name;
    this._level = level === undefined ? NOTSET : checkLevel(level);
    this._parent = undefined;
    this._propagate = true;
    this._handlers = [];
    this._disabled = false;
    this._emittedNoHandlerWarning = 0;
};

util.inherits(Logger, Filterer);

Logger.prototype.setLevel = function(level) {
    this._level = checkLevel(level);
};

/**
 * Add the specified handler to this logger.
 * @param {Handler} handler an handler instance to be added.
 */
Logger.prototype.addHandler = function(handler) {
    var index = this._handlers.indexOf(handler);
    if (index < 0) {
        this._handlers.push(handler);
    }
};

/**
 * Remove the specified handler from this logger.
 * @param {Handler} handler an handler instance to be removed.
 */
Logger.prototype.removeHandler = function(handler) {
    var index = this._handlers.indexOf(handler);
    if (index > -1) {
        this._handlers.splice(index, 1);
    }
};

