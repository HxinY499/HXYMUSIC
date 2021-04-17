import React, { memo, useEffect,shallowEqual, useCallback } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'

import XYLittleHeaderRMC from "@/components/little-header-rcm"
import XYShowPlayList from '@/components/show-playList'
import {getHotRecommendAction} from "../../store/actionCreators"
// import XYLittleHeader from "@/components/little-header"

import {XYHotRecommendWrapper,XYHotRecommendContent} from './style'

export default memo(function XYHotRecommend() {

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    hotRecommend: state.getIn(["recommend","hotRecommend"])
  }),shallowEqual)

  useEffect(() => {
    dispatch(getHotRecommendAction(12))
  },[dispatch])

  const history = useHistory()
  const keywordClick = useCallback((keyword) => {
    history.push(`/discover/playlist?cat=${keyword}`);
  }, [history]);
  return (
    <XYHotRecommendWrapper>
      <XYLittleHeaderRMC title="热门推荐"
                      keywords={["华语", "流行", "摇滚", "民谣", "电子"]}
                      moreLink="/discover/playlist"
                      keywordClick={keywordClick}
                      line={15}
                      isMore={true}></XYLittleHeaderRMC>
      <XYHotRecommendContent>
        {
          state.hotRecommend.map((item) => {
            return (
              <li key={item.id} className="item">
                <XYShowPlayList item={item} width={140}></XYShowPlayList>
              </li>
            )
          })
        }
      </XYHotRecommendContent>
    </XYHotRecommendWrapper>
  )
})
