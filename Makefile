dev:
	npx nodemon --exec npx babel-node backend/bin/app.js

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

.PHONY: test
