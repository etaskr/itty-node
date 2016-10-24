import Yaml from 'yaml-with-import';
import Winston from 'winston';
import Container from './dependency-injection/container';
import ServiceLoader from './dependency-injection/service-loader';
import RouterLoader from './route/route-loader';
import MiddlewareLoader from './middleware/middlerware-loader';
import Server from './server/server-express-adapter';

const Logger = Winston.Logger;
const DEFAULT_CONFIG = {
    server: {
        port: 3000,
    },
    middleware: [],
    routes: [],
};

const DEFAULTS = {
    BASE_DIR: `${process.cwd()}`,
    CONFIG: {
        DIR: '/config',
        FILE: 'config.yml',
        FORMAT: 'yaml',
    },
    LIB: {
        DIR: '/lib',
    },
};

class IttyNode {
    /**
     * @param {Object} config
     * @param {String} libDirs
     * @param {ServiceLoader} serviceContainer
     * @param {RouterLoader} routerLoader
     * @param {MiddlewareLoader} middlewareLoader
     * @param {ServerInterface} server
     * @param {Logger} logger
     */
    constructor(
        config = DEFAULT_CONFIG,
        libDirs = `${DEFAULTS.BASE_DIR}/${DEFAULTS.LIB.DIR}`,
        serviceContainer,
        routerLoader,
        middlewareLoader,
        server,
        logger
    ) {
        this._config = config;
        this._libDirs = libDirs;
        this._serviceContainer = serviceContainer;
        this._routerLoader = routerLoader;
        this._middlewareLoader = middlewareLoader;
        this._server = server;
        this._logger = logger;
    }

    /**
     * @return {Promise}
     */
    async start() {
        // load services
        this._serviceContainer.setRootPath(this._libDirs);
        this._serviceContainer.registerServices();

        // add middleware
        const middlewareStack = this._middlewareLoader.getMiddlewareStack(this._config.middleware);
        this._server.addMiddlewareStack(middlewareStack);

        // add routes
        const routes = this._routerLoader.getRoutes(this._config.routes);
        this._server.addRoutes(routes);

        // add view layer

        return this._server.start();
    }

    /**
     * @return {Promise}
     */
    getServer() {
        return this._server.getServer();
    }

    /**
     * @return {Promise}
     */
    async stop() {
        // TODO
        return Promise.resolve();
    }
}

/**
 * @param {String} baseDir
 * @param {String} configFile
 * @param {String} libDir
 * @return {IttyNode}
 */
const createInstance = (
    baseDir = DEFAULTS.BASE_DIR,
    configDir = `${baseDir}${DEFAULTS.CONFIG.DIR}`,
    configFile = DEFAULTS.CONFIG.FILE,
    libDir = `${baseDir}${DEFAULTS.LIB.DIR}`
) => {
    // parse config TODO move to a config parser / loader
    const yamlConfig = new Yaml();
    yamlConfig.setRootPath(configDir);
    const config = yamlConfig.read(`${configDir}/${configFile}`);

    const logger = new Logger({
        transports: [new (Winston.transports.Console)()],
    });
    const container = new Container();
    // TODO move this into the IttyNode definition
    container.register('config', [], config);
    const serviceLoader = new ServiceLoader(container, config.services, logger);
    const routerLoader = new RouterLoader(container, logger);
    const middlewareLoader = new MiddlewareLoader(container, logger);
    const server = new Server(config.server.port, logger);

    return new IttyNode(
        config,
        libDir,
        serviceLoader,
        routerLoader,
        middlewareLoader,
        server,
        logger
    );
};

export default createInstance;
export {
    IttyNode,
    createInstance,
};
