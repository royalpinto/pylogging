pylogging
===


Pythonic way of logging for JavaScript
------
- Implementation of python logging library [http://docs.python.org/2/library/logging.html][1] for JavaScript.
- Highly customizable (visit [examples][2]).
- Provides an interface for applications and other logging libraries.
- Handlers to send log records (created by loggers) to the appropriate destination.
- Filters to determine which log records to output.
- Formatters to specify the layout of log records in the final output.


Installation
-------

using `npm`:

``` bash
npm install pylogging
```

Examples
------

With default logger (the root logger)

```js
var logging = require('pylogging');

logging.info('Info will be ignored as severity is set to logging.WARN.');
// <Prints nothing.>

logging.warn('I am warning.');
// WARN:root:I am warning.

logging.error('I am error: %s.', "Failed to get the data");
// ERROR:root:I am error: Failed to get the data.
```

With a module named logger instance with an handler.
```js
var logging = require('./lib/main.js');

var logger = logging.getLogger('pylogging.examples');
logger.setLevel(logging.DEBUG); //Lets log everything.

// Create a console handler to write to the stdout/stderr.
var handler = new logging.ConsoleHandler();
handler.setLevel(logging.DEBUG);
handler.setFormatter(new logging.Formatter("%(levelname)s: %(msg)s\n"));

logger.addHandler(handler);

logger.info('Info will not be ignored as severity is set to logging.DEBUG.');
// Info will not be ignored as severity is set to logging.DEBUG.

logger.warn('I am warning.');
// WARN: I am warning.

logger.error('I am error: %s.', "Failed to get the data");
// ERROR: I am error: Failed to get the data.
```
For more examples and advance usage visit [examples][2]

[1]: http://docs.python.org/2/library/logging.html
[2]: https://github.com/royalpinto/pylogging/tree/master/examples
