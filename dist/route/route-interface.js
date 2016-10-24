'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _exceptionInterfaceType = require('../exception/exception-interface-type');

var _exceptionInterfaceType2 = _interopRequireDefault(_exceptionInterfaceType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteInterface = function () {
    function RouteInterface() {
        _classCallCheck(this, RouteInterface);

        if (this.constructor === RouteInterface) {
            throw new _exceptionInterfaceType2.default('Implementation is required');
        }
    }

    /**
     * @return {String}
     */


    _createClass(RouteInterface, [{
        key: 'getController',
        value: function getController() {
            throw new _exceptionInterfaceType2.default('Implementation is required getController');
        }

        /**
         * @return {String}
         */

    }, {
        key: 'getEndpoint',
        value: function getEndpoint() {
            throw new _exceptionInterfaceType2.default('Implementation is required getEndpoint');
        }

        /**
         * @return {String}
         */

    }, {
        key: 'getAction',
        value: function getAction() {
            throw new _exceptionInterfaceType2.default('Implementation is required getAction');
        }

        /**
         * @return {String}
         */

    }, {
        key: 'getMethod',
        value: function getMethod() {
            throw new _exceptionInterfaceType2.default('Implementation is required getMethod');
        }
    }]);

    return RouteInterface;
}();

exports.default = RouteInterface;