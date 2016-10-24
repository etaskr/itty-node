import ExceptionInterfaceType from '../exception/exception-interface-type';

class MiddlewareInterface {
    constructor() {
        if (this.constructor === MiddlewareInterface) {
            throw new ExceptionInterfaceType('Implementation is required');
        }
    }

    invoke(req, res, next) {
        throw new ExceptionInterfaceType(`Implementation is required ${req} ${res} ${next}`);
    }
}

export default MiddlewareInterface;
