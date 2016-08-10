#!/bin/bash

set -e -x

pushd osusume-js
  pwd
  echo inside osusume-js
  ls -la
  cd ..
  echo inside root dir
  ls-la
popd