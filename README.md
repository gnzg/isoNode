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
<li>Map rotation via the R key
</li>
</ul>

### Notes for further development

It is possible to test newly introduced actions via the browser console as they are available via the window object. E.g. `window.store.dispatch('renderTiles');` 

### License

isoNode is licensed under GNU AGPLv3.
