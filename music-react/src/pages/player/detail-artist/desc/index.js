import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {getShowArtistAction} from '../../store/actionCreators'
import { textParse } from "@/utils/parse";

import {DetailArtistDescWrapper} from './style'

export default memo(function XYDetailArtistDesc(props) {
  const showId = parseInt(props.location.search.split("=")[1])
  const dispatch = useDispatch()
  
  const state = useSelector(state=>({
    artistDesc: state.getIn(['player', 'artistDesc']),
    artistSongs: state.getIn(['player', 'artistSongs'])
  }),shallowEqual)

  useEffect(()=>{
    dispatch(getShowArtistAction(showId, "desc"))
  },[dispatch, showId])

  const name = state.artistSongs&&state.artistSongs.artist&&state.artistSongs.artist.name
  const briefDesc = textParse(state.artistDesc && state.artistDesc.briefDesc)

  useEffect(() => {
    document.getElementById("artist-desc").innerHTML = briefDesc
    console.log(briefDesc)
  }, [briefDesc])

  return (
    <DetailArtistDescWrapper>
      <div className="briefDesc">
        <div className="big-title title">{name+"简介"}</div>
        <div className="content" id="artist-desc"></div>
      </div>
      <ul className="introduction">
        {
          state.artistDesc&&state.artistDesc.introduction&&state.artistDesc.introduction.length === 0 ? <div>暂无数据</div> :
          state.artistDesc&&state.artistDesc.introduction&&state.artistDesc.introduction.map((item, index)=>{
            return (
              <li key={index}>
                <div className="small-title title">{item.ti}</div>
                <div className="content">{item.txt}</div>
              </li>
            )
          })
        }
      </ul>
    </DetailArtistDescWrapper>
  )
})
