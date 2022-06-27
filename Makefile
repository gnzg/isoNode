# Make sure npm is installed first. Then, do
# npm install --global yarn
# once these prerequisites are in place, you can do use the 'make install' command.

install:
	yarn install

# supply desired port for dev server via e.g. PORT=1234
watch:
# if condition is met, the script will continue, otherwise it will exit
	$(shell ./isValidPort.sh ${PORT})
	npx webpack serve --port ${PORT} --hot --config ./webpack.config.js
