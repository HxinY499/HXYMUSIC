import React, { memo, useState } from 'react'

import { Popover } from 'antd';
import {GithubOutlined,HomeOutlined,QqOutlined,WechatOutlined} from "@ant-design/icons"

import { 
  XYFooterWrapper
} from "./style"

export default memo(function XYAppFooter() {
  const [visibleQQ, setVisibleQQ] = useState(false)
  const [visibleWE, setVisibleWE] = useState(false)
  const handleQQ = () => {
    setVisibleQQ(!visibleQQ)
  }
  const handleWE = () => {
    setVisibleWE(!visibleWE)
  }
  return (
    <XYFooterWrapper>
      <div className="content wrap-v2">
        <div className="top"><span>HXYMUSIC</span></div>
        <div className="center">
          <div>联 系 我</div>
          <div>
            <a href="https://github.com/HxinY499" title="github" className="item">
              <GithubOutlined/>
            </a>
            <a href="http://hxiny.gitee.io" title="blog" className="item">
              <HomeOutlined />
            </a>
            <Popover
              content={<img src={require('@/assets/img/qq.jpg').default} alt="扫我加好友" className="call"/>}
              title="QQ"
              trigger="click"
              visible={visibleQQ}
              onVisibleChange={handleQQ}>
              <span title="QQ" className="item">
                <QqOutlined />
              </span>
            </Popover>
            <Popover
              content={<img src={require('@/assets/img/wechat.jpg').default} alt="扫我加好友" className="call"/>}
              title="wechat"
              trigger="click"
              visible={visibleWE}
              onVisibleChange={handleWE}>
              <span title="wechat" className="item">
                <WechatOutlined />
              </span>
            </Popover>
          </div>
        </div>
        <div className="bottom">
          Copyright © 2020-2021 HXYMUSIC. Made by 何欣宇.
        </div>
      </div>
    </XYFooterWrapper>
  )
})
