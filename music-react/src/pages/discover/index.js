import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { dicoverMenu } from '@/common/local-data'
import { XYDiscoverHeaderWrapper } from './style'

export default memo(function XYDiscover(props) {
  const {route} = props
  return (
    <div>
      <XYDiscoverHeaderWrapper>
        <div className="content wrap-v2">
          <div className="list">
            {
              dicoverMenu.map((item, index) => {
                return (
                  <NavLink to={"/discover"+item.link} key={index}>
                    <span>{item.title}</span>
                  </NavLink>
                )
              })
            }
          </div>
        </div>
      </XYDiscoverHeaderWrapper>
      {renderRoutes(route.routes)}
    </div>
  )
})
