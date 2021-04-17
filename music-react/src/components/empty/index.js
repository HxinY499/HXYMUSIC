import React, { memo } from 'react'

import {EmptyWrapper} from './style'
import {LockOutlined} from '@ant-design/icons'

export default memo(function XYEmpty() {
  return (
    <EmptyWrapper>
      <LockOutlined className="empty-icon"/>
      <h1 id="empty-title">HXYMUSIC</h1>
      <span id="empty-title1">享受音乐，享受生活</span>
      <span id="empty-title2">登录拥有更好体验</span>
    </EmptyWrapper>
  )
})
