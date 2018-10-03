import { Chaincode, Helpers, NotFoundError, StubHelper } from '@theledger/fabric-chaincode-utils';
import * as Yup from 'yup';

export class MyChaincode extends Chaincode {

    async initLedger(stubHelper: StubHelper, args: string[]) {

        let cars = [{
            make: 'Toyota',
            model: 'Prius',
            color: 'blue',
            owner: 'Tomoko'
        }, {
            make: 'Ford',
            model: 'Mustang',
            color: 'red',
            owner: 'Brad'
        }, {
            make: 'Hyundai',
            model: 'Tucson',
            color: 'green',
            owner: 'Jin Soo'
        }, {
            make: 'Volkswagen',
            model: 'Passat',
            color: 'yellow',
            owner: 'Max'
        }, {
            make: 'Tesla',
            model: 'S',
            color: 'black',
            owner: 'Adriana'
        }, {
            make: 'Peugeot',
            model: '205',
            color: 'purple',
            owner: 'Michel'
        }, {
            make: 'Chery',
            model: 'S22L',
            color: 'white',
            owner: 'Aarav'
        }, {
            make: 'Fiat',
            model: 'Punto',
            color: 'violet',
            owner: 'Pari'
        }, {
            make: 'Tata',
            model: 'Nano',
            color: 'indigo',
            owner: 'Valeria'
        }, {
            make: 'Holden',
            model: 'Barina',
            color: 'violet',
            owner: 'Shotaro'
        }];

        for (let i = 0; i < cars.length; i++) {
            const car: any = cars[i];

            car.docType = 'car';
            //car.key = `CAR${i}`;
            await stubHelper.putState('CAR' + i, car);
            this.logger.info('Added <--> ', car);
        }
    }

    async queryCar(stubHelper: StubHelper, args: string[]): Promise<any> {
        
        const verifiedArgs = await Helpers.checkArgs<{ key: string }>(args[0], Yup.object()
            .shape({
                key: Yup.string().required(),
            }));

        const car = await stubHelper.getStateAsObject(verifiedArgs.key);
        if (!car) {
            throw new NotFoundError('Car does not exist');
        }

        return car;
    }
     
    async createCar(stubHelper: StubHelper, args: string[]) {
        const verifiedArgs = await Helpers.checkArgs<any>(args[0], Yup.object()
            .shape({
                key: Yup.string().required(),
                make: Yup.string().required(),
                model: Yup.string().required(),
                color: Yup.string().required(),
                owner: Yup.string().required(),
            }));

        let car = {
            docType: 'car',
            make: verifiedArgs.make,
            model: verifiedArgs.model,
            color: verifiedArgs.color,
            owner: verifiedArgs.owner, 
            key: verifiedArgs.key,
        };

        await stubHelper.putState(verifiedArgs.key, car);
    }

    async queryAggregatedCar(stubHelper: StubHelper, args: string[]): Promise<any> {
        
        const verifiedArgs = await Helpers.checkArgs<{ key: string }>(args[0], Yup.object()
            .shape({
                key: Yup.string().required(),
            }));

        let publicCar = await stubHelper.getStateAsObject(verifiedArgs.key);
        if (!publicCar) {
            throw new NotFoundError('Car does not exist');
        }

        let privateCar = await stubHelper.getStateAsObject(
            verifiedArgs.key, 
            {privateCollection: 'privateCarCollection'}
        );

        const car = {
            ...publicCar,
            ...privateCar
        };

        return car;
    }

    async createPrivateCar(stubHelper: StubHelper, args: string[]) {
        const verifiedArgs = await Helpers.checkArgs<any>(args[0], Yup.object()
            .shape({
                key: Yup.string().required(),
                address: Yup.string().required(),
                owner: Yup.string().required(),
            }));

        let car = {
            docType: 'privateCar',
            address: verifiedArgs.address,
            owner: verifiedArgs.owner, 
            key: verifiedArgs.key,         
        };

        await stubHelper.putState(
            verifiedArgs.key, 
            car, 
            {privateCollection: 'privateCarCollection'}
        );
    }
}