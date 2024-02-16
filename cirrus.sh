#!/bin/bash

docker network prune
# take down any current services
docker-compose down --remove-orphans

# rebuild all
sudo docker-compose build

# start all docker services
sudo docker-compose up