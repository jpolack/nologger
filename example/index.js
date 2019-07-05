const loggerModule = require('../dist/logger'); //eslint-disable-line @typescript-eslint/no-var-requires
const logger = loggerModule.default
const plugins = loggerModule.plugins

logger.extend.addMiddleware(plugins.prefixer("SomeStaticPrefix"));
logger.extend.addMiddleware(plugins.consoleDefault);

logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');
