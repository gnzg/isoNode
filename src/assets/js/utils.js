export let centerCanvas = ({winWidth, winHeight, map, tileH}) => {
  let centered = 0;
  let mapCenter = map.length/2 *tileH*2.3;
  centered = winWidth/2-mapCenter;
  // console.log('winWidth', winWidth, 'centered', mapCenter);
  return centered;
};