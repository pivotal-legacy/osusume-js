# osusume-js

- `npm install`
- `npm test`
- `npm start`

## End-to-end tests

### Start client:
- `npm start`

### Run tests
- ./run-e2e-test.sh

## The first time setting up End-to-end tests
### If you need the selenium standalone server selenium (only when setting up the machine)
- `cd e2e-test`
- `curl -O http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.0.jar`

### npm install for e2e-test
- `cd e2e-test`
- `npm install`

## Deploy
- `npm run deploy`

## If you add a new Pivotal UI CSS component

Make sure you run the following command to have your new component compiled into the components.css
- dr-frankenstyle ./src/scss/
