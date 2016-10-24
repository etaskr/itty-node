import ExceptionInterfaceType from '../exception/exception-interface-type';

class RouteInterface {
    constructor() {
        if (this.constructor === RouteInterface) {
            throw new ExceptionInterfaceType('Implementation is required');
        }
    }

    /**
     * @return {String}
     */
    getController() {
        throw new ExceptionInterfaceType('Implementation is required getController');
    }

    /**
     * @return {String}
     */
    getEndpoint() {
        throw new ExceptionInterfaceType('Implementation is required getEndpoint');
    }

    /**
     * @return {String}
     */
    getAction() {
        throw new ExceptionInterfaceType('Implementation is required getAction');
    }

    /**
     * @return {String}
     */
    getMethod() {
        throw new ExceptionInterfaceType('Implementation is required getMethod');
    }
}

export default RouteInterface;
