#! /bin/bash

pushd ../../

npm i
npm run build

cp ./dist/esm/library.js ./examples/esm/
cp ./dist/esm/main.css ./examples/esm/

popd

npx serve