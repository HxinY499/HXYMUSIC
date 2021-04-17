import React, { memo } from 'react'

import {getSizeImage} from '@/utils/format-utils'

import {XYShowWrapper} from './style'
import { NavLink } from 'react-router-dom'

export default memo(function XYShowMv(props) {
  const item = props.item || {}
  const cover = (item.cover) || (item.imgurl) || "http://localhost:9002/static/images/avatar/default_avatar.jpg"
  return (
    <XYShowWrapper>
      <div className="cover" title={item.name}>
        <NavLink to={`/discover/detailmv?id=${item.id}`}>
          <img src={getSizeImage(cover, 137, 103)} alt=""/>
          <div className="control" title="播放mv">
            <i className="fa fa-play"></i>
          </div>
        </NavLink>
      </div>
      <div className="info text-nowrap">
        <NavLink to={`/discover/detailmv?id=${item.id}`} title={item.name}>{item.name}</NavLink>
      </div>
    </XYShowWrapper>
  )
})
