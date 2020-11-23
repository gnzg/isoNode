# IsoNode

[![GitHub release](https://img.shields.io/github/v/tag/gnzg/isonode)](https://github.com/gnzg/isoNode/releases)
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
* Zoom (work in progress)
* A modular, easy to work with object-oriented approach

![isoNode](https://github.com/gnzg/isoNode/blob/master/example.png?raw=true)

### Installation

Install all dependencies via `npm install`.

### Run isoNode

To compile and watch the source code run `npm start` from project root directory. The development server will then be available via `localhost:1234`.

## Technical details
Currently, drawing is accomplished layer-wise: Assume we want our map to consist of three height levels - to do so we will create three arrays, each array for a separate height level. Each of these arrays resembles a distinct map layer. Each map layer consists of rows, where a single row is an array of integers, each resembling a tile configuration, which is currently merely the tile's color.

### Global actions

It is possible to test newly introduced actions via the browser console as they are available via the window object. E.g. `window.store.dispatch('refreshCanvas');` 


## Troubleshooting

If running into ambigious compilation errors, first try to rebuuld node-sass via `npm rebuild node-sass`

### Debug mode

Working on the map in debug mode is possible by setting the `debug_mode` property in the global state object to true, or toggling it in the browser console via `window.store.dispatch("toggleDebugMode");`

### License

isoNode is licensed under the MIT license.
