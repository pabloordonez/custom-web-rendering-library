#! /bin/bash

pushd ../../

npm i
npm run clean
npm run build:esm

cp ./dist/esm/library.d.ts ./examples/esm/
cp ./dist/esm/library.js ./examples/esm/
cp ./dist/esm/main.css ./examples/esm/

popd

npx serve