import React, { memo, useEffect, useState, shallowEqual } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import {MineArtistWrapper} from './style'
import {deleteLikes} from '@/services/user'
import {changeLoginUserAction} from "@/pages/user/store"

import {getLikeArtistsAction} from '../store/actionCreators'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYShowArtist from '@/components/show-artist'
import { message, Popconfirm } from 'antd';

export default memo(function XYMineArtist() {
  const [likes, setLikes] = useState([])
  const [deleteLikeId, setDeleteLikeId] = useState()
  const dispatch = useDispatch()

  const state = useSelector(state => ({
    likeArtists: state.getIn(['mine', 'likeArtists']),
    loginUser: state.getIn(['user', 'loginUser'])
  }), shallowEqual)

  useEffect(() => {
    let arr = state.loginUser&&state.loginUser.likes&&state.loginUser.likes["artist"]
    if(arr&&arr.length>0){setLikes(arr);console.log(arr)}
  }, [state.loginUser])

  useEffect(() => {
    dispatch(getLikeArtistsAction(likes.join(",")))
  }, [dispatch,likes])

  const confirmDeLike = () => {
    deleteLikes(state.loginUser&&state.loginUser.username, "artist", deleteLikeId).then(res=>{
      if(res.data.user!==undefined){
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("loginUser", user)
        dispatch(changeLoginUserAction(res.data.user))
      }
    },err=>{
      message.error({content: "删除失败", className: "err-message"})
    })
  }


  return (
    <MineArtistWrapper>
      <XYLittleHeaderRCM title={`我喜欢的歌手(${(state.likeArtists&&state.likeArtists.length)||0})`} isMore={false}></XYLittleHeaderRCM>
      <ul className="content">
        {
          state.likeArtists && state.likeArtists.map((item) => {
            return (
              <li key={item.id}>
                <XYShowArtist artist={item}></XYShowArtist>
                <div className="handle">
                  <Popconfirm
                    title="确认删除歌手？"
                    onConfirm={confirmDeLike}
                    okText="确认"
                    cancelText="取消">
                    <i className="fa fa-trash-o" title="删除" onClick={()=>{setDeleteLikeId(item.id)}}></i>
                  </Popconfirm>
                </div>
              </li>
            )
          })
        }
      </ul>
    </MineArtistWrapper>
  )
})
