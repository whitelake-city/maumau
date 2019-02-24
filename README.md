# MauMau

Please note that this is a teaching project and not supposed to be put into any prodcution like environment.
Be also aware of the fact that large parts of the frontend are written in German, as the lessons were given in German.
The directory `browser` already includes the complete finished game. If you are looking for the lessons go to the lessons project https://github.com/whitelake-city/maumaulessons. 

## Server

### Setup

#### Node and NPM
Node and NPM have to be installed. Checkout node version manager if you haven't installed it yet.

#### Installing node modules

You will first need to install the node_modules by running:  
``
npm install
``
from the folder `/server`
#### RethinkDB

You will need to have a running instance of rethinkdb to start the server. You can easily do that by using the docker image of rethinkdb running:
``
docker run --name rethink -p 8080:8080 -p 28015:28015 -v "FOLDER_TO_STORE_DB:/data" -d rethinkdb
``
where `FOLDER_TO_STORE` is the absolute path to any folder on your mashine. If you don't have docker installed please to do so first by following the instructions given on the https://www.docker.com/get-started or by running the script from https://get.docker.com/

### Starting the server

*Please make sure that port 8000 is available.*  
To start the server run from inside the `server` directory:
``
npm start
``

## Client

To start the client go to the folder `browser` and run `npm install` followed by `npm start`. consecutive starts don't require to run install again. 
