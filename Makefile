install:
	@npm install

deploy:
	@npm run-script build
	@npm run-script deploy

test:
	@npm test

start:
	@npm start

.PHONY: test
