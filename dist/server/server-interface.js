'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _exceptionInterfaceType = require('../exception/exception-interface-type');

var _exceptionInterfaceType2 = _interopRequireDefault(_exceptionInterfaceType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServerInterface = function () {
    function ServerInterface() {
        _classCallCheck(this, ServerInterface);

        if (this.constructor === ServerInterface) {
            throw new _exceptionInterfaceType2.default();
        }
    }

    /**
     * @return {*}
     */


    _createClass(ServerInterface, [{
        key: 'getServer',
        value: function getServer() {
            throw new _exceptionInterfaceType2.default();
        }

        /**
         * @return {Promise}
         */

    }, {
        key: 'start',
        value: function start() {
            throw new _exceptionInterfaceType2.default();
        }

        /**
         * Add all middleware to the server.
         *
         * @param {Array.<MiddlewareInterface>} middlewareStack
         */

    }, {
        key: 'addMiddlewareStack',
        value: function addMiddlewareStack() {
            var middlewareStack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            throw new _exceptionInterfaceType2.default('Implementation needed: ' + middlewareStack);
        }

        /**
         * Add all routes to the server.
         *
         * @param {Array.<RouteInterface>} routes
         */

    }, {
        key: 'addRoutes',
        value: function addRoutes() {
            var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            throw new _exceptionInterfaceType2.default('Implementation needed: ' + routes);
        }

        /**
         * Adds a route to the server.
         *
         * @param {RouteInterface} route
         */

    }, {
        key: 'addRoute',
        value: function addRoute(route) {
            throw new _exceptionInterfaceType2.default('Implementation needed: ' + route);
        }
    }]);

    return ServerInterface;
}();

exports.default = ServerInterface;