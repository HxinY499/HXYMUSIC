import React, { memo, useEffect,shallowEqual } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { getCurrentRankingAction } from '../store/actionCreators'
import { saveData } from '@/services/mine-data'
import { formatMonthDay, formatMinuteSecond, getSizeImage } from '@/utils/format-utils'
import {
  getSongDetailToPlayListAction,
  changeAddPlayListAction
} from '@/pages/player/store'

import XYComment from '@/components/comment'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYPlaySongControl from '@/components/play-song-control'
import {ClockCircleOutlined, PlaySquareOutlined} from "@ant-design/icons"
import { CurrentRankingWrapper } from "./style"

export default memo(function XYCurrentRanking(props) {
  const showId = props.id
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    currentRanking: state.getIn(['ranking', 'currentRanking']),
    currentRankingComment: state.getIn(['ranking', 'currentRankingComment'])
  }),shallowEqual)

  useEffect(() => {
    dispatch(getCurrentRankingAction(showId))
  }, [dispatch, showId])

  useEffect(() => {
    if(state.currentRanking&&state.currentRanking.id){
      saveData("playlist", state.currentRanking)
    }
  }, [state.currentRanking])

  function play(id){
    dispatch(getSongDetailToPlayListAction(id))
  }

  function addPlaylist(song){
    dispatch(changeAddPlayListAction(song))
  }

  const cover = state.currentRanking && state.currentRanking.coverImgUrl
  const name = state.currentRanking && state.currentRanking.name
  const update = state.currentRanking && state.currentRanking.updateTime
  const description = state.currentRanking && state.currentRanking.description
  const tracks = state.currentRanking && state.currentRanking.tracks
  const creatorName =  state.currentRanking && state.currentRanking.creator && state.currentRanking.creator.nickname

  return (
    <CurrentRankingWrapper>
      <div className="current-ranking-info">
        <div className="current-ranking-cover">
          <img src={getSizeImage(cover, 150)} alt="img"></img>
        </div>
        <div className="current-ranking-detail">
          <div className="current-ranking-name">{name}</div>
          <div className="current-ranking-update">
            <ClockCircleOutlined />
            最近更新： <span className="current-ranking-update-time">{formatMonthDay(update)}</span>
          </div>
          <div className="current-ranking-description text-nowrap" title={description}>{description}</div>
          <div className="current-ranking-control">
            <XYPlaySongControl playSong={tracks} type="all" hasAdd={false}
            likeId={showId} likeType={"playlist"}
            shareInfo={{id:showId,name:name,cover:cover,creator:creatorName,type:"歌单"}}></XYPlaySongControl>
          </div>
        </div>
      </div>
      <XYLittleHeaderRCM title="歌曲列表" moreLink="#/" isMore={false}></XYLittleHeaderRCM>
      <table className='current-ranking-songs'>
        <thead>
          <tr className='select'>
            <th className="text-nowrap"></th>
            <th className="text-nowrap">歌名</th>
            <th className="text-nowrap">时长</th>
            <th className="text-nowrap">歌手</th>
          </tr>
        </thead>
        <tbody>
          {
            tracks && tracks.slice(0,3).map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className="text-nowrap select">{index+1}</td>
                  <td className="text-nowrap" id="hot-td2">
                    <img src={getSizeImage(item.al.picUrl, 50)} alt="img"/>
                    <NavLink to={`/discover/detailsong?id=${item.id}`}>{item.name}</NavLink>
                    {
                      item.mv !== 0 && <NavLink to={`/discover/detailmv?id=${item.mv}`} title="播放mv" 
                                        className="mv"><PlaySquareOutlined/></NavLink>
                    }
                  </td>
                  <td className="text-nowrap" id="hot-td3">
                    <span className="show-time">{formatMinuteSecond(item.dt)}</span>
                    <span className="item-control">
                      <i className="fa fa-play" onClick={e=>{play(item.id)}}></i>
                      <i className="fa fa-plus" onClick={e=>{addPlaylist(item)}}></i>
                    </span>
                  </td>
                  <td className="text-nowrap">
                    <NavLink to={`/discover/detailartist/main?id=${item.ar[0].id}`}>{item.ar[0].name}</NavLink>
                  </td>
                </tr>
              )
            })
          }
          {
            tracks && tracks.slice(3).map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className="text-nowrap select">{index+4}</td>
                  <td className="text-nowrap">
                    <NavLink to={`/discover/detailsong?id=${item.id}`}>{item.name}</NavLink>
                    {item.alia.length>0 && <span style={{"marginLeft":"8px","color":"#aeaeae"}}>{" - "+item.alia[0]}</span>}
                    {
                      item.mv !== 0 && <NavLink to={`/discover/detailmv?id=${item.mv}`} title="播放mv" 
                                        className="mv"><PlaySquareOutlined/></NavLink>
                    }
                  </td>
                  <td className="text-nowrap">
                    <span className="show-time">{formatMinuteSecond(item.dt)}</span>
                    <span className="item-control">
                      <i className="fa fa-play" onClick={e=>{play(item.id)}}></i>
                      <i className="fa fa-plus" onClick={e=>{addPlaylist(item)}}></i>
                    </span>
                  </td>
                  <td className="text-nowrap">
                    <NavLink to={`/discover/detailsong?id=${item.id}`}>{item.al.name}</NavLink>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <XYLittleHeaderRCM title="评论" moreLink="#/" isMore={false}></XYLittleHeaderRCM>
      <div className='comment'>
        <XYComment comments={state.currentRankingComment} subInfo={{type:"playlist",id:showId}}></XYComment>
      </div>
    </CurrentRankingWrapper>
  )
})
