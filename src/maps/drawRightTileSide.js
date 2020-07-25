import heightMap from '../maps/tileHeightMap';
import state from '../store/state';

export default ({tile, mapX, y, x, d, c}) => {
    
    let ctx = state.ctx;
    let map = state.env.map;

    // right
    // draw only if suceeded by an empty tile on the y axis,
    // or if iterating over the last y element
    if (
        (map[y + 1] !== undefined
        && map[y + 1][x] === 0) 
        || 
        (map[y + 1] !== undefined
        && heightMap[y + 1][x] !== undefined
        && heightMap[y + 1][x] < heightMap[y][x]) 
        ||
        y === map.length-1
    ) {
        // if there is a previous row, and if the height of tile x at previous row is larger, draw the current right
        // tile side above the existing canvas
        if ((heightMap[y - 1] !== undefined
            && heightMap[y][x] < heightMap[y - 1][x])
            //||
            //(heightMap[y - 1] !== undefined
            //    && heightMap[y][x] < heightMap[y - 1][x])
            )
        {
            ctx.globalCompositeOperation = 'source-over';
        }
        else {
            ctx.globalCompositeOperation = 'destination-over';
        }
        ctx.beginPath();

        let sideHeight = heightMap[y][x] !== 0 ? (20 / heightMap[y][x]) : 0;
        
        // upper left corner of tile
        ctx.moveTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth * 2, c + tile.tileWidth * y + d - y * tile.tileWidth * 0.5 - tile.tileYoffset );
        // lower left corner of tile
        ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth * 2, c + tile.tileWidth * y + tile.tileWidth + tile.tileWidth * 1.75 - y * tile.tileWidth * 0.5 - tile.tileYoffset - sideHeight);
        // lower right corner of tile
        ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * y + tile.tileWidth + tile.tileWidth * 1.75 + tile.tileWidth * 0.5 - y * tile.tileWidth * 0.5 - tile.tileYoffset - sideHeight);
        // upper right corner of tile
        ctx.lineTo(tile.tileWidth * y + mapX + tile.tileWidth * x + tile.tileWidth, c + tile.tileWidth * y + d + tile.tileWidth * 0.5 - y * tile.tileWidth * 0.5 - tile.tileYoffset);
        
        ctx.closePath();
        ctx.fillStyle = tile.fillColor;
        ctx.fill();
    }
}