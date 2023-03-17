#!/bin/bash

printf "\n> Installing the backend\n"
backFolder="./backend"
cacheFolderBack="/tmp/backend-cache"
rm -rf $cacheFolderBack
npm_config_loglevel=silent npm i --prefix ${backFolder} --cache $cacheFolderBack

printf "\n> Instalando o front-end\n"
frontFolder="./frontend"
cacheFolderFront="/tmp/frontend-cache"
rm -rf $cacheFolderFront
npm_config_loglevel=silent npm i --prefix ${frontFolder} --cache $cacheFolderFront
npm_config_loglevel=silent npm run build --prefix ${frontFolder} --cache $cacheFolderFront

printf "\n Lifting containers\n"
npm run compose-up