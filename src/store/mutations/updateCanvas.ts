import store from "../../store/index";
import drawTileLaterals from "../../maps/drawTileLaterals";
import drawTileTop from "../../maps/drawTileTop";
import Tile from "../../objects/tile";

// import debugOptions from '../../debugOptions';

export default () => {
  if (store.state.ctx) {
    let ctx = store.state.ctx;
    let { clearArea, map_tiles } = store.state.env;
    
    // clear entire canvas
    ctx.clearRect(...clearArea);

    // set new window boundaries
    store.state.env.winWidth = window.innerWidth;
    store.state.env.winHeight = window.innerHeight;
    store.dispatch('centerCanvas');

    // draw map
    if (map_tiles !== undefined && Array.isArray(map_tiles)) {
      for (let y = 0; y < map_tiles.length; y++) {
        // for each row
        for (let i = 0; i < store.state.maxTileHeight; i++) {
          // for each tile height
          for (let x = 0; x < map_tiles[y].length; x++) {
            // for each tile element
            drawTileLaterals(new Tile({ x, y, z: i }));
            drawTileTop(new Tile({ x, y, z: i }));
          }
        }
      }
    } else {
      console.error("no maps object found!");
    }
  } else {
    console.error("No ctx object found!");
  }
};