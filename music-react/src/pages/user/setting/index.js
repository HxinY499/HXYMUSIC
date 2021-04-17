import React, { memo,shallowEqual } from 'react'
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { useSelector } from 'react-redux'

import {UserSettingWrapper} from "./style"
import XYEmpty from '@/components/empty'

export default memo(function XYUserSetting(props) {

  const state = useSelector(state => ({
    loginUser: state.getIn(["user", "loginUser"])
  }),shallowEqual)
  const {route} = props

  return (
    <UserSettingWrapper>
      {
        state.loginUser.username ? 
        <div>
          <div className="title">个人设置</div>
          <ul className="menu">
            <li className="basic">
              <NavLink to="/user/setting/basic">基本设置</NavLink>
            </li>
            <li className="change-password">
              <NavLink to="/user/setting/private">隐私设置</NavLink>
            </li>
          </ul>
          {renderRoutes(route.routes)}
        </div> :
        <XYEmpty></XYEmpty>
      }
    </UserSettingWrapper>
  )
})
