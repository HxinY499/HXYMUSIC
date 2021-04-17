import * as actionTypes from "./constants"
import { 
  getTopBanner,
  getHotRecommend,
  getNewAlbum,
  getPlayList
} from '@/services/recommend'

const changeBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BNNAER,
  banners: res.banners
})

const changeHotRecommendAction = (res) => {
  return {
    type: actionTypes.CHANGE_HOT_RECOMMEND,
    hotRecommend: res.result
  }
}

const changeNewAlbumAction = (res) => {
  return {
    type: actionTypes.CHANGE_NEW_ALBUM,
    newAlbum: res.albums
  }
}

const changeUpRankingAction = (res) => {
  return {
    type: actionTypes.CHANGE_UP_RANKING,
    topUpRanking: res.playlist
  }
}

const changeNewRankingAction = (res) => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  topNewRanking: res.playlist
})

const changeOriginRankingAction = (res) => ({
  type: actionTypes.CHANGE_ORIGIN_RANKING,
  topOriginRanking: res.playlist
})

const changeHotRankingAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RANKING,
  topHotRanking: res.playlist
})

export const getBannerAction = () => {
  return dispatch => {
    getTopBanner().then(res => {
      dispatch(changeBannerAction(res));
    })
  }
}

export const getHotRecommendAction = (limit) => {
  return dispatch => {
    getHotRecommend(limit).then(res => {
      dispatch(changeHotRecommendAction(res))
    })
  }
}

export const getNewAlbumAction = (limit) => {
  return dispatch => {
    getNewAlbum(limit).then(res => {
      dispatch(changeNewAlbumAction(res))
    })
  }
}

export const getTopListAction = (id) => {
  return dispatch => {
    getPlayList(id).then(res => {
      switch (id) {
        case 3779629:
          dispatch(changeNewRankingAction(res));
          break;
        case 2884035:
          dispatch(changeOriginRankingAction(res));
          break;
        case 19723756:
          dispatch(changeUpRankingAction(res));
          break;
        case 3778678:
          dispatch(changeHotRankingAction(res));
          break;
        default:
          console.log("其他数据处理");
      }
    })
  }
}