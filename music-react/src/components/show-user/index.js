import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import XYPlaySongControl from '@/components/play-song-control'
import {ShowUserWrapper} from './style'

export default memo(function XYShowUser(props) {
  const showItem = props.item
  const avatar = showItem&&showItem.avatar
  const nickname = showItem&&showItem.nickname
  const gender = showItem&&showItem.gender
  const id = showItem&&showItem.id
  const focus = (showItem&&showItem.likes&&showItem.likes.user&&showItem.likes.user.length) || 0
  const fans = (showItem&&showItem.fans&&showItem.fans.length) || 0
  const post = (showItem&&showItem.post&&showItem.post.length) || 0
  const description = (showItem&&showItem.description) || "这个人很懒，什么都没留下"
  return (
    <ShowUserWrapper>
      <div className="avatar">
        <NavLink to={`/user/home/like?id=${id}`}><img src={avatar} alt={nickname}/></NavLink>
      </div>
      <div className="detail">
        <div className="nickname">
          <NavLink to={`/user/home/like?id=${id}`}>{nickname}</NavLink>
          {gender === 1 ? <i className="fa fa-mars male"></i> : <i className="fa fa-venus female"></i>}
        </div>
        <ul className="social">
          <li>
            <NavLink to={`/user/home/post?id=${id}`}>
              <span>动态</span>
              {post}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/user/home/focus?id=${id}`}>
              <span>关注</span>
              {focus}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/user/home/fans?id=${id}`}>
              <span>粉丝</span>
              {fans}
            </NavLink>
          </li>
        </ul>
        <div className="desc text-nowrap">{description}</div>
      </div>
      <div className="control-btn">
        <XYPlaySongControl likeId={id} likeType={"user"} likeText={"关注"}></XYPlaySongControl>
      </div>
    </ShowUserWrapper>
  )
})
