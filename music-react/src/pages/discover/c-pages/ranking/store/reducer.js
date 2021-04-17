import {Map} from 'immutable'

import * as actionTypes from './constants';

const defaultState = Map({
  allRanking: [],
  currentRanking: {},
  currentRankingComment: []
})

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case actionTypes.CHANGE_ALL_RANKING:
      return state.set("allRanking", action.allRanking)
    case actionTypes.CHANGE_CURRENT_RANKING:
      return state.set("currentRanking", action.currentRanking)
    case actionTypes.CHANGE_RANKING_COMMENT:
      return state.set("currentRankingComment", action.currentRankingComment)
    default:
      return state;
  }
}

export default reducer