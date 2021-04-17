import React, { memo, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import {TestWrapper} from './style'
import {Tooltip} from 'antd'
import {RightOutlined, KeyOutlined, QuestionOutlined} from '@ant-design/icons'

export default memo(function XYTest(props) {
  const [type, setType] = useState("")
  useEffect(() => {
    const val = props.location.search.split("=")[1];
    if(val === "setpassword"){
      setType("setpassword")
    }else if(val === "setpassprotect"){
      setType("setpassprotect")
    }
  }, [props.location.search])

  const history = useHistory()
  function returnPrivate(){
    history.push('/user/setting/private/home')
  }

  //并没有用到手机验证的方式，只是写明扩展方式
  function handleSetting(pattern){
    if(type === "setpassword"){
      switch(pattern) {
        case "phone":
          history.push('/user/setting/private/setpassword', {pattern: "phone"})
          break;
        case "passprotect":
          history.push("/user/setting/private/setpassword", {pattern: "passprotect"})
          break;
        default:
          alert("跳转失败")
          break;
      }
    }else if(type === "setpassprotect"){
      switch(pattern) {
        case "phone":
          history.push('/user/setting/private/setpassprotect', {pattern: "phone"})
          break;
        case "passprotect":
          history.push("/user/setting/private/setpassprotect", {pattern: "passprotect"})
          break;
        default:
          alert("跳转失败")
          break;
      }
    }
  }

  return (
    <TestWrapper>
      <div className="test-little-title">
        <span className="return" onClick={e => {returnPrivate()}}>隐私设置</span>
        <span className="icon"><RightOutlined /></span>
        <span>验证</span>
      </div>
      <div className="test-title">选择验证方式</div>
      <ul className="test-content">
        <li className="test-item">
          <span className="test-item-icon"><i className="fa fa-mobile"></i></span>
          <div className="test-item-content">
            <span>通过手机验证</span>
            <span>如果你的绑定手机可用，则可通过绑定的手机发送验证码修改</span>
          </div>
          <button className="test-item-control" onClick={e=>{alert("暂不支持")}}>立即验证</button>
        </li>
        <li className="test-item">
          <span className="test-item-icon"><i className="fa fa-envelope"></i></span>
          <div className="test-item-content">
            <span>通过邮箱验证</span>
            <span>如果你的账号绑定邮箱，则可通过向绑定邮箱发送验证码修改</span>
          </div>
          <button className="test-item-control" onClick={e=>{alert("暂不支持")}}>立即验证</button>
        </li>
        <li className="test-item">
          <span className="test-item-icon"><KeyOutlined /></span>
          <div className="test-item-content">
            <span>通过密保验证</span>
            <span>如果你记得自己所设置的密保问题及答案，则可通过密保问题验证修改密码</span>
          </div>
          <button className="test-item-control" onClick={e=>{handleSetting("passprotect")}}>立即验证</button>
        </li>
        <li className="test-item">
          <span className="test-item-icon"><QuestionOutlined /></span>
          <div className="test-item-content">
            <span>以上方式都不能用</span>
            <span>如果您的原手机号，邮箱已经无法使用，请联系我</span>
          </div>
          <Tooltip title="请看底部">
            <span className="test-item-call">联系我</span>
          </Tooltip>
        </li>
      </ul>
    </TestWrapper>
  )
})
