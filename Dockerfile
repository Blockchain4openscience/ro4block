FROM ubuntu:16.04
MAINTAINER Sergio Cardona Melo  "chechocardona@gmail.com"
# install prerequisites for Hyperledger-Composer developer environment
RUN apt-get update && apt-get install -y curl wget \
    #-y software-properties-common \
    -y build-essential \
    #libssl-dev && \
    #apt-add-repository -y ppa:git-core/ppa && \
    #apt-get update && apt-get install -y git \
    -y python-minimal \
    -y sudo \
    -y unzip
# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.12.0

# install node and npm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash && \
    source $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
 
    #-y apt-transport-https ca-certificates && \
# Add Docker repository key to APT keychain
    #curl -fsSL https://download.docker.com/linux/ubuntu/gpg |  apt-key add - && \
# Update where APT will search for Docker Packages
    #echo "deb [arch=amd64] https://download.docker.com/linux/ubuntu xenial stable" | \
    #tee /etc/apt/sources.list.d/docker.list \
    #&& apt-get update \ 
    #&& apt-cache policy docker-ce \
    #&& apt-get -y install docker-ce \
    #&& usermod -aG docker $(whoami) \
    #&& curl -L "https://github.com/docker/compose/releases/download/1.13.0/docker-compose-$(uname -s)-$(uname -m)" \
    #-o /usr/local/bin/docker-compose \
    #&& chmod +x /usr/local/bin/docker-compose \
# add user
RUN adduser --disabled-password --gecos '' user && \
    adduser user sudo && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers 
USER user
RUN sudo npm install -g --unsafe-perm composer-cli@0.20 && \
    sudo npm install -g --unsafe-perm composer-rest-server@0.20 && \
    sudo npm install -g --unsafe-perm generator-hyperledger-composer@0.20  && \
    sudo npm install -g --unsafe-perm composer-playground@0.20
# Set up Working directory
WORKDIR /app
COPY . /app

#RUN export FABRIC_VERSION=hlfv12 && \
 #   ./stopFabric.sh && \
#    ./teardownFabric.sh && \
#    ./downloadFabric.sh && \
#    ./startFabric.sh && \
#    rm -fr ~/.composer && \
 #   cd certificates && \
 #   composer card create -p connection.json -u PeerAdmin -c Admin@org1.example.com-cert.pem -k 114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk -r PeerAdmin -r ChannelAdmin && \
 #   composer card import -f PeerAdmin@fabric-network.card && \
 #   composer network install -c PeerAdmin@fabric-network -a /app/bforos@0.0.1.bna && \
  #  composer network start --networkName bforos --networkVersion 0.0.1 -A admin -S adminpw -c PeerAdmin@fabric-network && \
#    composer card import -f admin@bforos.card && \
 #   export COMPOSER_TLS=true && \
 #   composer-rest-server -c admin@bforos -n never

#RUN apt-get -y install apt-transport-https ca-certificates
# Add Docker repository key to APT keychain
#RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg |  apt-key add -

