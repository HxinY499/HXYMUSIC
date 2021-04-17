import * as actionTypes from "./constants"
import { getSongDetail } from '@/services/player'
import { getMineMVDetail } from "@/services/mv";
import { getMineLikeAlbumDetail } from '@/services/album'
import { getMineArtistDetail } from '@/services/artist'
import {getHistory} from '@/services/user'
import { getMineLikePlaylistDetail, getMineCreatePlaylistsDetail } from '@/services/playlist'

const changeLikeSongsAction = (likeSongs) => ({
  type: actionTypes.CHANGE_LIKE_SONGS,
  likeSongs
})
const changeLikeAlbumsAction = (likeAlbums) => ({
  type: actionTypes.CHANGE_LIKE_ALBUMS,
  likeAlbums
})
const changeLikeArtistsAction = (likeArtists) => ({
  type: actionTypes.CHANGE_LIKE_ARTISTS,
  likeArtists
})
const changeLikePlaylistsAction = (likePlaylists) => ({
  type: actionTypes.CHANGE_LIKE_PLAYLISTS,
  likePlaylists
})
const changeLikeMVsAction = (likeMVs) => ({
  type: actionTypes.CHANGE_LIKE_MVS,
  likeMVs
})
const changeCreatePlaylistsAction = (createPlaylists) => ({
  type: actionTypes.CHANGE_CREATE_PLAYLISTS,
  createPlaylists
})

const changeHistoryAction = (history) => ({
  type: actionTypes.CHANGE_HISTORY,
  history
})

export const getLikeSongsAction = (likeIds) => {
  return dispatch => {
    getSongDetail(likeIds).then(res=>{
      dispatch(changeLikeSongsAction(res.songs))
    })
  }
}

export const getLikeMVsAction = (likeIds) => {
  return dispatch => {
    getMineMVDetail(likeIds).then(res=>{
      dispatch(changeLikeMVsAction(res.data.mvs))
    })
  }
}

export const getLikeAlbumsAction = (likeIds) => {
  return dispatch => {
    getMineLikeAlbumDetail(likeIds).then(res=>{
      dispatch(changeLikeAlbumsAction(res.data.albums))
    })
  }
}

export const getLikeArtistsAction = (likeIds) => {
  return dispatch => {
    getMineArtistDetail(likeIds).then(res=>{
      dispatch(changeLikeArtistsAction(res.data.artists))
    })
  }
}

export const getLikePlaylistsAction = (likeIds) => {
  return dispatch => {
    getMineLikePlaylistDetail(likeIds).then(res=>{
      if(res.data){
        dispatch(changeLikePlaylistsAction(res.data.playlists))
      }
    })
  }
}

export const getCreatePlaylistsAction = (createIds) => {
  return dispatch => {
    getMineCreatePlaylistsDetail(createIds).then(res=>{
      dispatch(changeCreatePlaylistsAction(res.data.playlists))
    })
  }
}

export const getHistoryAction = (username) => {
  return dispatch => {
    getHistory(username).then(res=>{
      dispatch(changeHistoryAction(res.data.history))
    })
  }
}

