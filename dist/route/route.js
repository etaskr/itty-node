'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _routeInterface = require('./route-interface');

var _routeInterface2 = _interopRequireDefault(_routeInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Route = function (_RouteInterface) {
    _inherits(Route, _RouteInterface);

    /**
     * @param {String} endpoint
     * @param {String} controller
     * @param {String} action
     * @param {String=} method
     */
    function Route(endpoint, controller, action) {
        var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'get';

        _classCallCheck(this, Route);

        var _this = _possibleConstructorReturn(this, (Route.__proto__ || Object.getPrototypeOf(Route)).call(this));

        _this._endpoint = endpoint;
        _this._controller = controller;
        _this._action = action;
        _this._method = method;
        return _this;
    }

    /**
     * @inheritDoc
     */


    _createClass(Route, [{
        key: 'getController',
        value: function getController() {
            return this._controller;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getEndpoint',
        value: function getEndpoint() {
            return this._endpoint;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getAction',
        value: function getAction() {
            return this._action;
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'getMethod',
        value: function getMethod() {
            return this._method;
        }
    }]);

    return Route;
}(_routeInterface2.default);

exports.default = Route;