import StateInterface from "../../interfaces/StateInterface";
import drawTileLaterals from "../../maps/drawTileLaterals";
import drawTileTop from "../../maps/drawTileTop";
import Tile from "../../objects/tile";

export default (state) => {

  if (!state.ctx) {
    console.error("No ctx object found!");
    return state;
  }

  let ctx : StateInterface["ctx"] = state.ctx;
  let { clearArea, map_tiles } = state.env;

  // clear entire canvas
  // @ts-ignore
  ctx.clearRect(...clearArea);

  // draw map
  if (map_tiles === undefined && Array.isArray(map_tiles)) {
    console.error("no maps object found!");
    return state;
  }

  for (let y = 0; y < map_tiles.length; y++) {
    // for each row
    for (let i = 0; i < state.maxTileHeight; i++) {
      // for each tile height
      for (let x = 0; x < map_tiles[y].length; x++) {
        // for each tile element
        drawTileLaterals(new Tile({ x, y, z: i }));
        drawTileTop(new Tile({ x, y, z: i }));
      }
    }
  }
  return state;
}
