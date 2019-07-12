# Not a logger

This is a logger, that does not log by default.

It is super extendable through a simple middleware api.

## General logger API

```javascript
import logger from 'notalogger';

logger.createLogger() // creates a new Logger with an empty middleware stack
logger.trace(...) // logs to trace
logger.debug(...) // logs to debug
logger.info(...) // logs to info
logger.warn(...) // logs to warn
logger.error(...) // logs to error

logger.extend.addMiddleware(yourMiddleware) // adds a middleware to the middleware stack
logger.extend.addMiddlewares([yourMiddleware1, yourMiddleware2]) // appends a list of middlewares to the bottom of the middleware stack 
logger.extend.clearMiddlewares() // clears the middleware stack
logger.extend.getMiddlewares() // gets the list of middlewares
```

```javascript
import {
    logger, // same as the default export
    predefined, // exports the predefined Middlewares
    Level, // an enum of all available log levels
    levelWeight, // an object that maps from levelstring to a weight. Error has the highest weight
    Messages, // The type description of the messages passed to the middlewares
    Nextfunction, // The type description of the "next" function to call the next middleware
    Middleware, // The type description of a middleware
} from 'notalogger';
```

## Prepared Middlewares

### Console logger

Let's create a logger with a console middleware:

```javascript
import logger, { predefined } from 'notalogger';

logger.extend.addMiddleware(predefined.consoleDefault)

logger.info("info") // Logs: "info"
```

### Prefixer

If you want to prepend your log outputs with a static string:

```javascript
import logger, { predefined } from 'notalogger';

logger.extend.addMiddleware(predefined.prefixer('This is a prefix:'))
logger.extend.addMiddleware(predefined.consoleDefault)

logger.info("info") // Logs: "This is a prefix: info"
```

### Levelfilter

If want to filter for levels:

```javascript
import logger, { predefined, Level} from 'notalogger';

const levelFilter = new predefined.Levelfilter(Level.INFO)
logger.extend.addMiddleware(levelFilter.middleware)
logger.extend.addMiddleware(predefined.consoleDefault)

logger.info("info") // Logs: "info"
logger.debug("debug") // Does not log anything

levelFilter.setLevel(Level.DEBUG)

logger.info("info") // Logs: "info"
logger.debug("debug") // Logs: "debug"
```

### Middleware functionality

Please keep in mind that the order of adding middlewares is important since it builds a middleware stack.
Thus this logs `This is a prefix: info`:

```javascript
import logger, { predefined } from 'notalogger';

logger.extend.addMiddleware(predefined.prefixer('This is a prefix:'))
logger.extend.addMiddleware(predefined.consoleDefault)

logger.info("info") // Logs: "This is a prefix: info"
```

and this logs nothing because the logging to console happens before prepending the prefix:

```javascript
import logger, { predefined } from 'notalogger';

logger.extend.addMiddleware(predefined.consoleDefault)
logger.extend.addMiddleware(predefined.prefixer('This is a prefix:'))

logger.info("info") // Does not log anything
```

## Writing your own middlewares
The default middleware function looks like this:

```javascript
import logger, { predefined, Middleware, Level, Messages, Nextfunction } from 'notalogger';

const mid: Middleware = (loglevel: Level, messages: Messages, next: Nextfunction): void => {
    // do something here
    next(loglevel, messages) // next calls the next middleware in the stack
}

logger.extend.addMiddleware(mid)
logger.extend.addMiddleware(predefined.consoleDefault)

logger.info("info")
```
