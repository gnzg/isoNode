# IsoNode

[![GitHub version](https://img.shields.io/github/manifest-json/v/gnzg/isonode/master)](/github/manifest-json/v/https://github.com/gnzg/isoNode)
[![GitHub license](https://img.shields.io/github/license/gnzg/isonode)](https://github.com/gnzg/isoNode/blob/master/LICENSE)

## Table of contents
* [Introduction](#introduction)
* [Features](#features)
* [Installation](#installation)
* [Source structure](#source-structure)
* [Troubleshooting](#troubleshooting)
* [FAQ](#faq)
* [License](#license)

## Introduction
IsoNode is an HTML5 Canvas isometric map engine, originally inspired by jsISO. It is gradually being translated into Typescript to ease maintenance and debugging.

## Features
* Hitbox logic per tile
* Keyboard map movement
* A state store, based on the publisher-subscriber pattern
* Debug mode

![isoNode](https://github.com/gnzg/isoNode/blob/master/example.png?raw=true)

## Installation

### Prerequisites
- GNU make utility
- nvm
- node.js v.14.x (Fermium, LTS)
- npm v.5+
- yarn

### Windows specific
- Chocolatey

To compile and watch the source code, the preferred method is to run `make watch PORT=<yourPORT>` from the project root directory. The development server will then be available via `localhost:<yourPORT>`.

## Source structure
The project source root is `app.ts`.

## Troubleshooting

### The dev server does not run due to a webpack related error
Make sure npm version 5+ is used by default via nvm. This can be done via the command `nvm alias default 14`

### Entering the debug mode
Working on the map in debug mode is possible by setting the `debug_mode` property in the global state object to true, or toggling it in the browser console via `window.store.dispatch("toggleDebugMode");`

### Testing new state-related actions
It is possible to test newly introduced actions via the browser console as they are available via the window object. E.g. `window.store.dispatch('updateCanvas');`
 
## FAQ

### How is TypeScript type checking set up in isoNode?
Static type checking is accomplished via the `typescript` and associated npm packages. During (dev server) runtime, Webpack takes care of *.ts file type checking. TypeScript compiler options are provided in `tsconfig.json`.

### How is drawing accomplished?
Currently, drawing is done layer-wise: Assume we want our map to consist of three height levels - to do so we will create three arrays, each array for a separate height level. Each of these arrays resembles a distinct map layer. Each map layer consists of rows, where a single row is an array of integers, each resembling a tile configuration, which is currently merely the tile's color.

## License

isoNode is licensed under the MIT license.
