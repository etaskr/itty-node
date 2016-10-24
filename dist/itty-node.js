'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createInstance = exports.IttyNode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yamlWithImport = require('yaml-with-import');

var _yamlWithImport2 = _interopRequireDefault(_yamlWithImport);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _container = require('./dependency-injection/container');

var _container2 = _interopRequireDefault(_container);

var _serviceLoader = require('./dependency-injection/service-loader');

var _serviceLoader2 = _interopRequireDefault(_serviceLoader);

var _routeLoader = require('./route/route-loader');

var _routeLoader2 = _interopRequireDefault(_routeLoader);

var _middlerwareLoader = require('./middleware/middlerware-loader');

var _middlerwareLoader2 = _interopRequireDefault(_middlerwareLoader);

var _serverExpressAdapter = require('./server/server-express-adapter');

var _serverExpressAdapter2 = _interopRequireDefault(_serverExpressAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = _winston2.default.Logger;
var DEFAULT_CONFIG = {
    server: {
        port: 3000
    },
    middleware: [],
    routes: []
};

var DEFAULTS = {
    BASE_DIR: '' + process.cwd(),
    CONFIG: {
        DIR: '/config',
        FILE: 'config.yml',
        FORMAT: 'yaml'
    },
    LIB: {
        DIR: '/lib'
    }
};

var IttyNode = function () {
    /**
     * @param {Object} config
     * @param {String} libDirs
     * @param {ServiceLoader} serviceContainer
     * @param {RouterLoader} routerLoader
     * @param {MiddlewareLoader} middlewareLoader
     * @param {ServerInterface} server
     * @param {Logger} logger
     */
    function IttyNode() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_CONFIG;
        var libDirs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULTS.BASE_DIR + '/' + DEFAULTS.LIB.DIR;
        var serviceContainer = arguments[2];
        var routerLoader = arguments[3];
        var middlewareLoader = arguments[4];
        var server = arguments[5];
        var logger = arguments[6];

        _classCallCheck(this, IttyNode);

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


    _createClass(IttyNode, [{
        key: 'start',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var middlewareStack, routes;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                // load services
                                this._serviceContainer.setRootPath(this._libDirs);
                                this._serviceContainer.registerServices();

                                // add middleware
                                middlewareStack = this._middlewareLoader.getMiddlewareStack(this._config.middleware);

                                this._server.addMiddlewareStack(middlewareStack);

                                // add routes
                                routes = this._routerLoader.getRoutes(this._config.routes);

                                this._server.addRoutes(routes);

                                // add view layer

                                return _context.abrupt('return', this._server.start());

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function start() {
                return _ref.apply(this, arguments);
            }

            return start;
        }()

        /**
         * @return {Promise}
         */

    }, {
        key: 'getServer',
        value: function getServer() {
            return this._server.getServer();
        }

        /**
         * @return {Promise}
         */

    }, {
        key: 'stop',
        value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', Promise.resolve());

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function stop() {
                return _ref2.apply(this, arguments);
            }

            return stop;
        }()
    }]);

    return IttyNode;
}();

/**
 * @param {String} baseDir
 * @param {String} configFile
 * @param {String} libDir
 * @return {IttyNode}
 */


var createInstance = function createInstance() {
    var baseDir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.BASE_DIR;
    var configDir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '' + baseDir + DEFAULTS.CONFIG.DIR;
    var configFile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULTS.CONFIG.FILE;
    var libDir = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '' + baseDir + DEFAULTS.LIB.DIR;

    // parse config TODO move to a config parser / loader
    var yamlConfig = new _yamlWithImport2.default();
    yamlConfig.setRootPath(configDir);
    var config = yamlConfig.read(configDir + '/' + configFile);

    var logger = new Logger({
        transports: [new _winston2.default.transports.Console()]
    });
    var container = new _container2.default();
    // TODO move this into the IttyNode definition
    container.register('config', [], config);
    var serviceLoader = new _serviceLoader2.default(container, config.services, logger);
    var routerLoader = new _routeLoader2.default(container, logger);
    var middlewareLoader = new _middlerwareLoader2.default(container, logger);
    var server = new _serverExpressAdapter2.default(config.server.port, logger);

    return new IttyNode(config, libDir, serviceLoader, routerLoader, middlewareLoader, server, logger);
};

exports.default = createInstance;
exports.IttyNode = IttyNode;
exports.createInstance = createInstance;