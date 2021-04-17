import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {renderRoutes} from "react-router-config"
import { NavLink } from 'react-router-dom'

import {getShowArtistAction} from '../store/actionCreators'
import {getSizeImage} from '@/utils/format-utils'
import {saveData} from '@/services/mine-data'

import { Image } from 'antd';
import XYPlaySongControl from '@/components/play-song-control'
import { DetailArtistWrapper,DetailArtistLeft,DetailArtistRight } from './style'

export default memo(function XYDetailArtist(props) {
  const showId = parseInt(props.location.search.split("=")[1])
  const routes = props.route.routes
  const dispatch = useDispatch()
  const state = useSelector(state=>({
    artistSongs: state.getIn(['player', 'artistSongs']),
    artistSimi: state.getIn(['player', 'artistSimi'])
  }),shallowEqual)

  useEffect(()=>{
    dispatch(getShowArtistAction(showId, "main"))
  },[dispatch, showId])

  useEffect(() => {
    document.getElementById("likeartist").getElementsByClassName("other-btn")[0].
    firstElementChild.childNodes[1].data="关注歌手"
  }, [])

  useEffect(() => {
    if(state.artistSongs&&state.artistSongs.artist&&state.artistSongs.artist.id){
      saveData("artist", state.artistSongs.artist)
    }
  }, [state.artistSongs])

  const zhName = state.artistSongs && state.artistSongs.artist && state.artistSongs.artist.name
  const enName = state.artistSongs && state.artistSongs.artist && state.artistSongs.artist.alias[0]
  const artistPic = state.artistSongs && state.artistSongs.artist && state.artistSongs.artist.picUrl
  return (
    <DetailArtistWrapper className="wrap-v2">
      <DetailArtistLeft>
        <div className="name-wrapper">
          <span className="zh-name">{zhName}</span>
          <span className="en-name">{enName}</span>
        </div>
        <div className="artistPic">
          <img src={getSizeImage(artistPic, 640, 300)} alt={zhName} className="show-img"/>
          <Image src={artistPic} className="big-img"/>
          <div className='control' id="likeartist">
            <XYPlaySongControl likeId={showId} likeType={"artist"}></XYPlaySongControl>
          </div>
        </div>
        <ul className="menu">
          <li><NavLink to={`/discover/detailartist/main?id=${showId}`}>热门作品</NavLink></li>
          <li><NavLink to={`/discover/detailartist/album?id=${showId}`}>所有专辑</NavLink></li>
          <li><NavLink to={`/discover/detailartist/mv?id=${showId}`}>相关MV</NavLink></li>
          <li><NavLink to={`/discover/detailartist/desc?id=${showId}`}>艺人介绍</NavLink></li>
        </ul>
        {renderRoutes(routes)}
      </DetailArtistLeft>
      <DetailArtistRight>
        <div className="simi-artist">
          <div className="title">相似歌手</div>
          <ul className="content">
            {
              state.artistSimi&&state.artistSimi.slice(0,6).map((item)=>{
                return(
                  <li key={item.id} title={item.name}>
                    <NavLink to={`/discover/detailartist/main?id=${item.id}`} className="img">
                      <img src={getSizeImage(item.picUrl,50)} alt={item.name}/>
                    </NavLink>
                    <NavLink to={`/discover/detailartist.mian?id=${item.id}`} 
                    className="name text-nowrap">{item.name}</NavLink>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </DetailArtistRight>
    </DetailArtistWrapper>
  )
})
