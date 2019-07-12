import { Logger, Level, Middleware, Nextfunction } from "./types"

export const levelWeight = {
    'TRACE': 10,
    'DEBUG': 20,
    'INFO': 30,
    'WARN': 40,
    'ERROR': 50
}

const nextFactory = (middlewares, index): Nextfunction => {
    if (index >= middlewares.length || !middlewares[index]) {
        return (): void => { }
    }

    return (loglevel, messages): void => {
        middlewares[index](loglevel, messages, nextFactory(middlewares, index + 1))
    }
}

const bundle = (middlewareStack, loglevel, messages): void => {
    const next = nextFactory(middlewareStack, 0)
    next(loglevel, messages)
}

const createLogger = (): Logger => {
    let middlewareStack = []

    return {
        trace: (...messages): void => { bundle(middlewareStack, Level.TRACE, messages) },
        debug: (...messages): void => { bundle(middlewareStack, Level.DEBUG, messages) },
        info: (...messages): void => { bundle(middlewareStack, Level.INFO, messages) },
        warn: (...messages): void => { bundle(middlewareStack, Level.WARN, messages) },
        error: (...messages): void => { bundle(middlewareStack, Level.ERROR, messages) },
        extend: {
            clearMiddlewares: (): void => { middlewareStack = [] },
            addMiddleware: (middleware): void => {
                middlewareStack.push(middleware)
            },
            addMiddlewares: (middlewares): void => {
                middlewareStack.push(...middlewares)
            },
            getMiddlewares: (): Middleware[] => [...middlewareStack],
        },
        createLogger
    }
}

export default createLogger()
