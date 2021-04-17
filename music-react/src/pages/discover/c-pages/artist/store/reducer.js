import {Map} from 'immutable'

import * as actionTypes from './constants';

const defaultState = Map({
  artists: []
})

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case actionTypes.CHANGE_ARTISTS:
      return state.set("artists", action.artists)
    default:
      return state;
  }
}

export default reducer