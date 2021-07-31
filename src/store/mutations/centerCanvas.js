import Store from "../index";

export default function (state) {
  if (state.env.map_tiles !== undefined && Array.isArray(state.env.map_tiles)) {
    // set new window boundaries
    //store.state.env.winWidth = window.innerWidth;
    //store.state.env.winHeight = window.innerHeight;

    let mapCenter = (state.env.map_tiles.length / 2) * state.env.tileWidth * 2.3;
    state.env.map_offset_x = state.env.winWidth / 2 - mapCenter;
    state.env.map_offset_y = state.env.winHeight / 2;

    return state;
  }
  Store.dispatch("error", "Invalid state.env.map_tiles value!");
}
