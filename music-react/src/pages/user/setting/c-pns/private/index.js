import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'

import {PrivateWrapper} from './style'

export default memo(function XYPrivate(props) {
  const {route} = props
  return (
    <PrivateWrapper>
      {renderRoutes(route.routes)}
    </PrivateWrapper>
  )
})
