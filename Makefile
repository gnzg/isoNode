SHELL=/bin/bash #YMMV

install:
	yarn install

# supply desired port for dev server via e.g. PORT=1234
watch:
	@echo Serving dev server from port $(PORT)
	npx webpack serve --port $(PORT) --env mode=dev --hot --config ./webpack.config.js

generate-preview:
	echo "To do..."