import StateInterface from '../../interfaces/StateInterface'
import pointInRhombus from '../../math/PointInRhombus'
import store from '../index'

// check whether cursor coordinates fall within saved hitboxes of non-empty tiles

export default (state: StateInterface, payload: MouseEvent) => {
    // initial check if required hitboxes exist
    if (state.map_data.tileHitBoxes.length <= 0) {
        store.dispatch('error', 'tileHitBoxes length is zero! Recreating...')
        store.dispatch('createTileHitBoxes')
    }

    let cursor_pos_x = payload.clientX
    let cursor_pos_y = payload.clientY
    let tileCoordinates = state.map_data.tileHitBoxes
    let lastHoveredTile = store.state.map_data.lastHoveredTile

    // TODO: re-write; current approach is expensive
    for (let i = 0; i < tileCoordinates.length; i++) {
        // if cursor is within a given tile's space
        if (
            pointInRhombus(tileCoordinates[i], {
                x: cursor_pos_x,
                y: cursor_pos_y,
            })
        ) {
            console.log('foo')

            // on initial run, save first hovered tile as lastHoveredTile
            // or, if currentlyHoveredTile does not correspond to the current tile coordinates, update the former
            store.state.map_data.currentlyHoveredTile = {
                x: tileCoordinates[i].x,
                y: tileCoordinates[i].y,
            }

            store.dispatch(
                'saveLastHoveredTile',
                store.state.map_data.currentlyHoveredTile
            )
            store.dispatch(
                'onTileHover',
                store.state.map_data.currentlyHoveredTile
            )
            store.dispatch('updateCanvas')

            // if currentlyHoveredTile is different than lastHoveredTile, unhover the former
            if (
                store.state.map_data.lastHoveredTile.x != tileCoordinates[i].x
            ) {
                store.state.map_data.currentlyHoveredTile = {
                    x: tileCoordinates[i].x,
                    y: tileCoordinates[i].y,
                }

                store.dispatch('onTileUnhover', state.map_data.lastHoveredTile)
                store.dispatch(
                    'onTileHover',
                    store.state.map_data.currentlyHoveredTile
                )
                store.dispatch('updateCanvas')
            }

            // only unhover lastHoveredTile if it was already set
            /*
      if (state.map_data.lastHoveredTile.x !== undefined) {
        store.dispatch("onTileUnhover", state.map_data.lastHoveredTile);
      }
      */

            // if hovering a new tile
            if (
                lastHoveredTile.x !== state.map_data.lastHoveredTile.x ||
                lastHoveredTile.y !== state.map_data.lastHoveredTile.y
            ) {
                store.dispatch('onTileUnhover', state.map_data.lastHoveredTile)

                //store.dispatch("onTileHover", lastHoveredTile);
                //store.dispatch("saveLastHoveredTile", lastHoveredTile);
                //store.dispatch("updateCanvas");
            }
        }
        // TODO: if mouse is outside of map -> calculate map size based on location and tile max length in both x,z axes
        /*else if (!pointInRhombus(tileCoordinates[i], { x: cursor_pos_x, y: cursor_pos_y })) {
      TODO: store.dispatch('info', 'cursor is outside of map!');
    }*/
    }
    payload.stopImmediatePropagation()
    return state
}
