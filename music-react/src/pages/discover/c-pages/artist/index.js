import React, { memo, useEffect, shallowEqual, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'

import { allArtistCategory } from '@/common/local-data'
import { getArtistsAction } from './store/actionCreators'

import { ArtistWrapper, ArtistCategoryWrapper, ArtistContentWrapper } from './style'
import XYShowArtist from '@/components/show-artist'

export default memo(function XYArtist() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    artists: state.getIn(['artist', "artists"])
  }), shallowEqual)
  const [type, setType] = useState(-1)
  const [area, setArea] = useState(-1)
  const [initial, setInitial] = useState(-1)
  useEffect(()=>{
    dispatch(getArtistsAction(type, area, initial))
  },[dispatch,type,area,initial])
  function handleChange(data, type){
    switch (type) {
      case "area":
        setArea(data)
        break;
      case "type":
        setType(data)
        break;
      case "initial":
        setInitial(data)
        break;
      default:
        break;
    }
  }
  return (
    <ArtistWrapper className="wrap-v2">
      <ArtistCategoryWrapper>
        <ul>
          {
            allArtistCategory[0].map((item, index)=>{
              return(<li key={index} className={classnames({"area-active":item[1]===area,
              "active":item[1]===area})} onClick={()=>{handleChange(item[1], "area")}}>{item[0]}</li>)
            })
          }
        </ul>
        <ul>
          {
            allArtistCategory[1].map((item, index)=>{
              return(<li key={index} className={classnames({"type-active":item[1]===type,
              "active":item[1]===type})} onClick={()=>{handleChange(item[1], "type")}}>{item[0]}</li>)
            })
          }
        </ul>
        <ul>
          {
            allArtistCategory[2].map((item, index)=>{
              return(<li key={index} className={classnames({"initial-active":item[1]===initial,
              "active":item[1]===initial})} onClick={()=>{handleChange(item[1], "initial")}}>{item[0]}</li>)
            })
          }
        </ul>
      </ArtistCategoryWrapper>
      <ArtistContentWrapper>
        {
          state.artists&&state.artists.map(item=>{
            return (
              <div className="show-block" key={item.id}><XYShowArtist artist={item}></XYShowArtist></div>
            )
          })
        }
      </ArtistContentWrapper>
    </ArtistWrapper>
  )
})
