# ro4block
research objects in blockchain

Before starting this tutorial, follow the steps described in [Blockchain4openscience/hyperledger](https://github.com/Blockchain4openscience/hyperledger) to deploy the hyperledger business network and start the composer rest server

## Install CORS plugin

Initially, the authentication process in orcid is performed in the frontend directly until the rest server is modified to perform authentication . For this reason, is necessary to install a CORS plugin for web navigator, some options can be:

* [CORS everywhere](https://addons.mozilla.org/es/firefox/addon/cors-everywhere/) for firefox
* [Moesif Origin](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc) for chrome

## Deployment of Hyperledger Fabric onto a single-organization  

First we need to intall the version of node and npm that is compatible with composer and fabric.
`````
nvm install 8.9
`````
Follow *steps one and two* from the tutorial: 1-Starting a Hyperledger Fabric network; 2-Exploring the Hyperledger Fabric network.

In *step three* create a folder called `certificates` and follow the instructions:
3-Building a connection profile (copy the example connection profile) and save to the folder `connection.json`.

Follow *step four* to locate the certificate and private key for the Hyperledger Fabric administrator and copying these certificates in the file `certificates`. Note that these certificates change every time we boostrap the fabric network.

Navigate to the folder you just created and follow *step five*, creating a business network card for the Hyperledger Fabric administrator:
`````
composer card create -p connection.json -u PeerAdmin -c Admin@org1.example.com-cert.pem -k 114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk -r PeerAdmin -r ChannelAdmin
`````
Follow *step six* to import the business network card for the Hyperledger Fabric administrator,
`````
composer card import -f PeerAdmin@fabric-network.card
`````
In *step seven* we install the Hyperledger Composer business network onto the Hyperledger Fabric peer nodes. The business network `bforos` is defined in bna file, `bforos@0.0.1.bna` and its located in the repository. A forlder with the specific business network model files, scripts and queries that are packaged in the bna file (using `composer archive create`) is located in the [hyperledger repository](https://github.com/Blockchain4openscience/hyperledger/tree/master/bforos3). 
`````
composer network install -c PeerAdmin@fabric-network -a bforos@0.0.1.bna
`````
In *step eight* we start the blockchain business network
`````
composer network start --networkName bforos --networkVersion 0.0.1 -A admin -S adminpw -c PeerAdmin@fabric-network
`````
In *step nine* we import the business network card for the business network administrator
`````
composer card import -f admin@bforos.card
`````
In *step ten* we test the connection to the blockchain business network
`````
composer network ping -c admin@bforos
`````

## Interacting with the business network using the REST server 

To create the REST API using https run the following commands: 
`````
export COMPOSER_TLS=true
composer-rest-server -c admin@bforos -n never 
`````
use `admin@bforos` as the card name.

Launch your browser and go to the URL given http://localhost:3000/explorer for interacting with it. Rest server generates an endpoint for each participant, asset and transaction of the business network definition. Go to the business model to review all operations in the rest server. yo can use a api environment tool (e.g. Postman) to send Http Request to Hypeledger.

## Front-end based on Angular application

In order to build the user interfaces for this busness network please clone the repository and follow the instructions

`````
git clone https://github.com/Blockchain4openscience/B4OS-frontend
`````
Now navigate to the folder. Check that npm is installed by running
`````
npm -v
`````
otherwise run. Although npm might already be installed, re-intalling npm is important to update any dependencies.
`````
npm install
`````
Once the installation is complete run,
`````
npm start
`````
and navigate to `https://localhost:4200/`. The app will automatically reload if you change any of the source files. 

Once the app is loaded log-in with ORCID account, however since we are in the testing fase of the forntenbd application any user must be registered in the orcid sandbox. Create a user in the [sandbox](https://sandbox.orcid.org/). After the user is creatred you can access the frontend. 

Steps to use the application
* 1. Search in Github Repositories
* 2. Allow the application access to the elements of the user's repository.
* 3. The application must display all of the users repositories.
* 4. Under the user name at the far top-right yo can acces a view of the personal wallet with an initial endowment of 10 points.
* 5. Claim any of your repositories and update the wallet and the claim transaction will reflect a new balance on your wallet and emit an event related to the change in the wallet as a result of the claim transaction. 
* 6. You can access all of the claimed research object from the left tabs.


## Destroy a previous set up
After testing the bna desgined with Composer and deployed onto Fabric it is important to tidy up by stopping fabric. Navigate to the folder where you initially started the Hyperledger Fabric network.

`````
./stopFabric.sh
./teardownFabric.sh
`````
delete the composer cards
`````
composer card delete -c name
`````
delete the file sytem card store
`````
rm -fr ~/.composer
`````
and clear the docker cointainers.

`````
./teardownAllDocker.sh
`````
Select option 1- Kill and remove only the containers. Then delete the images created, 
`````
docker rmi $(docker images dev-* -q)
`````
