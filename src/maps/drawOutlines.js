export default (ctx, rhombusVertices) => {
    let { pointA, pointB, pointC, pointD } = rhombusVertices;
    
    ctx.beginPath();
    ctx.strokeStyle = "#197319";
    ctx.arc(pointB.x, pointB.y, 0, 0, 2 * Math.PI);
    ctx.arc(pointC.x, pointC.y, 0, 0, 2 * Math.PI);
    ctx.arc(pointD.x, pointD.y, 0, 0, 2 * Math.PI);
    ctx.arc(pointA.x, pointA.y, 0, 0, 2 * Math.PI);
    ctx.arc(pointB.x, pointB.y, 0, 0, 2 * Math.PI);
    ctx.stroke();
}