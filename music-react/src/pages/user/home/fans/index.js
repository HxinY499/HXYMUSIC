import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {getUser} from '@/services/user'
import {changeShowUserFansAction} from '../../store/actionCreators'

import {UserHomeFansWrapper} from '../style'
import XYShowUser from '@/components/show-user'
import XYLittleHeaderRCM from '@/components/little-header-rcm'

export default memo(function XYUserHomeFans(props) {
  const [isMe, setIsMe] = useState(false)
  const [fans, setFans] = useState([])
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    loginUser: state.getIn(['user', 'loginUser']),
    showUser: state.getIn(['user', 'showUser']),
    fans: state.getIn(['user', 'fans'])
  }), shallowEqual)

  useEffect(()=>{
    if(state.loginUser.id === state.showUser.id){
      setIsMe(true)
    }else{
      setIsMe(false)
    }
  },[state.loginUser, state.showUser.id])

  useEffect(() => {
    let arr = state.showUser&&state.showUser.fans
    if(arr&&arr.length>0){setFans(arr);console.log(arr)}
  }, [state.showUser])

  useEffect(() => {
    if(fans.length>0){
      getUser(fans.join(",")).then(res=>{
        if(res.data.success === "true"){
          dispatch(changeShowUserFansAction(res.data&&res.data.users))
        }
      })
    }
  }, [dispatch,fans])

  const fansCount = (state.showUser&&state.showUser.fans&&state.showUser.fans.length) || 0
  return (
    <UserHomeFansWrapper>
      <XYLittleHeaderRCM title={isMe? `我的粉丝(${fansCount})` :
       `Ta的粉丝(${fansCount})`} isMore={false}></XYLittleHeaderRCM>
      <ul className="show-user-body">
        {
          state.fans&&state.fans.map(item => {
            return (
              <li key={item.id} className="show-user-body-item">
                <XYShowUser item={item}></XYShowUser>
              </li>
            )
          })
        }
      </ul>
    </UserHomeFansWrapper>
  )
})
