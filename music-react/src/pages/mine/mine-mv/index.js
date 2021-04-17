import React, { memo, useEffect, useState, shallowEqual } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import {getLikeMVsAction} from '../store/actionCreators'
import {deleteLikes} from '@/services/user'
import {changeLoginUserAction} from "@/pages/user/store"

import {MineMVWrapper} from './style'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYShowMv from '@/components/show-mv'
import { message, Popconfirm } from 'antd';

export default memo(function XYMineMV() {
  const [likes, setLikes] = useState([])
  const [deleteLikeId, setDeleteLikeId] = useState()
  const dispatch = useDispatch()

  const state = useSelector(state => ({
    likeMVs: state.getIn(['mine', 'likeMVs']),
    loginUser: state.getIn(['user', 'loginUser'])
  }), shallowEqual)

  useEffect(() => {
    let arr = state.loginUser&&state.loginUser.likes&&state.loginUser.likes["mv"]
    if(arr&&arr.length>0){setLikes(arr);console.log(arr)}
  }, [state.loginUser])

  useEffect(() => {
    dispatch(getLikeMVsAction(likes.join(",")))
  }, [dispatch,likes])

  const confirmDeLike = () => {
    deleteLikes(state.loginUser&&state.loginUser.username, "mv", deleteLikeId).then(res=>{
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
    <MineMVWrapper>
      <XYLittleHeaderRCM title={`我喜欢的MV(${(state.likeMVs&&state.likeMVs.length)||0})`} isMore={false}></XYLittleHeaderRCM>
      <ul className="content">
        {
          state.likeMVs && state.likeMVs.map((item) => {
            return (
              <li key={item.data.id}>
                <XYShowMv item={item.data}></XYShowMv>
                <div className="handle">
                  <Popconfirm
                    title="确认删除MV？"
                    onConfirm={confirmDeLike}
                    okText="确认"
                    cancelText="取消">
                    <i className="fa fa-trash-o" title="删除" onClick={()=>{setDeleteLikeId(item.data.id)}}></i>
                  </Popconfirm>
                </div>
              </li>
            )
          })
        }
      </ul>
    </MineMVWrapper>
  )
})
