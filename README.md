# IsoNode

[![GitHub version](https://img.shields.io/github/manifest-json/v/gnzg/isonode/master)](/github/manifest-json/v/https://github.com/gnzg/isoNode)
[![GitHub license](https://img.shields.io/github/license/gnzg/isonode)](https://github.com/gnzg/isoNode/blob/master/LICENSE)

## Table of contents
* [Introduction](#introduction)
* [Technical details](#technical-details)
* [Troubleshooting](#troubleshooting)
* [License](#license)

## Introduction
IsoNode is an HTML5 isometric map engine, originally inspired by jsISO.

### Features
* A state store implemented via the publisher-subscriber pattern
* Keyboard map movement
* A Debug mode
* A modular, easy to work with object-oriented approach

![isoNode](https://github.com/gnzg/isoNode/blob/master/example.png?raw=true)

## Installation
Install all dependencies via `yarn install`.

## Run isoNode
To compile and watch the source code, the preferred method is to run `make watch PORT=<yourPORT>` from the project root directory. The development server will then be available via `localhost:<yourPORT>`.

## How is drawing accomplished?
Currently, drawing is done layer-wise: Assume we want our map to consist of three height levels - to do so we will create three arrays, each array for a separate height level. Each of these arrays resembles a distinct map layer. Each map layer consists of rows, where a single row is an array of integers, each resembling a tile configuration, which is currently merely the tile's color.

## Global actions
It is possible to test newly introduced actions via the browser console as they are available via the window object. E.g. `window.store.dispatch('refreshCanvas');` 

## Debug mode
Working on the map in debug mode is possible by setting the `debug_mode` property in the global state object to true, or toggling it in the browser console via `window.store.dispatch("toggleDebugMode");`


## Troubleshooting
If running into ambigious compilation errors, first try to rebuuld node-sass via `npm rebuild node-sass`

## License

isoNode is licensed under the MIT license.
