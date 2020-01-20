start:
	npx nodemon --exec npx babel-node backend/bin/app.js

build:
	rm -rf dist
	npm run build

install:
	npm i

test:
	npm test

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

init:
	make install && knex migrate:latest && knex seed:run

.PHONY: test
