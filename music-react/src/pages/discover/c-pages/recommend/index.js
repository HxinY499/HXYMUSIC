import React, { memo } from 'react'

import {
  XYRecommendWrapper,
  Content,
  RecommendContent,
} from './style'

import XYTopBanner from './c-cpns/top-banner'
import XYHotRecommend from './c-cpns/hot-recommend'
import XYNewAlbum from './c-cpns/new-album'
import XYRankingList from './c-cpns/ranking-list'

function XYRcommend() {

  return (
    <XYRecommendWrapper>
      <XYTopBanner></XYTopBanner>
      <Content className="wrap-v2">
        <RecommendContent>
          <XYHotRecommend></XYHotRecommend>
          <XYNewAlbum></XYNewAlbum>
          <XYRankingList></XYRankingList>
        </RecommendContent>
      </Content>
    </XYRecommendWrapper>
  )
}

export default memo(XYRcommend)
