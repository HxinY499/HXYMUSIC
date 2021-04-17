import React, { memo, useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {changeShowUserAction} from '../store/actionCreators'
import {getUser} from '@/services/user'

import {UserHomeWrapper} from './style'
import XYEmpty from '@/components/empty'
import XYPlaySongControl from '@/components/play-song-control'
import {Image} from 'antd'

export default memo(function XYUserHome(props) {
  const showId = parseInt(props.location.search.split("=")[1])
  const [isMe, setIsMe] = useState(false)
  const state = useSelector(state => ({
    loginUser: state.getIn(['user', 'loginUser']),
    showUser: state.getIn(['user', 'showUser'])
  }),shallowEqual)
  const histroy = useHistory()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(showId === (state.loginUser&&state.loginUser.id)){
      setIsMe(true)
      dispatch(changeShowUserAction(state.loginUser))
    }else{
      setIsMe(false)
      getUser(showId).then(res=>{
        if(res.data.success === "true"){
          dispatch(changeShowUserAction(res.data&&res.data.users[0]))
        }
      })
    }
  },[dispatch, showId, state.loginUser])

  const avatar = state.showUser&&state.showUser.avatar
  const nickname = (state.showUser&&state.showUser.nickname) || "暂未获取到昵称"
  const description = (state.showUser&&state.showUser.description) || "这个人很懒，什么都没留下"
  const gender = (state.showUser&&state.showUser.gender) || 1
  const residence = (state.showUser&&state.showUser.residence) || ["暂未获取到地区"]
  const focus = (state.showUser&&state.showUser.likes&&state.showUser.likes.user&&state.showUser.likes.user.length) || 0
  const fans = (state.showUser&&state.showUser.fans&&state.showUser.fans.length) || 0
  const post = (state.showUser&&state.showUser.posts&&state.showUser.posts.length) || 0

  return (
    <div>
      {
        state.loginUser && state.loginUser.username ? 
        <UserHomeWrapper className="wrap-v2">
          <div className="info-wrapper">
            <div className="avatar">
              {
                avatar ? <Image src={avatar} width={180}/> :
                <Image
                  src="error"
                  fallback="data:image/png;base64,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"
                />
              }
            </div>
            <div className="detail">
              <div className="title">
                <span className="nickname">{nickname}</span>
                {
                  gender === 1 ? <i className="fa fa-mars male"></i> : <i className="fa fa-venus female"></i>
                }
                { 
                  isMe ? 
                  <button className="this-btn edit" onClick={()=>{histroy.push("/user/setting")}}>编辑个人资料</button> :
                  <div className="like-btn"><XYPlaySongControl likeId={showId} likeType={"user"} likeText={"关注"}></XYPlaySongControl></div>
                }
              </div>
              <ul className="social">
                <li>
                  <NavLink to={`/user/home/post?id=${showId}`}>
                    {post}
                    <span>动态</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/user/home/focus?id=${showId}`}>
                    {focus}
                    <span>关注</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/user/home/fans?id=${showId}`}>
                    {fans}
                    <span>粉丝</span>
                  </NavLink>
                </li>
              </ul>
              <div className="city">
                <span>所在地区：</span>
                {
                  residence.slice(0,2).map((item, index)=>{
                    return (
                      <span key={index}>{item}</span>
                    )
                  })
                }
              </div>
              <div className="desc"><span>介绍：</span>{description}</div>
            </div>
          </div>
          <div className="child-router">
            {renderRoutes(props.route.routes)}
          </div>
        </UserHomeWrapper> : 
        <XYEmpty></XYEmpty>
      }
    </div>
  )
})
