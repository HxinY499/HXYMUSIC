import React, { memo, shallowEqual } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {getSizeImage} from '@/utils/format-utils'
import { changeSongListToPlayListAction } from '@/pages/player/store';
import { setHistory } from "@/services/user"

import {XYShowWrapper} from './style'
import { NavLink } from 'react-router-dom'

export default memo(function XYShowPlayList(props) {
  const {item, width} = props
  const { name, picUrl, coverImgUrl} = item
  const state = useSelector(state => ({
    loginUser: state.getIn(["user", "loginUser"])
  }),shallowEqual)

  const dispatch = useDispatch()
  const allAddPlaylist = (e, item, isRequest) => {
    dispatch(changeSongListToPlayListAction(item, isRequest))
    e.preventDefault()
    //生成播放历史
    if(state.loginUser&&state.loginUser.username){
      setHistory(state.loginUser.username, "playlist", item)
    }
  }

  return (
    <XYShowWrapper long={width}>
      <div className="cover">
        <NavLink to={`/discover/detailplaylist?id=${item.id}`}>
          <img src={getSizeImage(picUrl || coverImgUrl, width)} alt=""/>
          <div className="control">
            <span onClick={e => {allAddPlaylist(e, item, true)}}>
              <i className="fa fa-play"></i>
            </span>
          </div>
        </NavLink>
      </div>
      <div className="info">
        <NavLink to={`/discover/detailplaylist?id=${item.id}`} title={name}>{name}</NavLink>
      </div>
    </XYShowWrapper>
  )
})
