import ExceptionInterfaceType from '../exception/exception-interface-type';

class ControllerInterface {
    constructor() {
        if (this.constructor === ControllerInterface) {
            throw new ExceptionInterfaceType('Implementation is required');
        }
    }
}

export default ControllerInterface;
