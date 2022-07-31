export default interface State {
    ctx: CanvasRenderingContext2D;
    debug_mode: boolean;
    maxTileHeight: number;
    acceleration: number;
    cursor_pos_x: number;
    cursor_pos_y: number;
    map: Array <Array<number>>;
    map_data: {
      tileWidth: number;
      map_tiles: number[][];
      map_tiles_height: number[][];
      tileHitBoxes: { x: number; y: number }[];
      currentlyHoveredTile: {
        x: number;
        y: number;
      },
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