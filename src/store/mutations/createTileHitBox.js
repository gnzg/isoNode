export default (state, payload) => {
    let x = payload.x;
    let y = payload.y;
    let rhombusVertices = payload.rhombusVertices;
    
console.log('X', x, 'Y', y, rhombusVertices);

    if(state.env.map[y][x] !== 0) {
        state.env.tileHitBoxes.push({ 
          // rhombus vertices
          ...rhombusVertices,
          // coordinates respective to the maps object (for moving the map)
          x,
          y
        });
      }
}