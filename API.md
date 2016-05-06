## Classes

<dl>
<dt><a href="#LogRecord">LogRecord</a></dt>
<dd><p>A LogRecord instance represents an event being logged.
LogRecord instances are created every time something is logged. They
contain all the information pertinent to the event being logged. The
main information passed in is in msg and args, which are combined
using <code>util.format</code> to create the message field of the record. The
record also includes information such as when the record was created,
the stack trace where logging call was made, and any exception
information to be logged.</p>
</dd>
<dt><a href="#Filter">Filter</a></dt>
<dd><p>Filter instances are used to perform arbitrary filtering of
LogRecords.
Loggers and Handlers can optionally use Filter instances to filter
records as desired. The base filter class only allows events which are
below a certain point in the logger hierarchy. For example, a filter
initialized with &quot;A.B&quot; will allow events logged by loggers &quot;A.B&quot;,
&quot;A.B.C&quot;, &quot;A.B.C.D&quot;, &quot;A.B.D&quot; etc. but not &quot;A.BB&quot;, &quot;B.A.B&quot; etc. If
initialized with the empty string, all events are passed</p>
</dd>
<dt><a href="#Filterer">Filterer</a></dt>
<dd><p>A base class for Loggers and Handlers for managing the filters.</p>
</dd>
<dt><a href="#Handler">Handler</a> ⇐ <code><a href="#Filterer">Filterer</a></code></dt>
<dd><p>Handler instances dispatch logging events to specific destinations.</p>
<p>The base handler class <code>Handler</code>, acts as a placeholder which defines the Handler
interface. Handlers can optionally use Formatter instances to format
records as desired. By default, no formatter is specified; in this case,
the &#39;raw&#39; message as determined by record.getMessage() is logged.</p>
</dd>
<dt><a href="#Logger">Logger</a> ⇐ <code><a href="#Filterer">Filterer</a></code></dt>
<dd><p>Instances of the Logger class represent a single logging channel.
A &quot;logging channel&quot; indicates an area of an application. Exactly how an
&quot;area&quot; is defined is up to the application developer. Since an application
can have any number of areas, logging channels are identified
by a unique string. Application areas can be nested (e.g. an area
of &quot;input processing&quot; might include sub-areas &quot;read CSV files&quot;, &quot;read
XLS files&quot; and &quot;read Gnumeric files&quot;). To cater for this natural nesting,
channel names are organized into a namespace hierarchy where levels are
separated by periods, much like the Java or Python package namespace. So
in the instance given above, channel names might be &quot;input&quot; for the upper
level, and &quot;input.csv&quot;, &quot;input.xls&quot; and &quot;input.gnu&quot; for the sub-levels.
There is no arbitrary limit to the depth of nesting.</p>
</dd>
<dt><a href="#ConsoleHandler">ConsoleHandler</a> ⇐ <code><a href="#Handler">Handler</a></code></dt>
<dd><p>A handler which writes log records to stdout/stderr.</p>
</dd>
<dt><a href="#Formatter">Formatter</a></dt>
<dd><p>Formatter instances are used to convert a LogRecord to text.
   Formatters need to know how a LogRecord is constructed. They are
   responsible for converting a LogRecord to (usually) a string which can
   be interpreted by either a human or an external system. The base Formatter
   allows a formatting string to be specified. If none is supplied, the
   default formatting string &quot;%(levelname)s:%(name)s:%(message)s\n&quot; is used.
   Currently, the useful attributes in a LogRecord are described by:</p>
<pre>
   %(name)s            Name of the logger (logging channel)
   %(level)s           Numeric logging level for the message (DEBUG, INFO,
                       WARN, ERROR, CRITICAL)
   %(levelname)s       Text logging level for the message ("DEBUG", "INFO",
                       "WARN", "ERROR", "EXCEPTION", "CRITICAL")
   %(created)f         Time when the LogRecord was created (time.time()
                       return value)
   %(asctime)s         Textual time when the LogRecord was created
   %(process)d         Process ID (if available)
   %(message)s         The result of record.getMessage(), computed just as
                       the record is emitted
   %(trace)s           The stack trace where logging call was made

   NOTE: filename, lineno, modulename, and funcName are not available in this version,
   and to fetch these, trace need to parsed by the developer.
