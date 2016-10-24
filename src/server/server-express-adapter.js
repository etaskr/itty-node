import express from 'express';
import ServerInterface from './server-interface';
import MiddlewareInterface from './../middleware/middleware-interface';
import RouteInterface from '../route/route-interface';

class ServerExpressAdapter extends ServerInterface {
    /**
     * @param {Number} port
     * @param {Logger=} logger
     */
    constructor(port = 3000, logger) {
        super();
        this._express = express();
        this._port = port;
        this._logger = logger;
    }

    /**
     * @inheritDoc
     */
    getServer() {
        return this._express;
    }

    /**
     * @inheritDoc
     */
    start() {
        return new Promise((resolve, reject) => {
            this._express.listen(this._port, (err) => {
                if (!!err) {
                    reject(err);
                } else {
                    this._logger.info(`Server started on port [${this._port}]`);
                    resolve();
                }
            });
        });
    }

    /**
     * @inheritDoc
     */
    addMiddlewareStack(middlewareStack = []) {
        for (const middleware of middlewareStack) {
            if (middleware instanceof MiddlewareInterface) {
                this.getServer().use(middleware.invoke.bind(middleware));
            }
        }
    }

    /**
     * @inheritDoc
     */
    addRoutes(routes = []) {
        for (const route of routes) {
            if (route instanceof RouteInterface) {
                this.addRoute(route);
            }
        }
    }

    /**
     * @inheritDoc
     */
    addRoute(route) {
        const server = this.getServer();
        const method = route.getMethod();
        const controller = route.getController();
        const action = route.getAction();
        const endpoint = route.getEndpoint();

        this._logger.info(`Adding route [${method}::${endpoint}] [${controller.constructor.name}::${action}]`);

        try {
            server[method](endpoint, (req, res) => {
                controller[action](req, res);
            });
        } catch (err) {
            this._logger.error(`Failed to add route [${method}::${endpoint}] [${controller.constructor.name}::${action}]`, err);
        }
    }
}

export default ServerExpressAdapter;
