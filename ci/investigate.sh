#!/bin/bash

set -e -x

pushd osusume-js
  pwd
  echo inside osusume-js
  ls -la
  cd built-osusume-js
  echo inside built-osusume-js
  ls-la
popd