</pre></dd>
</dl>

## Members

<dl>
<dt><a href="#CRITICAL">CRITICAL</a></dt>
<dd><p>Log level CRITICAL with numeric value 50.</p>
</dd>
<dt><a href="#FATAL">FATAL</a></dt>
<dd><p>Log level FATAL with numeric value same as of CRITICAL.</p>
</dd>
<dt><a href="#ERROR">ERROR</a></dt>
<dd><p>Log level ERROR with numeric value 40.</p>
</dd>
<dt><a href="#EXCEPTION">EXCEPTION</a></dt>
<dd><p>Log level EXCEPTION with numeric value same as of ERROR.</p>
</dd>
<dt><a href="#WARN">WARN</a></dt>
<dd><p>Log level WARN with numeric value 30.</p>
</dd>
<dt><a href="#WARNING">WARNING</a></dt>
<dd><p>Log level WARNING and is same as WARN.</p>
</dd>
<dt><a href="#INFO">INFO</a></dt>
<dd><p>Log level INFO with numeric value 20.</p>
</dd>
<dt><a href="#DEBUG">DEBUG</a></dt>
<dd><p>Log level DEBUG with numeric value 10.</p>
</dd>
<dt><a href="#NOTSET">NOTSET</a></dt>
<dd><p>Log level NOTSET with numeric value 0.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#setLoggerClass">setLoggerClass(klass)</a></dt>
<dd><p>Set the logger class inherited from Logger.
This is usefull incase developer wants to use a custom logger class.
However this custom class should be inherited from Logger class.</p>
</dd>
<dt><a href="#setLogRecordClass">setLogRecordClass(klass)</a></dt>
<dd><p>Set the log record class inherited from LogRecord.
This is usefull incase developer wants to use a custom log record class.
However this custom class should be inherited from LogRecord class.</p>
</dd>
<dt><a href="#getLogger">getLogger([name])</a> ⇒ <code><a href="#Logger">Logger</a></code></dt>
<dd><p>Get logger instance for the given logger name.
All calls to this function with a given name return the same logger instance.
This means that logger instances never need to be passed between different
parts of an application.</p>
</dd>
</dl>

<a name="LogRecord"></a>

## LogRecord
A LogRecord instance represents an event being logged.
LogRecord instances are created every time something is logged. They
contain all the information pertinent to the event being logged. The
main information passed in is in msg and args, which are combined
using `util.format` to create the message field of the record. The
record also includes information such as when the record was created,
the stack trace where logging call was made, and any exception
information to be logged.

**Kind**: global class  

