import React, { memo, useState, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import classnames from 'classnames'

import {timestampToTime} from "@/utils/format-utils"
import {changeLoginUserAction} from "@/pages/user/store"
import { deletePost, likePost } from '@/services/post'
import {getPostCommentAction} from '@/pages/friend/store'

import {PostWrapper} from './style'
import XYComment from '@/components/comment'
import { Image, message } from 'antd';

export default memo(function XYPost(props) {
  const item = props.post
  const state = useSelector(state => ({ 
    loginUser: state.getIn(['user', 'loginUser']),
    posts: state.getIn(['friend', 'posts']),
    postComment: state.getIn(['friend', 'postComment'])
  }), shallowEqual)
  const [likeCount, setLikeCount] = useState(item.like)
  const [ifLike, setIfLike] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    let like = state.loginUser&&state.loginUser.likePosts
    &&state.loginUser.likePosts.includes(parseInt(item.id))
    like ? setIfLike(true) : setIfLike(false)
  }, [state.loginUser, item.id])

  //路由跳转
  function mediaRouterChange(info){
    switch (info.type) {
      case "歌曲":
        history.push(`/discover/detailsong?id=${info.id}`)
        break;
      case "歌单":
        history.push(`/discover/detailplaylist?id=${info.id}`)
        break;
      case "专辑":
        history.push(`/discover/detailalbum?id=${info.id}`)
        break;
      case "MV":
        history.push(`/discover/detailmv?id=${info.id}`)
        break;
      default:
        break;
    }
  }

  function postDelete(userId, id){
    deletePost(userId, id).then(res => {
      if(res.data.success === "true"){
        message.success({content: "删除成功", className: "suc-message"});
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("loginUser", user);
        dispatch(changeLoginUserAction(res.data.user))
      }else{
        message.error({content: "删除失败", className: "err-message"});
      }
    }, err => {message.error({content: "删除失败", className: "err-message"});})
  }

  function postLike(id) {
    if(ifLike){
      setIfLike(false)
      setLikeCount(likeCount-1)
    }else{
      setIfLike(true)
      setLikeCount(likeCount+1)
    }
    likePost(state.loginUser.id, id).then(res=>{
      if(res.data.success === "true"){
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("loginUser", user);
        dispatch(changeLoginUserAction(res.data.user))
      }
    })
  }

  function handleShowComment(id){
    if(showComment===false){
      dispatch(getPostCommentAction(id))
      setShowComment(true)
    }else{
      setShowComment(false)
    }
  }

  return (
    <PostWrapper>
      <div className="main-wrapper">
        <div className="avatar-wrapper">
          <div className="avatar">
            <NavLink to={`/user/home/like?id=${item.creator.id}`}>
              <img src={item.creator.avatar} alt={item.creator.nickname}/>
            </NavLink>
          </div>
        </div>
        <div className="detail">
          <div className="title">
            <NavLink to={`/user/home/like?id=${item.creator.id}`}>
              {item.creator.nickname}
            </NavLink>
            <span>{`分享${item.shareInfo.type}`}</span></div>
          <div className="time">{timestampToTime(item.date, true)}</div>
          <div className="text">{item.text}</div>
          <div className="media">
            <div className="media-cover">
              <span onClick={()=>{mediaRouterChange(item.shareInfo)}}><img src={item.shareInfo.cover} alt={item.shareInfo.name}/></span>
            </div>
            <div className="media-detail">
              <span>{item.shareInfo.type}</span>
              <span onClick={()=>{mediaRouterChange(item.shareInfo)}}>{item.shareInfo.name}</span>
              <span>{item.shareInfo.creator}</span>
            </div>
          </div>
          {
            item.imgs.length > 0 ?
            <div className="img-wrapper">
              {
                item.imgs.map((item, index) => {
                  return (
                    <div className="img-item" key={index}>
                      <Image src={item}/>
                    </div>
                  )
                })
              }
            </div> : null
          }
        </div>
        {
          item.userId===state.loginUser.id ? 
          <i className="fa fa-trash-o delete" title="删除" onClick={()=>{postDelete(item.creator.id, item.id)}}></i> : null
        }
        <div className="post-bottom-control">
          <i title="点赞" onClick={()=>{postLike(item.id)}}
            className={classnames({"fa fa-thumbs-up":true,"already-like":ifLike})}>
              {`(${likeCount})`}
          </i>
          <i className="fa fa-commenting" title="评论" onClick={()=>{handleShowComment(item.id)}}></i>
        </div>
      </div>
      {
        showComment ? 
        <div className="post-comment">
          <XYComment mineComments={state.postComment} subInfo={{type:"post",id:item.id}}></XYComment>
        </div> : null
      }
    </PostWrapper>
  )
})
