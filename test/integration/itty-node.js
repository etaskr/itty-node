import should from 'should';
import {createInstance} from '../../src/itty-node';

describe('Integration - IttyNode', () => {
    before((done) => {
        done();
    });

    after((done) => {
        done();
    });

    it('should create an itty node instance with the correct config and service directories', async() => {
        const ittyNode = createInstance(
            `${__dirname}/../app`
        );

        await ittyNode.start();

        const server = ittyNode.getServer();

        should.exist(server);
    });
});
