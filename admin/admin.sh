#!/bin/bash

if [[ $EUID -ne 0 ]]; then
    echo "$0 must be ran as root. Try sudo"
    exit 1
fi

npm install

echo "Starting admin console..."

{
    npx tsx admin.ts
} || {
    echo "Error: you might not have node installed"
}


