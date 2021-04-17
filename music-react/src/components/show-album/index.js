import React, { memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { changeSongListToPlayListAction } from '@/pages/player/store';
import {getSizeImage} from '@/utils/format-utils'
import { setHistory } from "@/services/user"

import { NavLink } from 'react-router-dom'
import {XYShowAlbumWrapper} from './style'

export default memo(function XYShowAlbum(props) {

  const { blurPicUrl, name, artist } = props.info
  const state = useSelector(state => ({
    loginUser: state.getIn(["user", "loginUser"])
  }),shallowEqual)

  const dispatch = useDispatch()
  const play = (e, item, ifRequest) => {
    dispatch(changeSongListToPlayListAction(item, ifRequest))
    e.preventDefault()
    //生成播放历史
    if(state.loginUser&&state.loginUser.username){
      setHistory(state.loginUser.username, "album", props.info)
    }
  }

  return (
    <XYShowAlbumWrapper>
      <div className="top" title={name}>
        <NavLink to={`/discover/detailalbum?id=${props.info.id}`}>
          <img src={getSizeImage(blurPicUrl,100)} alt=""/>
          <div className="control">
            <span onClick={e => {play(e, props.info, true)}}>
              <i className="fa fa-play"></i>
            </span>
          </div>
        </NavLink>
        <div className="image_cover">img</div>
      </div>
      <NavLink to={`/discover/detailalbum?id=${props.info.id}`} className="center" title={name}>{name}</NavLink>
      <NavLink to={`/discover/detailartist?id=${artist.id}`} className="bottom" title={artist.name}>{artist.name}</NavLink>
    </XYShowAlbumWrapper>
  )
})
