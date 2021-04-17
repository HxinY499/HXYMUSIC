import {Map} from 'immutable'

import * as actionTypes from './constants';

const defaultState = Map({
  allCategory: {},
  currentPlaylists: {}
})

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case actionTypes.CHANGE_ALL_CATEGORY:
      return state.set("allCategory", action.allCategory)
    case actionTypes.CHANGE_CURRENT_PLAYLISTS:
      return state.set("currentPlaylists", action.currentPlaylists)
    default:
      return state;
  }
}

export default reducer