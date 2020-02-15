start:
	npm run start:dev

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

.PHONY: test
