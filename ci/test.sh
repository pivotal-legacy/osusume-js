#!/bin/bash

set -e -x

pushd osusume-js
  npm install
  npm test
  npm run build
  pwd
  ls -la
  cd ..
  ls -la
popd

cp -rf ./osusume-js/built-osusume-js ./built-osusume-js