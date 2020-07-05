export default (ctx, rhombusVertices) => {
    let { pointA, pointB, pointC, pointD } = rhombusVertices;
    ctx.beginPath();
    ctx.arc(pointA.x, pointA.y, 1, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(pointB.x, pointB.y, 1, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(pointC.x, pointC.y, 1, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(pointD.x, pointD.y, 1, 0, 2 * Math.PI);
    ctx.stroke();
}