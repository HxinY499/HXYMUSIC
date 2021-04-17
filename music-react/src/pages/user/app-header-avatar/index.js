import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {changeLoginUserAction} from "../store/actionCreators"

import {AvatarWrapper} from './style'
import { UserOutlined, SettingOutlined, MessageOutlined, FullscreenExitOutlined } from "@ant-design/icons"

export default memo(function XYAppHeaderAvatar(props) {

  const state = useSelector(state => ({
    loginUser: state.getIn(["user", "loginUser"])
  }))
  const dispatch = useDispatch()
  const histroy = useHistory()

  const avatar = state.loginUser && state.loginUser.avatar
  const nickname = state.loginUser && state.loginUser.nickname
  const focusCount = (state.loginUser&&state.loginUser.likes&&state.loginUser.likes.user&&state.loginUser.likes.user.length) || 0
  const fansCount = (state.loginUser&&state.loginUser.fans&&state.loginUser.fans.length) || 0

  function handleUser(type){
    if(type === "exit"){
      dispatch(changeLoginUserAction({}))
      localStorage.removeItem("loginUser")
    }else if(type === "home"){
      histroy.push(`/user/home/like?id=${state.loginUser.id}`)
    }else if(type === "setting"){
      histroy.push("/user/setting")
    }else if(type === "focus"){
      histroy.push(`/user/home/focus?id=${state.loginUser.id}`)
    }else if(type === "fans"){
      histroy.push(`/user/home/fans?id=${state.loginUser.id}`)
    }
  }

  return (
    <AvatarWrapper> 
      <div className="top-avatar">
        <img src={avatar} alt="avatar" onClick={e => handleUser("home")}/>
      </div>
      <div className="user-content">
        <div className="nickname" onClick={e => handleUser("home")}>{nickname}</div>
        <div className="fans">
          <div className="left" onClick={()=>{handleUser("focus")}}>
            <span>关注</span>
            <span>{focusCount}</span>
          </div>
          <div className="right" onClick={()=>{handleUser("fans")}}>
            <span>粉丝</span>
            <span>{fansCount}</span>
          </div>
        </div>
        <div className="line"></div>
        <ul className="menu">
          <li className="item" onClick={e => handleUser("home")}>
            <UserOutlined />
            我的主页
          </li>
          <li className="item" onClick={e => handleUser("message")}>
            <MessageOutlined />
            消息中心
          </li>
          <li className="item" onClick={e => handleUser("setting")}>
            <SettingOutlined />
            个人设置
          </li>
        </ul>
        <div className="line"></div>
        <div className="exit" onClick={e => handleUser("exit")}>
          <FullscreenExitOutlined />
          退出
        </div>
      </div>
    </AvatarWrapper>
  )
})
