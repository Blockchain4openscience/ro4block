FROM ubuntu:16.04
MAINTAINER Sergio Cardona Melo  "chechocardona@gmail.com"
# install prerequisites for Hyperledger-Composer developer environment
RUN apt-get update
RUN apt-get install -y curl wget
RUN apt-get install -y software-properties-common
# Set up Working directory
WORKDIR /app
COPY . /app
RUN chmod u+x prereqs-ubuntu.sh
RUN ./prereqs-ubuntu.sh
## Set up development environment for Hyperledge-Composer
# 1. CLI tools
RUN npm install -g composer-cli@0.20
RUN npm install -g composer-rest-server@0.20
RUN npm install -g generator-hyperledger-composer@0.20
RUN npm install -g yo
# 2. Playground
RUN npm install -g composer-playground@0.20
# 3. Hyperledger Fabric
RUN mkdir fabric-dev-servers && cd fabric-dev-servers
RUN curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
RUN tar -xvf fabric-dev-servers.tar.gz
## Starting REST server
RUN export FABRIC_VERSION=hlfv12
RUN ./stopFabric.sh
RUN ./teardownFabric.sh
RUN ./downloadFabric.sh
RUN ./startFabric.sh
RUN rm -fr ../../.composer
RUN mkdir certificates
RUN cp fabric-scripts/hlfv12/composer/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem ../certificates
RUN cp fabric-scripts/hlfv12/composer/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk ../certificates/
RUN cd ../certificates
RUN composer card create -p connection.json -u PeerAdmin -c Admin@org1.example.com-cert.pem -k 114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk -r PeerAdmin -r ChannelAdmin
RUN composer card import -f PeerAdmin@fabric-network.card
RUN composer network install -c PeerAdmin@fabric-network -a /app/bforos@0.0.1.bna
RUN composer network start --networkName bforos --networkVersion 0.0.1 -A admin -S adminpw -c PeerAdmin@fabric-network
RUN composer card import -f admin@bforos.card
RUN export COMPOSER_TLS=true
RUN composer-rest-server -c admin@bforos -n never
EXPOSE 3000
EXPOSE 4200
# Start frontend
CMD ["npm" , "start"]