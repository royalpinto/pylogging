/**
 * This demonstration uses `colors` lib,
 * please consider installing it to run this example.
 *
 * This example demonstrates:
 * - How to create/get a logger using `getLogger`
 * - How to create a new Handler to write to the stdout/stderr.
 * - How to create a custom formatter (with colors) based on the log levels.
 */

var util = require('util');
var colors = require('colors/safe');

var logging = require('../lib/main.js');

// Set an appropriate color function for each log level.
var theme = {};
theme[logging.DEBUG] = colors.blue;
theme[logging.INFO] = colors.blue;
theme[logging.WARN] = colors.yellow;
theme[logging.ERROR] = colors.red;
theme[logging.CRITICAL] = colors.red;


// Create a subclass from logging.Formatter.
var ColoredFormatter = function(fmt, datefmt) {
    logging.Formatter.call(this, fmt, datefmt);
};

util.inherits(ColoredFormatter, logging.Formatter);

// Override formatField, call base class formatField
// and then is if field is message, colorify the value.
ColoredFormatter.prototype.formatField = function(record, name) {
    var rv = logging.Formatter.prototype.formatField.call(this, record, name);
    if (name === 'message') {
        var colorify = theme[record.level];
        rv = colorify(rv);
    }
    return rv;
};


// Create a new ConsoleHandler to write to the stdout/stderr.
var handler = new logging.ConsoleHandler();
// Customize log format and date format.
var fmt = '%(asctime)s,%(levelname)s,%(name)s,%(message)s\n';
handler.setFormatter(new ColoredFormatter(fmt, "DD-MMM-YYYY"));
handler.setLevel(logging.INFO);


// Get the logger instance.
var logger = logging.getLogger('pylogging.examples');
logger.setLevel(logging.INFO);
// Add handler. more handlers can be added here
// to write to various destinations.
logger.addHandler(handler);


// Logger is now ready to use..
logger.info('I am information with %s color :)', 'blue');
logger.warn('I am warning with yellow colour :)');
logger.error('I am error with red colour :)');
logger.exception('I am exception with red colour :)');
