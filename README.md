# IsoNode

[![GitHub version](https://img.shields.io/github/manifest-json/v/gnzg/isonode/master)](/github/manifest-json/v/https://github.com/gnzg/isoNode)
[![GitHub license](https://img.shields.io/github/license/gnzg/isonode)](https://github.com/gnzg/isoNode/blob/master/LICENSE)

## Table of contents
* [Generics](#generics)
* [Features](#features)
* [Setup](#setup)
* [Debugging](#debugging)
* [Misc](#misc)
* [License](#license)

## Generics
IsoNode is an HTML5 Canvas isometric map engine, originally inspired by jsISO. It is gradually being translated into Typescript to ease maintenance and debugging.

## Features
* Hitbox logic per tile
* Keyboard map movement
* A state store, based on the publisher-subscriber pattern
* Debug mode

![isoNode](https://github.com/gnzg/isoNode/blob/master/example.png?raw=true)

## Installation

### prerequisites
- nvm
- node.js v.14.x (Fermium, LTS)
- yarn

### UNIX specific
Install all dependencies via `make install`. Yarn is used under the hood.

### Windows specific
- Chocolatey
- GNU make 4.3

To compile and watch the source code, the preferred method is to run `make watch PORT=<yourPORT>` from the project root directory. The development server will then be available via `localhost:<yourPORT>`.

## Debugging
Working on the map in debug mode is possible by setting the `debug_mode` property in the global state object to true, or toggling it in the browser console via `window.store.dispatch("toggleDebugMode");`

It is possible to test newly introduced actions via the browser console as they are available via the window object. E.g. `window.store.dispatch('updateCanvas');`

If running into ambigious compilation errors, first try to rebuuld node-sass via `npm rebuild node-sass`

## Misc 
### How is drawing accomplished?
Currently, drawing is done layer-wise: Assume we want our map to consist of three height levels - to do so we will create three arrays, each array for a separate height level. Each of these arrays resembles a distinct map layer. Each map layer consists of rows, where a single row is an array of integers, each resembling a tile configuration, which is currently merely the tile's color.

## License

isoNode is licensed under the MIT license.
