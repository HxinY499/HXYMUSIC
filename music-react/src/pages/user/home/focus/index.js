import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import {getUser} from '@/services/user'
import {changeShowUserFocusAction} from '../../store/actionCreators'

import {UserHomeFocusWrapper} from '../style'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYShowUser from '@/components/show-user'

export default memo(function XYUserHomeFocus(props) {
  const [focus, setFocus] = useState([])
  const [isMe, setIsMe] = useState(false)
  const dispatch = useDispatch()

  const state = useSelector(state => ({
    loginUser: state.getIn(['user', 'loginUser']),
    showUser: state.getIn(['user', 'showUser']),
    focus: state.getIn(['user', 'focus'])
  }), shallowEqual)
  
  useEffect(()=>{
    if(state.loginUser.id === state.showUser.id){
      setIsMe(true)
    }else{
      setIsMe(false)
    }
  },[state.loginUser, state.showUser])

  useEffect(() => {
    let arr = state.showUser&&state.showUser.likes&&state.showUser.likes["user"]
    if(arr&&arr.length>0){setFocus(arr);console.log(arr)}
  }, [state.showUser])

  useEffect(() => {
    if(focus.length>0){
      getUser(focus.join(",")).then(res=>{
        if(res.data.success === "true"){
          dispatch(changeShowUserFocusAction(res.data&&res.data.users))
        }
      })
    }
  }, [dispatch,focus])

  const focusCount = (state.showUser&&state.showUser.likes&&state.showUser.likes.user&&state.showUser.likes.user.length) || 0

  return (
    <UserHomeFocusWrapper>
      <XYLittleHeaderRCM title={isMe? `我的关注(${focusCount})` :
       `Ta的关注(${focusCount})`} isMore={false}></XYLittleHeaderRCM>
      <ul className="show-user-body">
        {
          state.focus&&state.focus.map(item => {
            return (
              <li key={item.id} className="show-user-body-item">
                <XYShowUser item={item}></XYShowUser>
              </li>
            )
          })
        }
      </ul>
    </UserHomeFocusWrapper>
  )
})
