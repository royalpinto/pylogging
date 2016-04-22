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

var manager;
var LoggerClass;

var CRITICAL = 50;
var FATAL = CRITICAL;
var ERROR = 40;
var WARNING = 30;
var WARN = WARNING;
var INFO = 20;
var DEBUG = 10;
var NOTSET = 0;

var raiseExceptions = true;

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

/**
 * Get the effective level for this logger.
 * Loop through this logger and its parents in the logger hierarchy,
 * looking for a non-zero logging level. Return the first one found.
 * @return {int} first found level in the lookup.
 */
Logger.prototype.getEffectiveLevel = function() {
    var logger = this;
    while (logger) {
        if (logger.level) {
            return logger.level;
        }
        logger = logger._parent;
    }
    return NOTSET;
};

/**
 * Is this logger enabled for level 'level'?
 * @param {int} level the log level
 * @return {boolean} true if enabled for gievn level otherwise false.
 */
Logger.prototype.isEnabledFor = function(level) {
    if (manager.disable >= level) {
        return 0;
    }
    return level >= this.getEffectiveLevel();
};

/**
 * Pass a record to all relevant handlers.

 * Loop through all handlers for this logger and its parents in the
 * logger hierarchy. If no handler was found, output a one-off error
 * message to sys.stderr. Stop searching up the hierarchy whenever a
 * logger with the "propagate" attribute set to zero is found - that
 * will be the last logger whose handlers are called.
 * @param {LogRecord} record the record to be logged.
 * @private
 */
Logger.prototype.callHandlers = function(record) {
    var logger = this;
    var found = 0;

    while (logger) {
        for (var index in logger._handlers) {
            if (logger._handlers.hasOwnProperty(index)) {
                var handler = logger._handlers[index];
                found += 1;
                if (record._level >= handler._level) {
                    handler.handle(record);
                }
            }
        }
        if (logger._propagate === false) {
            logger = null; // break out
        } else {
            logger = logger._parent;
        }
    }

    if (found === 0 && raiseExceptions && !this._emittedNoHandlerWarning) {
        var message = (util
            .format('No handlers could be found for logger "%s"\n', this._name)
        );
        process.stderr.write(message);
        this._emittedNoHandlerWarning = 1;
    }
};

/**
 * Call the handlers for the specified record.
 * @param {LogRecord} record the log record to handle
 */
Logger.prototype.handle = function(record) {
    if (!this._disabled && this.filter(record)) {
        this.callHandlers(record);
    }
};

/**
 * Low-level logging routine which creates a LogRecord and then calls
 * all the handlers of this logger to handle the record.
 * @param {int} level log level.
 * @param {string} msg the log message.
 * @param {args} args the arguments to be applied on the message.
 * @private
 */
Logger.prototype._log = function(level, msg, args) {
    var err = new Error();
    err.name = 'Trace';
    err.message = util.format.apply(this, arguments);
    Error.captureStackTrace(err);

    var trace = err.stack.split('\n').slice(3).join('\n');

    var record = new LogRecord(this._name, level, msg, args, trace);
    this.handle(record);
};

/**
 * Log 'msg % args' with severity 'DEBUG'.
 * @param {string} msg the log message.
 */
Logger.prototype.debug = function(msg) {
    if (this.isEnabledFor(DEBUG)) {
        var args = Array.prototype.slice.call(arguments, 1);
        this._log(DEBUG, msg, args);
    }
};

/**
 * Log 'msg % args' with severity 'INFO'.
 * @param {string} msg the log message.
 */
Logger.prototype.info = function(msg) {
    if (this.isEnabledFor(INFO)) {
        var args = Array.prototype.slice.call(arguments, 1);
        this._log(INFO, msg, args);
    }
};

/**
 * Log 'msg % args' with severity 'WARN'.
 * @param {string} msg the log message.
 */
Logger.prototype.warn = function(msg) {
    if (this.isEnabledFor(WARN)) {
        var args = Array.prototype.slice.call(arguments, 1);
        this._log(WARN, msg, args);
    }
};

Logger.prototype.warning = Logger.prototype.warn;

/**
 * Log 'msg % args' with severity 'ERROR'.
 * @param {string} msg the log message.
 */
Logger.prototype.error = function(msg) {
    if (this.isEnabledFor(ERROR)) {
        var args = Array.prototype.slice.call(arguments, 1);
        this._log(ERROR, msg, args);
    }
};

/**
 * Convenience method for logging an ERROR with exception information.
 * @param {string} msg the log message.
 */
Logger.prototype.exception = function(msg) {
    if (this.isEnabledFor(ERROR)) {
        var args = Array.prototype.slice.call(arguments, 1);
        // TODO: Show with trace.
        this._log(ERROR, msg, args);
    }
};

/**
 * Log 'msg % args' with severity 'CRITICAL'.
 * @param {string} msg the log message.
 */
Logger.prototype.critical = function(msg) {
    if (this.isEnabledFor(CRITICAL)) {
        var args = Array.prototype.slice.call(arguments, 1);
        this._log(CRITICAL, msg, args);
    }
};


/**
 * Initialize with the specified logger being a child of this placeholder.
 * @param {string} name name of the logger placeholder.
 * @class
 * @private
 * @classdesc PlaceHolder instances are used in the Manager logger hierarchy to take
 * the place of nodes for which no loggers have been defined. This class is
 * intended for internal use only and not as part of the public API.
 */
var PlaceHolder = function(name) {
    this._name = name;
    this._parent = undefined;
    this._children = {};
};


manager = (function() {
    var Manager = function() {
        this._loggers = {};
        this._disable = NOTSET;
    };

    /**
     * Disable all logging calls of severity 'level' and below.
     * @param {int} level the log level
     */
    Manager.prototype.disable = function(level) {
        this._disable = checkLevel(level);
    };

    Manager.prototype.getLogger = function(name) {
        var logger = this._loggers[name];
        if (logger) {
            if (logger instanceof PlaceHolder) {
                var placeholder = logger;
                logger = this._loggers[name] = new LoggerClass(name);
                logger._parent = placeholder._parent;
                this.fixupChildren(logger, placeholder);
            }
        } else {
            logger = this._loggers[name] = new LoggerClass(name);
            this.fixupParents(logger);
        }

        return logger;
    };

    Manager.prototype.fixupParents = function(logger) {
        do {
            var splits = logger._name.split('.');
            var parentname = splits.slice(0, splits.length - 1).join('.');
            if (parentname) {
                var parent = this._loggers[parentname];
                if (parent === undefined) {
                    parent = new PlaceHolder(parentname);
                    this._loggers[parentname] = parent;
                }
                if (parent instanceof PlaceHolder) {
                    parent._children[logger._name] = logger;
                }
                logger._parent = parent;
            }
            logger = logger._parent;
        } while (logger !== undefined);
    };

    Manager.prototype.fixupChildren = function(logger, placeholder) {
        for (var key in placeholder._children) {
            if (placeholder._children.hasOwnProperty(key)) {
                var child = placeholder._children[key];
                child._parent = logger;
            }
        }
    };

    return new Manager();
})();


LoggerClass = Logger;


var getLogger = function(name) {
    return manager.getLogger(name);
};


/**
 * Set the logger class inherited from Logger.
 * This is usefull incase developer wants to use a custom logger class.
 * However this custom class should be inherited from Logger class.
 * @param {LoggerClass} klass the the logger class to be used.
 */
var setLoggerClass = function(klass) {
    LoggerClass = klass;
};

