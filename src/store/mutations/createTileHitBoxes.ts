import { Rhombus } from "../../interfaces/Rhombus";
import RhombusVertices from "../../classes/RhombusVertices";
import Tile from "../../classes/tile";

export default (state) => {
    let map: Array<Array<number>> = state.map_data.map_tiles;

    // y draws a row across the y axis
    for (let y = 0; y < map.length; y++) {
        // x draws a row across the x axis
        for (let x = 0; x < map[y].length; x++) {
            // only if the tile is non-zero
            if (map[y][x] !== 0) {
                let tile: Tile = new Tile({ x, y });

                // establish coordinates for the four vertices of each rhombus
                let rhombusVertices: Rhombus = new RhombusVertices({ tile, x, y });
                state.map_data.tileHitBoxes.push({
                    ...rhombusVertices,
                    // coordinates respective to the maps object (for moving the map)
                    x,
                    y,
                });
            }
        }
    }
    return state;
};
