import React, { memo, useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux"

import { getBannerAction } from '../../store/actionCreators'

import { Carousel } from 'antd';
import {
  XYTopBannerWrapper,
  XYTopBannerContent,
  XYTopBannerControl
} from './style' 

export default memo(function XYTopBanner() {

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    banners: state.getIn(["recommend", "topBanners"])
  }),shallowEqual)

  const bannerRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(0)
  const changeImage = useCallback((from, to) => {
    setCurrentIndex(to)
  },[])
  useEffect(() => {
    dispatch(getBannerAction())
  },[dispatch])

  const bgImage = state.banners[currentIndex] && 
                  (state.banners[currentIndex].imageUrl + "?imageView&blur=40x20")

  return (
    <XYTopBannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <XYTopBannerContent>
          <Carousel autoplay={true} effect="fade" 
                    ref={bannerRef} 
                    beforeChange={changeImage}>
            {state.banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img className="image" src={item.imageUrl} alt={item.typeTitle}></img>
                </div>
              )
            })}
          </Carousel>
        </XYTopBannerContent>
        <XYTopBannerControl>
          <button className="btn left" onClick={e => {bannerRef.current.prev()}}></button>
          <button className="btn right" onClick={e => {bannerRef.current.next()}}></button>
        </XYTopBannerControl>
      </div>
    </XYTopBannerWrapper>
  )
})
