import {Map} from 'immutable'

import * as actionTypes from './constants';

const defaultState = Map({
  topBanners: [],
  hotRecommend: [],
  newAlbum: [],
  topUpRanking: {},
  topNewRanking: {},
  topOriginRanking: {},
  topHotRanking: {}
})
const reducer = (state = defaultState, action) => {
  switch(action.type){
    case actionTypes.CHANGE_TOP_BNNAER:
      return state.set("topBanners", action.banners)
    case actionTypes.CHANGE_HOT_RECOMMEND:
      return state.set("hotRecommend", action.hotRecommend)
    case actionTypes.CHANGE_NEW_ALBUM:
      return state.set("newAlbum", action.newAlbum)
    case actionTypes.CHANGE_UP_RANKING:
      return state.set("topUpRanking", action.topUpRanking)
    case actionTypes.CHANGE_NEW_RANKING:
      return state.set("topNewRanking", action.topNewRanking)
    case actionTypes.CHANGE_ORIGIN_RANKING:
      return state.set("topOriginRanking", action.topOriginRanking)
    case actionTypes.CHANGE_HOT_RANKING:
      return state.set("topHotRanking", action.topHotRanking)
    default:
      return state;
  }
}

export default reducer