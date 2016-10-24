'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MiddlewareLoader = function () {
    /**
     * @param container
     * @param logger
     */
    function MiddlewareLoader(container, logger) {
        _classCallCheck(this, MiddlewareLoader);

        this._container = container;
        this._logger = logger;
    }

    /**
     * @param {Array.<String>} middlewareStack
     * @return {Array.<MiddlewareInterface>}
     */


    _createClass(MiddlewareLoader, [{
        key: 'getMiddlewareStack',
        value: function getMiddlewareStack() {
            var middlewareStack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this._logger.info('Loading middleware from service container into a middleware stack');
            var middlewareInstancesStack = [];

            if (!!middlewareStack) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = middlewareStack[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var middleware = _step.value;

                        try {
                            var middlewareInstance = this._container.get(middleware);
                            middlewareInstancesStack.push(middlewareInstance);
                        } catch (err) {
                            this._logger.error('Failed to load middleware ' + middleware, err);
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
            return middlewareInstancesStack;
        }
    }]);

    return MiddlewareLoader;
}();

exports.default = MiddlewareLoader;