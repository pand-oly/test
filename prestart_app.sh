#!/bin/bash

printf "\n> Installing the backend\n"
backFolder="./backend"
cacheFolderBack="/tmp/backend-cache"
rm -rf $cacheFolderBack
npm_config_loglevel=silent npm i --prefix ${backFolder} --cache $cacheFolderBack

printf "\n Lifting containers\n"
npm run compose-up