import store from "../index";
import RhombusVertices from "../../math/RhombusVertices";
import Tile from "../../objects/tile.ts";

export default (state) => {
  let map = state.env.map_tiles;
 
  for (let y = 0; y < map.length; y++) {
    // j draws a row across the x axis
    for (let x = 0; x < map[y].length; x++) {
      // only if the tile is non-zero
      if (map[y][x] !== 0) {
        let tile = new Tile({ x, y });

        // establish coordinates for the four vertices of each rhombus
        let rhombusVertices = new RhombusVertices({ tile, x, y });
        state.env.tileHitBoxes.push({
          // rhombus vertices
          ...rhombusVertices,
          // coordinates respective to the maps object (for moving the map)
          x,
          y,
        });
      }
    }
    // make tileHitBoxes available for the console
    window.tileHitBoxes = store.state.env.tileHitBoxes;
  }
  return state;
};
