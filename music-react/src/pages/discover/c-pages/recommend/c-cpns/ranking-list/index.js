import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getTopListAction } from '../../store/actionCreators'

import XYLittleHeaderRCM from "@/components/little-header-rcm"
import XYTopRanking from "../top-ranking"
import {XYRankingListWrapper} from './style'

export default memo(function XYRankingList() {

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    topUpRanking: state.getIn(["recommend", "topUpRanking"]),
    topNewRanking: state.getIn(["recommend", "topNewRanking"]),
    topHotRanking: state.getIn(["recommend", "topHotRanking"]),
    topOriginRanking: state.getIn(["recommend", "topOriginRanking"])
  }),shallowEqual)

  useEffect(() => {
    dispatch(getTopListAction(19723756))
    dispatch(getTopListAction(3779629))
    dispatch(getTopListAction(2884035))
    dispatch(getTopListAction(3778678))
  },[dispatch])
  return (
    <XYRankingListWrapper>
      <XYLittleHeaderRCM title="榜单" moreLink="/discover/ranking" isMore={true}></XYLittleHeaderRCM>
      <div className="tops">
        <XYTopRanking info={state.topUpRanking}/>
        <XYTopRanking info={state.topNewRanking}/>
        <XYTopRanking info={state.topOriginRanking}/>
        <XYTopRanking info={state.topHotRanking}/>
      </div>
    </XYRankingListWrapper>
  )
})
