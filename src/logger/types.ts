export enum Level {
    'TRACE'='TRACE',
    'DEBUG'='DEBUG',
    'INFO'='INFO',
    'WARN'='WARN',
    'ERROR'='ERROR',
}

export type Messages = any[] // eslint-disable-line @typescript-eslint/no-explicit-any

export type Middleware = (loglevel: Level, messages: Messages, next: Middleware) => void

export type Logfunction = (...messages: Messages) => void

export interface Logger {
    trace: Logfunction;
    debug: Logfunction;
    info: Logfunction;
    warn: Logfunction;
    error: Logfunction;
    extend: {
        clearMiddlewares: () => void;
        addMiddleware: (middleware: Middleware) => void;
        addMiddlewares: (middleware: Middleware[]) => void;
        getMiddlewares: () => Middleware[];
    };
    createLogger: () => Logger;
}