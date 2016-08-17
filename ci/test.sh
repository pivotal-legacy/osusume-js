#!/bin/bash

set -e -x

pushd osusume-js
  npm install
  npm test
  npm run build
popd

cp -rf ./osusume-js/dist ./built-osusume-js