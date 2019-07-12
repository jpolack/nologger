# Not a logger

This is a logger, that does not log by default.

It is super extendable through a simple middleware api.

## Prepared Middlewares

### Console logger

Let's create a logger with a console middleware:

```javascript
import logger, { plugins } from 'notalogger';

logger.extend.addMiddleware(plugins.consoleDefault);

logger.info('info');
```