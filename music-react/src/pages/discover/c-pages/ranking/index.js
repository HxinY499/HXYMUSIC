import React, { memo, useEffect, shallowEqual } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'

import {getSizeImage} from "@/utils/format-utils"
import { getAllRankingAction } from './store/actionCreators'

import {RankingWrapper,RankingContentLeft,RankingContentRight} from './style'
import XYCurrentRanking from './currentRanking'
import { NavLink } from 'react-router-dom'

export default memo(function XYRanking(props) {
  const showId = parseInt(props.location.search.split("=")[1]) || 19723756
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllRankingAction())
  },[dispatch])
  const state = useSelector((state) => ({
    allRanking: state.getIn(['ranking', 'allRanking'])
  }), shallowEqual)

  return (
    <RankingWrapper className="wrap-v2">
      <RankingContentLeft>
        <div className="ranking-title ranking-title1">云音乐特色榜</div>
        <ul className="ranking-wrapper">
          {
            state.allRanking.slice(0, 4).map((item) => {
              return (
                <li key={item.id}>
                  <NavLink to={`/discover/ranking?id=${item.id}`} 
                  className={classnames({"ranking-item":true,"active-link":showId===item.id})}>
                    <img className="ranking-cover" src={getSizeImage(item.coverImgUrl, 40)} alt={item.name}/>
                    <div className="ranking-item-info">
                      <span className="ranking-item-name">{item.name}</span>
                      <span className="ranking-item-update">{item.updateFrequency}</span>
                    </div>
                  </NavLink>
                </li>
              )
            })
          }
        </ul>
        <div className="ranking-title ranking-titl2">全球媒体榜</div>
        <ul className="ranking-wrapper">
          {
            state.allRanking.slice(4).map((item) => {
              return (
                <li key={item.id}>
                  <NavLink to={`/discover/ranking?id=${item.id}`} 
                  className={classnames({"ranking-item":true,"active-link":showId===item.id})}>
                    <img className="ranking-cover" src={getSizeImage(item.coverImgUrl, 40)} alt={item.name}/>
                    <div className="ranking-item-info">
                      <span className="ranking-item-name">{item.name}</span>
                      <span className="ranking-item-update">{item.updateFrequency}</span>
                    </div>
                  </NavLink>
                </li>
              )
            })
          }
        </ul>
      </RankingContentLeft>
      <RankingContentRight>
        <XYCurrentRanking id={showId}></XYCurrentRanking>
      </RankingContentRight>
    </RankingWrapper>
  )
})
