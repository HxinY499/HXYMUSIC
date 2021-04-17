import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {getLikeSongsAction} from '../../store/actionCreators'

import {UserHomeLikeWrapper} from '../style'
import XYSongTableYesAlbum from '@/components/song-table/yes-album'
import XYLittleHeaderRCM from '@/components/little-header-rcm'

export default memo(function XYUserHomeLike(props) {
  const [isMe, setIsMe] = useState(false)
  const [likes, setLikes] = useState([])
  const dispatch = useDispatch()

  const state = useSelector(state => ({
    loginUser: state.getIn(['user', 'loginUser']),
    showUser: state.getIn(['user', 'showUser']),
    likeSongs: state.getIn(['user', 'likeSongs'])
  }), shallowEqual)

  useEffect(()=>{
    if(state.loginUser.id === state.showUser.id){
      setIsMe(true)
    }else{
      setIsMe(false)
    }
  },[state.loginUser, state.showUser.id])

  useEffect(() => {
    let arr = state.showUser&&state.showUser.likes&&state.showUser.likes["song"]
    if(arr&&arr.length>0){setLikes(arr);console.log(arr)}
  }, [state.showUser])

  useEffect(() => {
    dispatch(getLikeSongsAction(likes.join(",")))
  }, [dispatch,likes])
  const likeSongsCount = (state.likeSongs&&state.likeSongs.length) || 0
  return (
    <UserHomeLikeWrapper>
      <XYLittleHeaderRCM title={isMe? `我喜欢的歌曲(${likeSongsCount})` :
       `Ta喜欢的歌曲(${likeSongsCount})`} isMore={false}></XYLittleHeaderRCM>
      {
        state.likeSongs&&state.likeSongs.length>0 ? 
        <XYSongTableYesAlbum songs={state.likeSongs}></XYSongTableYesAlbum> : 
        <div className="no-data">暂无数据</div>
      }
    </UserHomeLikeWrapper>
  )
})
