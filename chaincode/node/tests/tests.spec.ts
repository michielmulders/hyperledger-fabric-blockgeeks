/* tslint:disable */

import { MyChaincode } from '../src/MyChaincode';
import { ChaincodeMockStub, Transform } from '@theledger/fabric-mock-stub';

import { expect } from "chai";

const chaincode = new MyChaincode();

let stubWithInit;

describe('Test MyChaincode', () => {

    it("Should init without issues", async () => {
        const stub = new ChaincodeMockStub("MyMockStub", chaincode);

        const response = await stub.mockInit("tx1", []);

        expect(response.status).to.eql(200)
    });

});