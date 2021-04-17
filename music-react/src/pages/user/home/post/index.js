import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {getPostsAction} from '@/pages/friend/store'

import {UserHomePostWrapper} from '../style'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYPost from '@/components/post'

export default memo(function XYUserHomePost() {
  const [isMe, setIsMe] = useState(false)
  const dispatch = useDispatch()

  const state = useSelector(state => ({
    loginUser: state.getIn(['user', 'loginUser']),
    showUser: state.getIn(['user', 'showUser']),
    posts: state.getIn(['friend', 'posts'])
  }), shallowEqual)

  useEffect(()=>{
    if(state.loginUser.id === state.showUser.id){
      setIsMe(true)
    }else{
      setIsMe(false)
    }
  },[state.loginUser, state.showUser.id])

  useEffect(() => {
    dispatch(getPostsAction(state.showUser&&state.showUser.id))
  }, [dispatch, state.showUser])

  const postCount = (state.showUser&&state.showUser.posts&&state.showUser.posts.length) || 0

  return (
    <UserHomePostWrapper>
      <XYLittleHeaderRCM title={isMe? `我的动态(${postCount})` :
       `Ta的动态(${postCount})`} isMore={false}></XYLittleHeaderRCM>
      {
        postCount === 0 ? 
        <div className="no-data">暂无数据</div> :
        <div>
          {
            state.posts.map((item, index) => {
              return (
                <XYPost key={index} post={item}></XYPost>
              )
            })
          }
        </div>
      }
    </UserHomePostWrapper>
  )
})
