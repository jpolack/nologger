import { Middleware } from './../../logger/types';

const factory = (prefix): Middleware => {
    const plugin = (loglevel, messages, next): void => {
        next(loglevel, [prefix, ...messages])
    }

    return plugin
}

export default factory
