# MauMau

## Server

### Setup

#### Node and NPM
Node and NPM have to be installed. Checkout node version manager if you haven't installed it yet.

#### Installing node modules

You will first need to install the node_modules by running:  
``
npm install
``

#### RethinkDB

You will need to have a running instance of rethinkdb to start the server. You can easily do that by using the docker image of rethinkdb running:  
``
docker run --name rethink -p 8080:8080 -p 28015:28015 -v "FOLDER_TO_STORE_DB:/data" -d rethinkdb
``

### Starting the server

*Please make sure that port 8000 is available.*  
To start the server run:
``
npm start
``