import RouteInterface from './route-interface';

class Route extends RouteInterface {
    /**
     * @param {String} endpoint
     * @param {String} controller
     * @param {String} action
     * @param {String=} method
     */
    constructor(endpoint, controller, action, method = 'get') {
        super();
        this._endpoint = endpoint;
        this._controller = controller;
        this._action = action;
        this._method = method;
    }

    /**
     * @inheritDoc
     */
    getController() {
        return this._controller;
    }

    /**
     * @inheritDoc
     */
    getEndpoint() {
        return this._endpoint;
    }

    /**
     * @inheritDoc
     */
    getAction() {
        return this._action;
    }

    /**
     * @inheritDoc
     */
    getMethod() {
        return this._method;
    }
}

export default Route;
