# Make sure npm and nvm are installed first. Then, do
# npm install --global yarn

# Currently, the yarn version used in this project relies on node v.14.x (Fermium, LTS)
# As a result, to use yarn, the above must be installed. This can be done via:
# 'nvm install Fermium'
# once these prerequisites are in place, you can use the 'make install' command.

install:
	yarn install

# supply desired port for dev server via e.g. PORT=1234
watch:
# if condition is met, the script will continue, otherwise it will exit
	$(shell ./isValidPort.sh ${PORT})
	npx webpack serve --port ${PORT} --hot --config ./webpack.config.js
