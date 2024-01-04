#!/bin/bash

# take down any current services
docker compose down

# rebuild all
sudo docker compose build

# start all docker services
sudo docker compose up