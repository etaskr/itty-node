'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _exceptionInterfaceType = require('../exception/exception-interface-type');

var _exceptionInterfaceType2 = _interopRequireDefault(_exceptionInterfaceType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ControllerInterface = function ControllerInterface() {
    _classCallCheck(this, ControllerInterface);

    if (this.constructor === ControllerInterface) {
        throw new _exceptionInterfaceType2.default('Implementation is required');
    }
};

exports.default = ControllerInterface;