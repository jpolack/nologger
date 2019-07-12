import { Level, Middleware } from "../../logger/types";

const consoleMiddleware: Middleware= (loglevel, messages, next): void => {
    switch (loglevel) {
        case Level.TRACE:
            console.trace(...messages)
            break;
        case Level.DEBUG:
            console.log(...messages)
            break;
        case Level.INFO:
            console.info(...messages)
            break;
        case Level.WARN:
            console.warn(...messages)
            break;
        case Level.ERROR:
            console.error(...messages)
            break;
        default:
            console.info(...messages)
    }
    next(loglevel, messages)
}

export default consoleMiddleware
