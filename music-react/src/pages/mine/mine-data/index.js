import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import React, { memo, useEffect } from 'react'

import {MineDataWrapper} from './style'

import {getHistoryAction} from '../store/actionCreators'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYShowAlbum from '@/components/show-album'
import XYShowMv from '@/components/show-mv'
import XYSongTableYesAlbum from '@/components/song-table/yes-album'

export default memo(function XYMineData() {

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    loginUser: state.getIn(['user', 'loginUser']),
    history: state.getIn(['mine', 'history']),
  }), shallowEqual)

  useEffect(()=>{
    dispatch(getHistoryAction(state.loginUser&&state.loginUser.username))
  }, [dispatch, state.loginUser])

  const albumCount = (state.history&&state.history.album&&state.history.album.mediaArr&&state.history.album.mediaArr.length)||0
  const MVCount = (state.history&&state.history.mv&&state.history.mv.mediaArr&&state.history.mv.mediaArr.length)||0
  const songCount = (state.history&&state.history.song&&state.history.song.mediaArr&&state.history.song.mediaArr.length)||0
  
  return (
    <MineDataWrapper>
      <XYLittleHeaderRCM title={`我听过的专辑(${albumCount})`} isMore={false}></XYLittleHeaderRCM>
      <ul className="album-content">
        {
          state.history&&state.history.album&&state.history.album.mediaArr.map(item => {
            return (
              <li key={item.id}><XYShowAlbum info={item}></XYShowAlbum></li>
            )
          })
        }
      </ul>
      <XYLittleHeaderRCM title={`我看过的M V(${MVCount})`} isMore={false}></XYLittleHeaderRCM>
      <ul className="mv-content">
        {
          state.history&&state.history.mv&&state.history.mv.mediaArr.map((item, index) => {
            return (
              <li key={index}><XYShowMv item={item.data}></XYShowMv></li>
            )
          })
        }
      </ul>
      <XYLittleHeaderRCM title={`我听过的歌曲(${songCount})`} isMore={false}></XYLittleHeaderRCM>
      <XYSongTableYesAlbum songs={state.history&&state.history.song&&state.history.song.mediaArr}></XYSongTableYesAlbum>
    </MineDataWrapper>
  )
})
