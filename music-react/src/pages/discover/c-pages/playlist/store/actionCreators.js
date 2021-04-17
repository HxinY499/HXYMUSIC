import * as actionTypes from "./constants"
import { 
  getAllCategory,
  getCurrentPlaylists
} from '@/services/playlist'

const changeAllCategoryAction = (allCategory) => ({
  type: actionTypes.CHANGE_ALL_CATEGORY,
  allCategory
})

const changeCurrentPlaylistsAction = (currentPlaylists) => ({
  type: actionTypes.CHANGE_CURRENT_PLAYLISTS,
  currentPlaylists
})

export const getAllCategoryAction = () => {
  return dispatch => {
    getAllCategory().then(res => {
      dispatch(changeAllCategoryAction(res))
    })
  }
}

export const getCurrentPlaylistsAction = (order, cat, limit, offset) => {
  return dispatch => {
    getCurrentPlaylists(order, cat, limit, offset).then(res => {
      res.playlists&&res.playlists.forEach(item=>{
        item.type = 0
      })
      dispatch(changeCurrentPlaylistsAction(res))
    })
  }
}