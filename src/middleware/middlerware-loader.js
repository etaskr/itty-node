class MiddlewareLoader {
    /**
     * @param container
     * @param logger
     */
    constructor(container, logger) {
        this._container = container;
        this._logger = logger;
    }

    /**
     * @param {Array.<String>} middlewareStack
     * @return {Array.<MiddlewareInterface>}
     */
    getMiddlewareStack(middlewareStack = []) {
        this._logger.info('Loading middleware from service container into a middleware stack');
        const middlewareInstancesStack = [];

        if (!!middlewareStack) {
            for (const middleware of middlewareStack) {
                try {
                    const middlewareInstance = this._container.get(middleware);
                    middlewareInstancesStack.push(middlewareInstance);
                } catch (err) {
                    this._logger.error(`Failed to load middleware ${middleware}`, err);
                }
            }
        }
        return middlewareInstancesStack;
    }
}

export default MiddlewareLoader;
