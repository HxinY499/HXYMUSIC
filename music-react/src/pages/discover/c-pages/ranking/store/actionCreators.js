import * as actionTypes from "./constants"
import { 
  getAllRanking
} from '@/services/ranking'
import { 
  getPlayList
} from '@/services/recommend'
import { 
  getComment
} from '@/services/player'

const changeAllRankingAction = (allRanking) => ({
  type: actionTypes.CHANGE_ALL_RANKING,
  allRanking
})

const changeCurrentRankingAction = (currentRanking) => ({
  type: actionTypes.CHANGE_CURRENT_RANKING,
  currentRanking
})

const changeRankingCommentAction = (currentRankingComment) => ({
  type: actionTypes.CHANGE_RANKING_COMMENT,
  currentRankingComment
})

export const getAllRankingAction = () => {
  return dispatch => {
    getAllRanking().then(res => {
      dispatch(changeAllRankingAction(res.list))
    })
  }
}

export const getCurrentRankingAction = (id) => {
  return dispatch => {
    getPlayList(id).then(res => {
      dispatch(changeCurrentRankingAction(res.playlist))
    })
    //评论  同歌单评论
    getComment(id, 15, "playlist").then(res => {
      dispatch(changeRankingCommentAction(res.comments))
    })
  }
}