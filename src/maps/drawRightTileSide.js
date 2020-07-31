import heightMap from '../maps/tileHeightMap';
import state from '../store/state';

export default ({tile, x, y}) => {
    
    let ctx = state.ctx;
    let map = state.env.map;
    let mapX = state.env.mapX;
    let mapY = state.env.mapY;
    let c = mapY - tile.tileWidth * x * 0.5;
    let d = tile.tileWidth * 1.5;
    
    // right
    if (
        // draw if not last row and the next row's tiles are zero
        (map[y + 1] !== undefined
            && map[y + 1][x] === 0) 
            ||
            // if not last row and next row's tiles' heightmap is not undefined and greater than current tile's height map
            (map[y + 1] !== undefined 
                && heightMap[y + 1][x] !== undefined
                && heightMap[y + 1][x] < heightMap[y][x]) 
                ||
                // if last row
                y === map.length-1
                ) {
                    ctx.globalCompositeOperation = 'source-over';
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