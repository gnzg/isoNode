import loadImg from './loadImg';

// Create the isometric scope.
// Tutorial Note: Wrapping all our code within a function this way means all
// our variables and functions don't become globals. This prevents conflicts if you're using other scripts.
const isometric = () => {
  console.log('hello');
  // Two Dimensional Array storing our isometric map layout. Each number represents a tile.
  let map = [
    [1, 0, 0, 0],
   [1, 0, 0, 1],
   [0, 0, 1, 1],
  [1, 1, 1, 1]
  ];

  let tileGraphicsToLoad = ["./src/water.png", "./src/land.png"];

  function init() {
    // Remove Event Listener and load images.
    //isometric.removeEventListener('load', init);
    loadImg(tileGraphicsToLoad, map);
  };

  // Add Event Listener to detect when page has fully loaded.
  //isometric.addEventListener('load', init, false);
  init();
};

isometric();