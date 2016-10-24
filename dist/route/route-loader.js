'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteLoader = function () {
    function RouteLoader(container, logger) {
        _classCallCheck(this, RouteLoader);

        this._container = container;
        this._logger = logger;
    }

    /**
     * @param {Array.<Object{path: {String}, controller: {String}, action: {String}, methods: {Array}}>} routesConfig
     * @return {Array.<Route>}
     */


    _createClass(RouteLoader, [{
        key: 'getRoutes',
        value: function getRoutes(routesConfig) {
            var routes = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(routesConfig)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var routeKey = _step$value[0];
                    var routeConfig = _step$value[1];

                    var endpoint = routeConfig.path;
                    var action = routeConfig.action;
                    var controller = routeConfig.controller;

                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = routeConfig.methods[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var method = _step2.value;

                            try {
                                var route = this.getRoute(endpoint, controller, action, method);
                                routes.push(route);
                            } catch (err) {
                                this._logger.error('Failed to create route for ' + routeKey + ', ' + endpoint + ', ' + controller + ', ' + action + ', ' + method, err);
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

            return routes;
        }

        /**
         * @param {String} endpoint
         * @param {String} controller
         * @param {String} action
         * @param {String} method
         * @return {Route}
         */

    }, {
        key: 'getRoute',
        value: function getRoute(endpoint, controller, action, method) {
            var controllerInstance = this._container.get(controller);
            return new _route2.default(endpoint, controllerInstance, action, method);
        }
    }]);

    return RouteLoader;
}();

exports.default = RouteLoader;