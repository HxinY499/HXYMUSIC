import React, { memo, useEffect, useState, shallowEqual } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import {getLikeAlbumsAction} from '../store/actionCreators'
import {deleteLikes} from '@/services/user'
import {changeLoginUserAction} from "@/pages/user/store"

import {MineAlbumWrapper} from './style'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYShowAlbum from '@/components/show-album'
import { message, Popconfirm } from 'antd';

export default memo(function XYMineAlbum() {
  const [likes, setLikes] = useState([])
  const [deleteLikeId, setDeleteLikeId] = useState()
  const dispatch = useDispatch()

  const state = useSelector(state => ({
    likeAlbums: state.getIn(['mine', 'likeAlbums']),
    loginUser: state.getIn(['user', 'loginUser'])
  }), shallowEqual)

  useEffect(() => {
    let arr = state.loginUser&&state.loginUser.likes&&state.loginUser.likes["album"]
    if(arr&&arr.length>0){setLikes(arr);console.log(arr)}
  }, [state.loginUser])

  useEffect(() => {
    dispatch(getLikeAlbumsAction(likes.join(",")))
  }, [dispatch,likes])

  const confirmDeLike = () => {
    deleteLikes(state.loginUser&&state.loginUser.username, "album", deleteLikeId).then(res=>{
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
    <MineAlbumWrapper>
      <XYLittleHeaderRCM title={`我喜欢的专辑(${(state.likeAlbums&&state.likeAlbums.length)||0})`} isMore={false}></XYLittleHeaderRCM>
      <ul className="content">
        {
          state.likeAlbums && state.likeAlbums.map((item) => {
            return (
              <li key={item.id}>
                <XYShowAlbum info={item}></XYShowAlbum>
                <div className="handle">
                  <Popconfirm
                    title="确认删除专辑？"
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
    </MineAlbumWrapper>
  )
})
