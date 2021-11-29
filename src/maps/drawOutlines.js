import state from '../store/state';
import colors from '../utilities/colors';

export default ({ctx, rhombusVertices, x, y}) => {
    let { pointA, pointB, pointC, pointD } = rhombusVertices;
    
    // only draw placeholder if the current tile is non-zero 
    if (state.env.map_tiles[y][x] !== 0) {
        ctx.beginPath();
        ctx.strokeStyle = colors.debug.outlines;
        ctx.arc(pointB.x, pointB.y, 0, 0, 2 * Math.PI);
        ctx.arc(pointC.x, pointC.y, 0, 0, 2 * Math.PI);
        ctx.arc(pointD.x, pointD.y, 0, 0, 2 * Math.PI);
        ctx.arc(pointA.x, pointA.y, 0, 0, 2 * Math.PI);
        ctx.arc(pointB.x, pointB.y, 0, 0, 2 * Math.PI);
        ctx.stroke();
    }
}