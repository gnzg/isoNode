import PubSub from '../store/lib/pubsub';

export interface StoreInterface {
  status: string;
  events: PubSub;
  actions: any;
  mutations: any;
  state: {
    env: {
      tileWidth: number;
      map_tiles_height: number[][];
      tileHitBoxes: number[];
      lastHoveredTile: Object;
      lastHoveredTileType: number;
      rectColors: Object;
      rectShadowColors: Object;
      clearArea: number[];
      rotationDegree: number;
      map_offset_x: number;
      map_offset_y: number;
      winWidth: number;
      winHeight: number;
      ctx: any;
      map_tiles: number[][];
    };
  };
}
