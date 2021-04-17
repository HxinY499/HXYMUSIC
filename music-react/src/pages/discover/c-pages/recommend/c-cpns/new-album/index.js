import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getNewAlbumAction } from "../../store/actionCreators";

import { Carousel } from 'antd';
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYShowAlbum from "@/components/show-album"
import {XYNewAlbumWrapper,XYNewAlbumContent} from './style'

export default memo(function XYNewAlbum() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNewAlbumAction(12))
  },[dispatch])

  const state = useSelector(state => ({
    newAlbum: state.getIn(["recommend", "newAlbum"])
  }), shallowEqual)

  const carouselRef = useRef()

  return (
    <XYNewAlbumWrapper>
      <XYLittleHeaderRCM title="新碟上架" moreLink="/discover/album" isMore={true}></XYLittleHeaderRCM>
      <XYNewAlbumContent>
        <button className="left sprite_02" 
                onClick={e => {carouselRef.current.prev()}}></button>
        <Carousel className="rcm-carousel" dots={false} ref={carouselRef}>
          {
            [0,1].map((item, index) => {
              return (
                <div key={item} className="album-page">
                  {
                    state.newAlbum.slice(item*6, (item+1)*6).map(item => {
                      return (
                        <div className="item" key={item.id} >
                          <XYShowAlbum info={item} width={118} height={142}/>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </Carousel>
        <button className="right sprite_02"
                onClick={e => {carouselRef.current.next()}}></button>
      </XYNewAlbumContent>
    </XYNewAlbumWrapper>
  )
})
