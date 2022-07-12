# Make sure nvm and npm version 5+ are installed first. 
# To install, do:
# nvm install Fermium --latest-npm

# node.js Fermium is the minimum LTS version required in this project for yarn to work
# Once the above is installed, do:
# npm install --global yarn

# once these steps are completed, you can use the 'make install' command to install dependencies.

install:
	yarn install

# dev server with optional custom port value via e.g. PORT=1234
watch:
# if all conditions are met, the script will continue, otherwise it will exit
	$(shell ./isValidPort.sh ${PORT})
	npx webpack serve --port ${PORT} --hot --config ./webpack.config.js
