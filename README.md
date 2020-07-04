# IsoNode
IsoNode is inspired by jsISO but has a dedicated state management engine implemented via the publisher-subscriber pattern. as a single source of truth for easy scale up. It offers map rotation, keyboard map repositioning, zoom (work in progress) and a modular, easy to work with object-oriented approach as well as the comfort of a more timely development framework.

![isoNode](https://github.com/gnzg/isoNode/blob/master/example.png?raw=true)

### Installation

Install all dependencies via `npm install`. Remove `package-lock.json` if reinstalling depedencies.

### Run isoNode

To compile and watch the source code run `npm start` from project root. The dev server will then be available via `localhost:1234`.

### Features

<ul>
<li>Multi-key map navigation. Currently A,W,S,D keys are the default navigation keys
</li>
<li>Map rotation via the SPACE key
</li>
</ul>

### How is the isometric map drawn?
Currently, drawing is accomplish layerwise: Assume we want our map to consist of three height levels - to do so we will create three arrays, each array for a separate height level. Each of these arrays resembles a distinct map layer. Each map layer consists of rows, where a single row is an array of integers, each resembling a tile configuration, which is currently merely the tile's color.


### Easing further development

It is possible to test newly introduced actions via the browser console as they are available via the window object. E.g. `window.store.dispatch('refreshCanvas');` 

### Debug mode

Working on the map in debug mode is possible by setting the debug_mode property in the global state object to true, or toggling it via the browser console via `window.store.dispatch("toggleDebugMode");`

### Misc

If running into ambigious compilation errors, first try to rebuuld node-sass via `npm rebuild node-sass`

### License

isoNode is licensed under the MIT license.
