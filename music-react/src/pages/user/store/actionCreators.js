import * as actionTypes from "./constants"
import { getSongDetail } from '@/services/player'

export const changeLoginUserAction = (user) => {
  return {
    type: actionTypes.CHANGE_LOGIN_USER,
    user
  }
}

export const changeShowUserAction = (user) => {
  return {
    type: actionTypes.CHANGE_SHOW_USER,
    user
  }
}

export const changeShowUserFocusAction = (focus) => ({
  type: actionTypes.CHANGE_FOCUS,
  focus
})

export const changeShowUserFansAction = (fans) => ({
  type: actionTypes.CHANGE_FANS,
  fans
})

const changeLikeSongsAction = (likeSongs) => ({
  type: actionTypes.CHANGE_LIKE_SONGS,
  likeSongs
})

export const getLikeSongsAction = (likeIds) => {
  return dispatch => {
    getSongDetail(likeIds).then(res=>{
      dispatch(changeLikeSongsAction(res.songs))
    })
  }
}