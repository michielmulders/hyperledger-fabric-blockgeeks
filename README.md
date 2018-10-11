# Hyperledger Fabric Network boilerplate
This repo is a snippet of the fabcar [fabric sample](https://github.com/hyperledger/fabric-samples) with the basic network. It also includes our [fabric-node-chaincode-utils](https://github.com/wearetheledger/fabric-node-chaincode-utils) to test and develop nodejs chaincode. It contains a fabric network with 1 peer and 1 CA.

## Starting 
Before starting, you will need to pull all the images of Hyperledger fabric to your desktop and tag them as latest. You can use the following script to automate this process.
```bash
./scripts/bootstrap.sh [optional_custom_version]
```
Starting this network requires you to run following command. This will automatically setup your docker network using docker-compose and install your chaincode.
```bash
./scripts/startFabric.sh
```
