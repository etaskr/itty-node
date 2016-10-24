import ExceptionInterfaceType from '../exception/exception-interface-type';

class ServerInterface {
    constructor() {
        if (this.constructor === ServerInterface) {
            throw new ExceptionInterfaceType();
        }
    }

    /**
     * @return {*}
     */
    getServer() {
        throw new ExceptionInterfaceType();
    }

    /**
     * @return {Promise}
     */
    start() {
        throw new ExceptionInterfaceType();
    }

    /**
     * Add all middleware to the server.
     *
     * @param {Array.<MiddlewareInterface>} middlewareStack
     */
    addMiddlewareStack(middlewareStack = []) {
        throw new ExceptionInterfaceType(`Implementation needed: ${middlewareStack}`);
    }

    /**
     * Add all routes to the server.
     *
     * @param {Array.<RouteInterface>} routes
     */
    addRoutes(routes = []) {
        throw new ExceptionInterfaceType(`Implementation needed: ${routes}`);
    }

    /**
     * Adds a route to the server.
     *
     * @param {RouteInterface} route
     */
    addRoute(route) {
        throw new ExceptionInterfaceType(`Implementation needed: ${route}`);
    }
}

export default ServerInterface;
