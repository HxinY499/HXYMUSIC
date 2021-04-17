import {Map} from 'immutable'

import * as actionTypes from './constants';

const defaultState = Map({
  allAlbums: {},
  hotAlbums: []
})

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case actionTypes.CHANGE_ALL_ALBUMS:
      return state.set("allAlbums", action.allAlbums)
    case actionTypes.CHANGE_HOT_ALBUMS:
      return state.set("hotAlbums", action.hotAlbums)
    default:
      return state;
  }
}

export default reducer