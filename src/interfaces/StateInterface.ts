import PointInRhombus from "../math/PointInRhombus";
import { Point } from "../interfaces/Point";

export default interface State {
    ctx: CanvasRenderingContext2D;
    refreshFlag: any;
    refreshInterval: number;
    debug_mode: boolean;
    maxTileHeight: number;
    acceleration: number;
    cursor_pos_x: number;
    cursor_pos_y: number;
    map: Array<Array<number>>;
    map_data: {
        tileWidth: number;
        map_tiles: number[][];
        map_tiles_height: number[][];
        tileHitBoxes: Array<Point>;
        currentlyHoveredTile: Point;
        lastHoveredTile: Point;
        lastHoveredTileType: number;
        rectColors: Object;
        rectShadowColors: Object;
        clearArea: number[];
        rotationDegree: number;
        mapHitBox: { highestPoint: number; leftmostPoint: number };
        map_offset_x: number;
        map_offset_y: number;
        winWidth: number;
        winHeight: number;
    };
    keyMap: Object;
    cursorInMap: boolean;
}
