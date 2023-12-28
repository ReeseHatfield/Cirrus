#!/bin/bash

if [[ $EUID -ne 0 ]]; then
    echo "$0 must be ran as root. Try sudo"
    exit 1
fi


echo "Starting admin console..."


# run in interact mode for cli
docker build -t admin-cli .

# run in interactivity mode
# 6380 bc 6379 already runs redis on "host"
docker run -it -p 6380:6379 admin-cli


