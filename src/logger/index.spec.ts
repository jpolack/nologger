import log from './index'

describe('logger', (): void => {
    beforeEach((): void => {
        log.extend.clearMiddlewares()
    })

    it('does nothing without middlewares', (): void => {
        log.info('OK')
    })

    it('does nothing without middlewares', (): void => {
        log.createLogger().info('OK')
    })

    it('applies middlewares', (): void => {
        const middleware = jest.fn((logmethod, messages, next): void => next())
        log.extend.addMiddleware(middleware)

        const middleware2 = jest.fn((logmethod, messages, next): void => next())
        log.extend.addMiddleware(middleware2)
        log.info('OK')

        expect(middleware).toBeCalledTimes(1)
        expect(middleware).toHaveBeenCalledWith('INFO', ['OK'], expect.anything())

        expect(middleware2).toBeCalledTimes(1)
        expect(middleware2).toHaveBeenCalledWith(undefined, undefined, expect.anything())
    })

    it('applies middlewares', (): void => {
        const middleware = jest.fn((): void => {})
        log.extend.addMiddleware(middleware)

        const middleware2 = jest.fn((logmethod, messages, next): void => next())
        log.extend.addMiddleware(middleware2)
        log.info('OK')

        expect(middleware).toBeCalledTimes(1)
        expect(middleware2).toBeCalledTimes(0)
    })

    it('does not cross trigger', (): void => {
        const l1 = log.createLogger()
        const l2 = log.createLogger()

        const middleware = jest.fn((logmethod, messages, next): void => next())
        l1.extend.addMiddleware(middleware)

        const middleware2 = jest.fn((logmethod, messages, next): void => next())
        l2.extend.addMiddleware(middleware2)

        const middleware3 = jest.fn((): void => { })
        log.extend.addMiddleware(middleware3)

        l1.info('OK')

        expect(middleware).toBeCalledTimes(1)
        expect(middleware2).toBeCalledTimes(0)
        expect(middleware3).toBeCalledTimes(0)
    })

    it('does clear middlewares', (): void => {
        const middleware = jest.fn((logmethod, messages, next): void => next())
        log.extend.addMiddleware(middleware)

        log.extend.clearMiddlewares()

        log.info('OK')

        expect(middleware).toBeCalledTimes(0)
    })
})
