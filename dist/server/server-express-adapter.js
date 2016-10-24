'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serverInterface = require('./server-interface');

var _serverInterface2 = _interopRequireDefault(_serverInterface);

var _middlewareInterface = require('./../middleware/middleware-interface');

var _middlewareInterface2 = _interopRequireDefault(_middlewareInterface);

var _routeInterface = require('../route/route-interface');

var _routeInterface2 = _interopRequireDefault(_routeInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServerExpressAdapter = function (_ServerInterface) {
    _inherits(ServerExpressAdapter, _ServerInterface);

    /**
     * @param {Number} port
     * @param {Logger=} logger
     */
    function ServerExpressAdapter() {
        var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
        var logger = arguments[1];

        _classCallCheck(this, ServerExpressAdapter);

        var _this = _possibleConstructorReturn(this, (ServerExpressAdapter.__proto__ || Object.getPrototypeOf(ServerExpressAdapter)).call(this));

        _this._express = (0, _express2.default)();
        _this._port = port;
        _this._logger = logger;
        return _this;
    }

    /**
     * @inheritDoc
     */


    _createClass(ServerExpressAdapter, [{
        key: 'getServer',
        value: function getServer() {
            return this._express;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2._express.listen(_this2._port, function (err) {
                    if (!!err) {
                        reject(err);
                    } else {
                        _this2._logger.info('Server started on port [' + _this2._port + ']');
                        resolve();
                    }
                });
            });
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'addMiddlewareStack',
        value: function addMiddlewareStack() {
            var middlewareStack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = middlewareStack[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var middleware = _step.value;

                    if (middleware instanceof _middlewareInterface2.default) {
                        this.getServer().use(middleware.invoke.bind(middleware));
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'addRoutes',
        value: function addRoutes() {
            var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = routes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var route = _step2.value;

                    if (route instanceof _routeInterface2.default) {
                        this.addRoute(route);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'addRoute',
        value: function addRoute(route) {
            var server = this.getServer();
            var method = route.getMethod();
            var controller = route.getController();
            var action = route.getAction();
            var endpoint = route.getEndpoint();

            this._logger.info('Adding route [' + method + '::' + endpoint + '] [' + controller.constructor.name + '::' + action + ']');

            try {
                server[method](endpoint, function (req, res) {
                    controller[action](req, res);
                });
            } catch (err) {
                this._logger.error('Failed to add route [' + method + '::' + endpoint + '] [' + controller.constructor.name + '::' + action + ']', err);
            }
        }
    }]);

    return ServerExpressAdapter;
}(_serverInterface2.default);

exports.default = ServerExpressAdapter;