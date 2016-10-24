import Route from './route';

class RouteLoader {
    constructor(container, logger) {
        this._container = container;
        this._logger = logger;
    }

    /**
     * @param {Array.<Object{path: {String}, controller: {String}, action: {String}, methods: {Array}}>} routesConfig
     * @return {Array.<Route>}
     */
    getRoutes(routesConfig) {
        const routes = [];

        for (const [routeKey, routeConfig] of Object.entries(routesConfig)) {
            const endpoint = routeConfig.path;
            const action = routeConfig.action;
            const controller = routeConfig.controller;

            for (const method of routeConfig.methods) {
                try {
                    const route = this.getRoute(endpoint, controller, action, method);
                    routes.push(route);
                } catch (err) {
                    this._logger.error(
                        `Failed to create route for ${routeKey}, ${endpoint}, ${controller}, ${action}, ${method}`,
                        err
                    );
                }
            }
        }

        return routes;
    }

    /**
     * @param {String} endpoint
     * @param {String} controller
     * @param {String} action
     * @param {String} method
     * @return {Route}
     */
    getRoute(endpoint, controller, action, method) {
        const controllerInstance = this._container.get(controller);
        return new Route(endpoint, controllerInstance, action, method);
    }
}

export default RouteLoader;
