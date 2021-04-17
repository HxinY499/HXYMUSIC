import * as actionTypes from "./constants"
import { 
  getAllAlbums
} from '@/services/album'
import {getNewAlbum} from '@/services/recommend'

const changeAllAlbumsAction = (allAlbums) => ({
  type: actionTypes.CHANGE_ALL_ALBUMS,
  allAlbums
})

const changeHotAlbumsAction = (hotAlbums) => ({
  type: actionTypes.CHANGE_HOT_ALBUMS,
  hotAlbums
})

export const getAllAlbumsAction = (area, limit, offset) => {
  return dispatch => {
    getAllAlbums(area, limit, offset).then(res => {
      dispatch(changeAllAlbumsAction(res))
    })
  }
}

export const getHotAlbumsAction = () => {
  return dispatch => {
    getNewAlbum().then(res => {
      dispatch(changeHotAlbumsAction(res.albums))
    })
  }
}