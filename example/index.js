const logger = require('../dist/logger').default;

logger.extend.addMiddleware((loglevel, messages, next) => {
    console.info(loglevel, messages, next);
});

logger.info('OK');
