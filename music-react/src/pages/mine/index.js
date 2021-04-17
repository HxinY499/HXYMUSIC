import React, { memo, shallowEqual } from 'react'
import { useSelector } from 'react-redux'

// import {getSizeImage} from "@/utils/format-utils"
import {mineTitle} from "@/common/local-data"

import XYEmpty from '@/components/empty'
import {MineWrapper,MineContentLeft,MineContentRight} from './style'
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

export default memo(function XYMine(props) {
  
  const state = useSelector((state) => ({
    loginUser: state.getIn(['user', 'loginUser'])
  }), shallowEqual)

  return (
    <div>
      {
        state.loginUser&&state.loginUser.username ? 
        <MineWrapper className="wrap-v2">
          <MineContentLeft>
            {
              mineTitle.map((item, index)=>{
                return (
                    <NavLink key={index} className="mine-title" to={'/mine'+item.link}>{item.title}</NavLink>
                )
              })
            }
          </MineContentLeft>
          <MineContentRight>
            {renderRoutes(props.route.routes)}
          </MineContentRight>
        </MineWrapper> : 
        <XYEmpty></XYEmpty>
      }
      
    </div>
  )
})