* [LogRecord](#LogRecord)
    * [new LogRecord(name, level, levelname, msg, [args], [trace])](#new_LogRecord_new)
    * [.getMessage()](#LogRecord+getMessage) ⇒ <code>string</code>

<a name="new_LogRecord_new"></a>

### new LogRecord(name, level, levelname, msg, [args], [trace])
Initialize a logging record with interesting information.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the logger name. |
| level | <code>int</code> | log level number. |
| levelname | <code>int</code> | log level name. |
| msg | <code>string</code> | the log message. |
| [args] | <code>args</code> | the arguments to be applied on the msg. |
| [trace] | <code>string</code> | the stack trace. |

<a name="LogRecord+getMessage"></a>

### logRecord.getMessage() ⇒ <code>string</code>
Return the message for this LogRecord after merging any user-supplied
arguments with the message.

**Kind**: instance method of <code>[LogRecord](#LogRecord)</code>  
**Returns**: <code>string</code> - the formatted message.  
<a name="Filter"></a>

## Filter
Filter instances are used to perform arbitrary filtering of
LogRecords.
Loggers and Handlers can optionally use Filter instances to filter
records as desired. The base filter class only allows events which are
below a certain point in the logger hierarchy. For example, a filter
initialized with "A.B" will allow events logged by loggers "A.B",
"A.B.C", "A.B.C.D", "A.B.D" etc. but not "A.BB", "B.A.B" etc. If
initialized with the empty string, all events are passed

**Kind**: global class  

* [Filter](#Filter)
    * [new Filter([name])](#new_Filter_new)
    * [.filter(record)](#Filter+filter) ⇒ <code>boolean</code>

<a name="new_Filter_new"></a>

### new Filter([name])
Initialize a filter.

Initialize with the name of the logger which, together with its
children, will have its events allowed through the filter. If no
name is specified, allow every event.


| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | the logger name. |

<a name="Filter+filter"></a>

### filter.filter(record) ⇒ <code>boolean</code>
Determine if the specified record is to be logged.

**Kind**: instance method of <code>[Filter](#Filter)</code>  
**Returns**: <code>boolean</code> - Is the specified record to be logged?
Returns false for no, true for yes.  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |

<a name="Filterer"></a>

## Filterer
A base class for Loggers and Handlers for managing the filters.

**Kind**: global class  

* [Filterer](#Filterer)
    * [new Filterer()](#new_Filterer_new)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_Filterer_new"></a>

### new Filterer()
Initialize the list of filters to be an empty list.

<a name="Filterer+addFilter"></a>

### filterer.addFilter(filter)
Add the specified filter to this handler/logger.

**Kind**: instance method of <code>[Filterer](#Filterer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[Filter](#Filter)</code> | the filter instance. |

<a name="Filterer+removeFilter"></a>

### filterer.removeFilter(filter)
Remove the specified filter from this handler/logger.

**Kind**: instance method of <code>[Filterer](#Filterer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[Filter](#Filter)</code> | the filter instance. |

<a name="Filterer+filter"></a>

### filterer.filter(record) ⇒ <code>boolean</code>
Determine if a record is loggable by consulting all the filters.
The default is to allow the record to be logged; any filter can veto
this and the record is then dropped.

**Kind**: instance method of <code>[Filterer](#Filterer)</code>  
**Returns**: <code>boolean</code> - false if a record is to be dropped, else true.  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |

<a name="Handler"></a>

## Handler ⇐ <code>[Filterer](#Filterer)</code>
Handler instances dispatch logging events to specific destinations.

The base handler class `Handler`, acts as a placeholder which defines the Handler
interface. Handlers can optionally use Formatter instances to format
records as desired. By default, no formatter is specified; in this case,
the 'raw' message as determined by record.getMessage() is logged.

**Kind**: global class  
**Extends:** <code>[Filterer](#Filterer)</code>  

* [Handler](#Handler) ⇐ <code>[Filterer](#Filterer)</code>
    * [new Handler([level])](#new_Handler_new)
    * [.getName()](#Handler+getName) ⇒ <code>string</code>
    * [.setLevel(level)](#Handler+setLevel)
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.format(record, fmt)](#Handler+format) ⇒ <code>string</code>
    * [.emit(record)](#Handler+emit)
    * [.handle(record)](#Handler+handle) ⇒ <code>boolean</code>
    * [.flush()](#Handler+flush)
    * [.close()](#Handler+close)
    * [.handleError(record)](#Handler+handleError)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_Handler_new"></a>

### new Handler([level])
Initializes the instance - basically setting the formatter to None
and the filter list to empty.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [level] | <code>integer</code> | <code>NOTSET</code> | the log level. |

<a name="Handler+getName"></a>

### handler.getName() ⇒ <code>string</code>
Get the logger name.

**Kind**: instance method of <code>[Handler](#Handler)</code>  
**Returns**: <code>string</code> - the logger name.  
<a name="Handler+setLevel"></a>

### handler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>integer</code> &#124; <code>string</code> | the log level. |

<a name="Handler+setFormatter"></a>

### handler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type | Description |
| --- | --- | --- |
| formatter | <code>[Formatter](#Formatter)</code> | the formatter instance. |

<a name="Handler+format"></a>

### handler.format(record, fmt) ⇒ <code>string</code>
Format the specified record.
If a formatter is set, use it. Otherwise, return record.getMessage()

**Kind**: instance method of <code>[Handler](#Handler)</code>  
**Returns**: <code>string</code> - formatted message.  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |
| fmt | <code>string</code> | optional fmt to be used instead of the default one. |

<a name="Handler+emit"></a>

### handler.emit(record)
Do whatever it takes to actually log the specified logging record.
This version is intended to be implemented by subclasses and so
throws a Not implemented Error.

**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |

<a name="Handler+handle"></a>

### handler.handle(record) ⇒ <code>boolean</code>
Conditionally emit the specified logging record.

Emission depends on filters which may have been added to the handler.

**Kind**: instance method of <code>[Handler](#Handler)</code>  
**Returns**: <code>boolean</code> - whether the filter passed the record for emission.  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |

<a name="Handler+flush"></a>

### handler.flush()
Ensure all logging output has been flushed.

This version does nothing and is intended to be implemented by
subclasses.

**Kind**: instance method of <code>[Handler](#Handler)</code>  
<a name="Handler+close"></a>

### handler.close()
Tidy up any resources used by the handler.

This version does nothing and is intended to be implemented by
subclasses.

**Kind**: instance method of <code>[Handler](#Handler)</code>  
<a name="Handler+handleError"></a>

### handler.handleError(record)
Handle errors which occur during an emit() call.
This method should be called from handlers when an exception is
encountered during an emit() call. If raiseExceptions is false,
exceptions get silently ignored. This is what is mostly wanted
for a logging system - most users will not care about errors in
the logging system, they are more interested in application errors.
You could, however, replace this with a custom handler if you wish.
The record which was being processed is passed in to this method.

**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |

<a name="Filterer+addFilter"></a>

### handler.addFilter(filter)
Add the specified filter to this handler/logger.

**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[Filter](#Filter)</code> | the filter instance. |

<a name="Filterer+removeFilter"></a>

### handler.removeFilter(filter)
Remove the specified filter from this handler/logger.

**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[Filter](#Filter)</code> | the filter instance. |

<a name="Filterer+filter"></a>

### handler.filter(record) ⇒ <code>boolean</code>
Determine if a record is loggable by consulting all the filters.
The default is to allow the record to be logged; any filter can veto
this and the record is then dropped.

**Kind**: instance method of <code>[Handler](#Handler)</code>  
**Returns**: <code>boolean</code> - false if a record is to be dropped, else true.  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |

<a name="Logger"></a>

## Logger ⇐ <code>[Filterer](#Filterer)</code>
Instances of the Logger class represent a single logging channel.
A "logging channel" indicates an area of an application. Exactly how an
"area" is defined is up to the application developer. Since an application
can have any number of areas, logging channels are identified
by a unique string. Application areas can be nested (e.g. an area
of "input processing" might include sub-areas "read CSV files", "read
XLS files" and "read Gnumeric files"). To cater for this natural nesting,
channel names are organized into a namespace hierarchy where levels are
separated by periods, much like the Java or Python package namespace. So
in the instance given above, channel names might be "input" for the upper
level, and "input.csv", "input.xls" and "input.gnu" for the sub-levels.
There is no arbitrary limit to the depth of nesting.

**Kind**: global class  
**Extends:** <code>[Filterer](#Filterer)</code>  

* [Logger](#Logger) ⇐ <code>[Filterer](#Filterer)</code>
    * [new Logger(name, level)](#new_Logger_new)
    * [.addHandler(handler)](#Logger+addHandler)
    * [.removeHandler(handler)](#Logger+removeHandler)
    * [.getEffectiveLevel()](#Logger+getEffectiveLevel) ⇒ <code>int</code>
    * [.isEnabledFor(level)](#Logger+isEnabledFor) ⇒ <code>boolean</code>
    * [.handle(record)](#Logger+handle)
    * [.debug(msg, ...args)](#Logger+debug)
    * [.info(msg, ...args)](#Logger+info)
    * [.warn(msg, ...args)](#Logger+warn)
    * [.error(msg, ...args)](#Logger+error)
    * [.exception(msg, ...args)](#Logger+exception)
    * [.critical(msg, ...args)](#Logger+critical)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_Logger_new"></a>

### new Logger(name, level)
Initialize the logger with a name and an optional level.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the logger name. |
| level | <code>int/string</code> | the log level. |

<a name="Logger+addHandler"></a>

### logger.addHandler(handler)
Add the specified handler to this logger.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>[Handler](#Handler)</code> | an handler instance to be added. |

<a name="Logger+removeHandler"></a>

### logger.removeHandler(handler)
Remove the specified handler from this logger.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>[Handler](#Handler)</code> | an handler instance to be removed. |

<a name="Logger+getEffectiveLevel"></a>

### logger.getEffectiveLevel() ⇒ <code>int</code>
Get the effective level for this logger.
Loop through this logger and its parents in the logger hierarchy,
looking for a non-zero logging level. Return the first one found.

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Returns**: <code>int</code> - first found level in the lookup.  
<a name="Logger+isEnabledFor"></a>

### logger.isEnabledFor(level) ⇒ <code>boolean</code>
Is this logger enabled for level 'level'?

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Returns**: <code>boolean</code> - true if enabled for gievn level otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>int</code> | the log level |

<a name="Logger+handle"></a>

### logger.handle(record)
Call the handlers for the specified record.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record to handle |

<a name="Logger+debug"></a>

### logger.debug(msg, ...args)
Log `util.format(msg, ...args)` with severity 'DEBUG'.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | the log message. |
| ...args | <code>args</code> | args to be applied on the message. To pass extra fields and excInfo, pass an object as the last parameter with key excInfo or extra or both. If key extra or excInfo is present in the last parameter passed, pop it out from the args list and do not consider for string formatting and set excInfo and extra fields to log record. |

**Example**  
```js
logger.debug('Hi, I am a %s message', 'debug');
// Hi, I am a debug message
```
**Example**  
```js
logger.debug('Hi, I am a %s message', 'debug', {id: 90});
// Hi, I am a debug message {id: 90}
```
**Example**  
```js
logger.debug('Hi, I am a %s message', 'debug', {extra: {httpStatus: 200}});
// Hi, I am a debug message
// <Object with extra field is ignored, however these extra fields are
// available as part of the log record.
// Ex: record.httpStatus, record.excInfo etc.>
```
<a name="Logger+info"></a>

### logger.info(msg, ...args)
Log `util.format(msg, ...args)` with severity 'INFO'.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | the log message. |
| ...args | <code>args</code> | args to be applied on the message. [Visit for more details](#Logger+debug) |

<a name="Logger+warn"></a>

### logger.warn(msg, ...args)
Log `util.format(msg, ...args)` with severity 'WARN'.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | the log message. |
| ...args | <code>args</code> | args to be applied on the message. [Visit for more details](#Logger+debug) |

<a name="Logger+error"></a>

### logger.error(msg, ...args)
Log `util.format(msg, ...args)` with severity 'ERROR'.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | the log message. |
| ...args | <code>args</code> | args to be applied on the message. [Visit for more details](#Logger+debug) |

<a name="Logger+exception"></a>

### logger.exception(msg, ...args)
Log `util.format(msg, ...args)` with severity 'EXCEPTION'.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | the log message. |
| ...args | <code>args</code> | args to be applied on the message. [Visit for more details](#Logger+debug) |

<a name="Logger+critical"></a>

### logger.critical(msg, ...args)
Log `util.format(msg, ...args)` with severity 'CRITICAL'.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | the log message. |
| ...args | <code>args</code> | args to be applied on the message. [Visit for more details](#Logger+debug) |

<a name="Filterer+addFilter"></a>

### logger.addFilter(filter)
Add the specified filter to this handler/logger.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[Filter](#Filter)</code> | the filter instance. |

<a name="Filterer+removeFilter"></a>

### logger.removeFilter(filter)
Remove the specified filter from this handler/logger.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[Filter](#Filter)</code> | the filter instance. |

<a name="Filterer+filter"></a>

### logger.filter(record) ⇒ <code>boolean</code>
Determine if a record is loggable by consulting all the filters.
The default is to allow the record to be logged; any filter can veto
this and the record is then dropped.

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Returns**: <code>boolean</code> - false if a record is to be dropped, else true.  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |

<a name="ConsoleHandler"></a>

## ConsoleHandler ⇐ <code>[Handler](#Handler)</code>
A handler which writes log records to stdout/stderr.

**Kind**: global class  
**Extends:** <code>[Handler](#Handler)</code>  

* [ConsoleHandler](#ConsoleHandler) ⇐ <code>[Handler](#Handler)</code>
    * [new ConsoleHandler()](#new_ConsoleHandler_new)
    * [.emit(record)](#ConsoleHandler+emit)
    * [.getName()](#Handler+getName) ⇒ <code>string</code>
    * [.setLevel(level)](#Handler+setLevel)
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.format(record, fmt)](#Handler+format) ⇒ <code>string</code>
    * [.handle(record)](#Handler+handle) ⇒ <code>boolean</code>
    * [.flush()](#Handler+flush)
    * [.close()](#Handler+close)
    * [.handleError(record)](#Handler+handleError)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_ConsoleHandler_new"></a>

### new ConsoleHandler()
Initialize the ConsoleHandler instance.

<a name="ConsoleHandler+emit"></a>

### consoleHandler.emit(record)
Emit log record to stdout/stderr.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  
**Overrides:** <code>[emit](#Handler+emit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record to be emitted. |

<a name="Handler+getName"></a>

### consoleHandler.getName() ⇒ <code>string</code>
Get the logger name.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  
**Returns**: <code>string</code> - the logger name.  
<a name="Handler+setLevel"></a>

### consoleHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>integer</code> &#124; <code>string</code> | the log level. |

<a name="Handler+setFormatter"></a>

### consoleHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type | Description |
| --- | --- | --- |
| formatter | <code>[Formatter](#Formatter)</code> | the formatter instance. |

<a name="Handler+format"></a>

### consoleHandler.format(record, fmt) ⇒ <code>string</code>
Format the specified record.
If a formatter is set, use it. Otherwise, return record.getMessage()

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  
**Returns**: <code>string</code> - formatted message.  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |
| fmt | <code>string</code> | optional fmt to be used instead of the default one. |

<a name="Handler+handle"></a>

### consoleHandler.handle(record) ⇒ <code>boolean</code>
Conditionally emit the specified logging record.

Emission depends on filters which may have been added to the handler.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  
**Returns**: <code>boolean</code> - whether the filter passed the record for emission.  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |

<a name="Handler+flush"></a>

### consoleHandler.flush()
Ensure all logging output has been flushed.

This version does nothing and is intended to be implemented by
subclasses.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  
<a name="Handler+close"></a>

### consoleHandler.close()
Tidy up any resources used by the handler.

This version does nothing and is intended to be implemented by
subclasses.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  
<a name="Handler+handleError"></a>

### consoleHandler.handleError(record)
Handle errors which occur during an emit() call.
This method should be called from handlers when an exception is
encountered during an emit() call. If raiseExceptions is false,
exceptions get silently ignored. This is what is mostly wanted
for a logging system - most users will not care about errors in
the logging system, they are more interested in application errors.
You could, however, replace this with a custom handler if you wish.
The record which was being processed is passed in to this method.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |

<a name="Filterer+addFilter"></a>

### consoleHandler.addFilter(filter)
Add the specified filter to this handler/logger.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[Filter](#Filter)</code> | the filter instance. |

<a name="Filterer+removeFilter"></a>

### consoleHandler.removeFilter(filter)
Remove the specified filter from this handler/logger.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[Filter](#Filter)</code> | the filter instance. |

<a name="Filterer+filter"></a>

### consoleHandler.filter(record) ⇒ <code>boolean</code>
Determine if a record is loggable by consulting all the filters.
The default is to allow the record to be logged; any filter can veto
this and the record is then dropped.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  
**Returns**: <code>boolean</code> - false if a record is to be dropped, else true.  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |

<a name="Formatter"></a>

## Formatter
Formatter instances are used to convert a LogRecord to text.
   Formatters need to know how a LogRecord is constructed. They are
   responsible for converting a LogRecord to (usually) a string which can
   be interpreted by either a human or an external system. The base Formatter
   allows a formatting string to be specified. If none is supplied, the
   default formatting string "%(levelname)s:%(name)s:%(message)s\n" is used.
   Currently, the useful attributes in a LogRecord are described by:
<pre>
   %(name)s            Name of the logger (logging channel)
   %(level)s           Numeric logging level for the message (DEBUG, INFO,
                       WARN, ERROR, CRITICAL)
   %(levelname)s       Text logging level for the message ("DEBUG", "INFO",
                       "WARN", "ERROR", "EXCEPTION", "CRITICAL")
   %(created)f         Time when the LogRecord was created (time.time()
                       return value)
   %(asctime)s         Textual time when the LogRecord was created
   %(process)d         Process ID (if available)
   %(message)s         The result of record.getMessage(), computed just as
                       the record is emitted
   %(trace)s           The stack trace where logging call was made

   NOTE: filename, lineno, modulename, and funcName are not available in this version,
   and to fetch these, trace need to parsed by the developer.
</pre>

**Kind**: global class  

* [Formatter](#Formatter)
    * [new Formatter([fmt], [datefmt])](#new_Formatter_new)
    * [.format(record, fmt)](#Formatter+format) ⇒ <code>string</code>
    * [.formatField(record, name)](#Formatter+formatField) ⇒ <code>string</code>
    * [.formatTime(record, [datefmt])](#Formatter+formatTime) ⇒ <code>string</code>

<a name="new_Formatter_new"></a>

### new Formatter([fmt], [datefmt])
Initialize the formatter with specified format strings.


| Param | Type | Description |
| --- | --- | --- |
| [fmt] | <code>string</code> | the log format to be used. |
| [datefmt] | <code>string</code> | date format to be used. this format is passed to `moment` library for date formatting. |

<a name="Formatter+format"></a>

### formatter.format(record, fmt) ⇒ <code>string</code>
Format the record.

**Kind**: instance method of <code>[Formatter](#Formatter)</code>  
**Returns**: <code>string</code> - formatted string.  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record to be formatted. |
| fmt | <code>string</code> | optional fmt to be used instead of the default one. |

<a name="Formatter+formatField"></a>

### formatter.formatField(record, name) ⇒ <code>string</code>
Format a record field.

**Kind**: instance method of <code>[Formatter](#Formatter)</code>  
**Returns**: <code>string</code> - formatted record field.  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |
| name | <code>string</code> | name of the record field. |

<a name="Formatter+formatTime"></a>

### formatter.formatTime(record, [datefmt]) ⇒ <code>string</code>
Format the datetime field.

**Kind**: instance method of <code>[Formatter](#Formatter)</code>  
**Returns**: <code>string</code> - formatted datetime(asctime) field.  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>[LogRecord](#LogRecord)</code> | the log record. |
| [datefmt] | <code>string</code> | date format to be used instead of the default one. |

<a name="CRITICAL"></a>

## CRITICAL
Log level CRITICAL with numeric value 50.

**Kind**: global variable  
<a name="FATAL"></a>

## FATAL
Log level FATAL with numeric value same as of CRITICAL.

**Kind**: global variable  
<a name="ERROR"></a>

## ERROR
Log level ERROR with numeric value 40.

**Kind**: global variable  
<a name="EXCEPTION"></a>

## EXCEPTION
Log level EXCEPTION with numeric value same as of ERROR.

**Kind**: global variable  
<a name="WARN"></a>

## WARN
Log level WARN with numeric value 30.

**Kind**: global variable  
<a name="WARNING"></a>

## WARNING
Log level WARNING and is same as WARN.

**Kind**: global variable  
<a name="INFO"></a>

## INFO
Log level INFO with numeric value 20.

**Kind**: global variable  
<a name="DEBUG"></a>

## DEBUG
Log level DEBUG with numeric value 10.

**Kind**: global variable  
<a name="NOTSET"></a>

## NOTSET
Log level NOTSET with numeric value 0.

**Kind**: global variable  
<a name="setLoggerClass"></a>

## setLoggerClass(klass)
Set the logger class inherited from Logger.
This is usefull incase developer wants to use a custom logger class.
However this custom class should be inherited from Logger class.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| klass | <code>LoggerClass</code> | the the logger class to be used. |

<a name="setLogRecordClass"></a>

## setLogRecordClass(klass)
Set the log record class inherited from LogRecord.
This is usefull incase developer wants to use a custom log record class.
However this custom class should be inherited from LogRecord class.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| klass | <code>LogRecordClass</code> | the the log record class to be used. |

<a name="getLogger"></a>

## getLogger([name]) ⇒ <code>[Logger](#Logger)</code>
Get logger instance for the given logger name.
All calls to this function with a given name return the same logger instance.
This means that logger instances never need to be passed between different
parts of an application.

**Kind**: global function  
**Returns**: <code>[Logger](#Logger)</code> - the logger instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [name] | <code>string</code> | <code>&quot;&#x27;root&#x27;&quot;</code> | name of the logger. |

