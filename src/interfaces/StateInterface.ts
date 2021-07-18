export default interface State {
    ctx: CanvasRenderingContext2D;
    cooldown: boolean;
    debug_mode: boolean;
    maxTileHeight: number;
    acceleration: number;
    env: {
      tileWidth: number;
      map_tiles: number[][];
      map_tiles_height: number[][];
      tileHitBoxes: number[];
      lastHoveredTile: {
        x: number;
        y: number;
      };
      lastHoveredTileType: number;
      rectColors: Object;
      rectShadowColors: Object;
      clearArea: number[];
      rotationDegree: number;
      map_offset_x: number;
      map_offset_y: number;
      winWidth: number;
      winHeight: number;
    };
    keyMap: Object;
    cursorInMap: boolean;
  }