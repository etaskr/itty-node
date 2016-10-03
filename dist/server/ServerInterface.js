'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ExceptionInterfaceType = require('../exception/ExceptionInterfaceType');

var _ExceptionInterfaceType2 = _interopRequireDefault(_ExceptionInterfaceType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServerInterface = function () {
    function ServerInterface() {
        _classCallCheck(this, ServerInterface);

        if (this.constructor === ServerInterface) {
            throw new _ExceptionInterfaceType2.default();
        }
    }

    _createClass(ServerInterface, [{
        key: 'getServer',
        value: function getServer() {
            throw new _ExceptionInterfaceType2.default();
        }
    }, {
        key: 'getConfig',
        value: function getConfig() {
            throw new _ExceptionInterfaceType2.default();
        }
    }, {
        key: 'getContainer',
        value: function getContainer() {
            throw new _ExceptionInterfaceType2.default();
        }
    }, {
        key: 'boot',
        value: function boot() {
            throw new _ExceptionInterfaceType2.default();
        }
    }]);

    return ServerInterface;
}();

exports.default = ServerInterface;