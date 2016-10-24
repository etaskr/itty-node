import MiddlewareInterface from '../../../../src/middleware/middleware-interface';

class PoweredByMiddleware extends MiddlewareInterface {
    invoke(req, res, next) {
        res.header('X-Powered-By', 'itty');
        next();
    }
}