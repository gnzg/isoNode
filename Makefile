run:
	npm run dev-sever

watch:
	npx webpack serve --port 1703 --env mode=dev --hot --config ./webpack.config.js
	echo "Serving dev server from port 1703"

generate-preview:
	echo "To do..."