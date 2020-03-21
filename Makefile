dev:
	npm run start:dev

start:
	npm run start

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
	make install

migrate:
	npm run migrate

.PHONY: test
