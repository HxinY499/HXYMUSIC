import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import {getPostsAction} from './store/actionCreators'

import {FriendWrapper,PostWrapper,UserWrapper} from './style'
import XYEmpty from '@/components/empty'
import XYPost from '@/components/post'

export default memo(function XYFriend() {
  const state = useSelector(state => ({ 
    loginUser: state.getIn(['user', 'loginUser']),
    posts: state.getIn(['friend', 'posts'])
  }), shallowEqual)
  const dispatch = useDispatch()
  const [focus, setFocus] = useState([])

  useEffect(() => {
    let arr = [state.loginUser&&state.loginUser.id]
    let arrFocus = state.loginUser&&state.loginUser.likes&&state.loginUser.likes["user"]
    if(arrFocus&&arrFocus.length>0){
      setFocus(arr.concat(arrFocus))
    }
  }, [state.loginUser])

  useEffect(() => {
    if(focus.length>0){
      dispatch(getPostsAction(focus.join(",")))
    }
  }, [dispatch,focus])

  return (
    <div>
      {
        state.loginUser&&state.loginUser.username ? 
        <FriendWrapper className="wrap-v2">
          <PostWrapper>
            <div className="post-title">{`动态 (${state.posts&&state.posts.length})`}</div>
            <div className="posts">
              {
                state.posts && state.posts.map(item => {
                  return (
                    <XYPost key={item.id} post={item}></XYPost>
                  )
                })
              }
            </div>
          </PostWrapper>
          <UserWrapper>
            <div className="user">
              <div className="user-main">
                <span>
                  <NavLink to={`/user/home/like?id=${state.loginUser.id}`}>
                    <img src={state.loginUser&&state.loginUser.avatar} alt={"user"}/>
                  </NavLink>
                </span>
                <span>
                  <NavLink to={`/user/home/like?id=${state.loginUser.id}`} 
                          className="text-nowrap"
                          title={state.loginUser&&state.loginUser.nickname}>
                    {state.loginUser&&state.loginUser.nickname}
                  </NavLink>
                </span>
              </div>
              <ul className="user-social">
                <li>
                  <NavLink to={`/user/home/post?id=${state.loginUser.id}`}>
                    <span className="social-count">{state.loginUser&&state.loginUser.posts&&state.loginUser.posts.length}</span>
                    <span>动态</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/user/home/focus?id=${state.loginUser.id}`}>
                    <span className="social-count">{state.loginUser&&state.loginUser.likes&&state.loginUser.likes.user&&state.loginUser.likes.user.length}</span>
                    <span>关注</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/user/home/fans?id=${state.loginUser.id}`}>
                    <span className="social-count">{state.loginUser&&state.loginUser.fans&&state.loginUser.fans.length}</span>
                    <span>粉丝</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </UserWrapper>
        </FriendWrapper> : 
        <XYEmpty></XYEmpty>
      }
    </div>

  )
})
