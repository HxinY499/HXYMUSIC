import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {getLikeSongsAction} from '../store/actionCreators'

import XYSongTableYesAlbum from '@/components/song-table/yes-album'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYPlaySongControl from '@/components/play-song-control'
import {MineSongWrapper} from './style'

export default memo(function XYMineSong() {
  const [likes, setLikes] = useState([])
  const dispatch = useDispatch()

  const state = useSelector(state => ({
    likeSongs: state.getIn(['mine', 'likeSongs']),
    loginUser: state.getIn(['user', 'loginUser'])
  }), shallowEqual)

  useEffect(() => {
    let arr = state.loginUser&&state.loginUser.likes&&state.loginUser.likes["song"]
    if(arr&&arr.length>0){setLikes(arr);console.log(arr)}
  }, [state.loginUser])

  useEffect(() => {
    dispatch(getLikeSongsAction(likes.join(",")))
  }, [dispatch,likes])
  return (
    <MineSongWrapper>
      <div className='control'>
        <XYPlaySongControl playSong={state.likeSongs} type="all" hasAdd={false}></XYPlaySongControl>
      </div>
      <XYLittleHeaderRCM title={`我喜欢的歌曲(${(state.likeSongs&&state.likeSongs.length)||0})`} isMore={false}></XYLittleHeaderRCM>
      <XYSongTableYesAlbum songs={state.likeSongs}></XYSongTableYesAlbum>
    </MineSongWrapper>
  )
})
