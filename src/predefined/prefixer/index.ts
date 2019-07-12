import { Middleware } from '../../logger/types';

const factory = (prefix): Middleware => {
    const mid: Middleware = (loglevel, messages, next): void => {
        next(loglevel, [prefix, ...messages])
    }

    return mid
}

export default factory
