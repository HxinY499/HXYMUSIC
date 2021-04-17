import React, { memo, useEffect, useState,shallowEqual } from 'react'
import { useSelector } from 'react-redux'

import {PrivateHomeWrapper} from './style'
import {InfoCircleFilled, CheckCircleFilled} from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

export default memo(function XYPrivateHome() {
  const state = useSelector(state => ({
    loginUser: state.getIn(['user', 'loginUser'])
  }),shallowEqual)
  const [first, setFirst] = useState(false)
  useEffect(() => {
    if(state.loginUser && state.loginUser.passProtect === undefined){
      setFirst(true)
    }else{
      setFirst(false)
    }
  }, [state.loginUser, state.loginUser.passProtect, first])
  function notSupport(){
    alert("暂不支持")
  }
    return (
    <PrivateHomeWrapper>
      <ul>
        <li>
          <span className="yes icon"><CheckCircleFilled /></span>
          <span className="item-title">设置密码</span>
          <span className="tip">已设置</span>
          <NavLink to={{
            pathname: "/user/setting/private/privatetest", 
            search: "?type=setpassword"}} className="control">修改密码</NavLink>
        </li>
        {
          !first ?
          <li>
            <span className="yes icon"><CheckCircleFilled /></span>
            <span className="item-title">设置密保</span>
            <span className="tip">已设置</span>
            <NavLink to={{
              pathname: "/user/setting/private/privatetest", 
              search: "?type=setpassprotect"}} className="control">修改密保</NavLink>
          </li> :
          <li>
            <span className="no icon"><InfoCircleFilled /></span>
            <span className="item-title">设置密保</span>
            <span className="alert-info">第一次设置密保不需要验证</span>
            <span className="tip">未设置</span>
            <NavLink to={{
              pathname: "/user/setting/private/setpassprotect", 
              state: {first:true}}} className="control">设置密保</NavLink>
          </li>
        }

        <li>
          <span className="no icon"><InfoCircleFilled /></span>
          <span className="item-title">绑定手机</span>
          <span className="tip">未绑定手机号</span>
          <NavLink to="#/" className="control" onClick={e=>{notSupport()}}>绑定手机</NavLink>
        </li>
        <li>
          <span className="yes icon"><CheckCircleFilled /></span>
          <span className="item-title">绑定邮箱</span>
          <span className="tip"></span>
          <span className="control email">邮箱号注册时决定，无法更改</span>
        </li>
        <li>
          <span className="no icon"><InfoCircleFilled /></span>
          <span className="item-title">实名认证</span>
          <span className="tip">未实名认证</span>
          <NavLink to="#/" className="control" onClick={e=>{notSupport()}}>实名认证</NavLink>
        </li>
        <li>
          <span className="no icon"><InfoCircleFilled /></span>
          <span className="item-title">绑定QQ账号</span>
          <span className="tip">未绑定QQ账号</span>
          <NavLink to="#/" className="control" onClick={e=>{notSupport()}}>绑定QQ账号</NavLink>
        </li>
      </ul>
    </PrivateHomeWrapper>
  )
})