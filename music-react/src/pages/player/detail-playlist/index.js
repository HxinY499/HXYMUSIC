import React, { memo, useEffect } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import {getSizeImage,timestampToTime} from '@/utils/format-utils'
import {
  getShowPlaylistAction
} from '../store/actionCreators'
import {saveData} from '@/services/mine-data'

import XYSongTableYesAlbum from '@/components/song-table/yes-album'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYComment from '@/components/comment'
import XYPlaySongControl from '@/components/play-song-control'
import {XYPlayerWrapper,XYPlayerLeftContent,XYPlayerRightContent} from './style'
import { NavLink } from 'react-router-dom'
import { Image } from 'antd';

export default memo(function XYDetailSong(props) {
  const showId = props.location.search.split("=")[1]

  const state = useSelector(state => ({
    showPlaylist: state.getIn(['player','showPlaylist']),
    playlistComment: state.getIn(['player', 'playlistComment']),
    simiPlaylist: state.getIn(['player', 'simiPlaylist']),
    playlistMineComment: state.getIn(['player', "playlistMineComment"])
  }),shallowEqual)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getShowPlaylistAction(showId))
  },[dispatch, showId])
  useEffect(() => {
    if(state.showPlaylist&&state.showPlaylist.id){
      saveData("playlist", state.showPlaylist)
    }
  }, [state.showPlaylist])

  const playlistName = state.showPlaylist && state.showPlaylist.name
  const playImage = state.showPlaylist && state.showPlaylist.coverImgUrl
  const creatorImage = state.showPlaylist&&state.showPlaylist.creator && state.showPlaylist.creator.avatarUrl
  const creatorName = state.showPlaylist&&state.showPlaylist.creator && state.showPlaylist.creator.nickname
  const createTime = state.showPlaylist&&state.showPlaylist.creator && state.showPlaylist.createTime
  const description = state.showPlaylist && state.showPlaylist.description
  const tracks = state.showPlaylist && state.showPlaylist.tracks
  const tags = state.showPlaylist && state.showPlaylist.tags

  return (
    <XYPlayerWrapper className="wrap-v2">
      <XYPlayerLeftContent>
        <div className='song-detail'>
          <div className='image'>
            {
              playImage ? <Image src={playImage} width={200}/> :
              <Image
                src="error"
                fallback="data:image/png;base64,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"
              />
            }
          </div>
          <div className='detail'>
            <div className='song-name'>
              <i className='left'>歌单</i>
              <h1 className="text-nowrap">{playlistName}</h1>
            </div>
            <div className="creator">
              <div className="avatar">
                <img src={getSizeImage(creatorImage, 38)} alt=""/>
              </div>
              <div className="name">{creatorName}</div>
              <div className="time">{timestampToTime(createTime,"YYYY-MM-DD")+" 创建"}</div>
            </div>
            <div className='control'>
              <XYPlaySongControl playSong={tracks} type="all" hasAdd={false}
              likeId={showId} likeType={"playlist"}
              shareInfo={{id:showId,name:playlistName,cover:playImage,creator:creatorName,type:"歌单"}}></XYPlaySongControl>
            </div>
            <div className="tags-wrapper">
              标签：
              {
                tags&&tags.length>0 ? 
                <ul className="tags">
                  {
                    tags.map((item, index)=>{
                      return (
                        <li key={index}><NavLink to={`/discover/playlist?cat=${item}`}>{item}</NavLink></li>
                      )
                    })
                  }
                </ul> :
                <span>暂无标签</span>
              }
            </div>
            <div className="introduce">
              介绍：<p>{description}</p>
            </div>
          </div>
        </div>
        <XYLittleHeaderRCM title="歌曲列表" moreLink="#/"></XYLittleHeaderRCM>
        {
          tracks&&tracks.length>0 ? 
          <XYSongTableYesAlbum songs={tracks}></XYSongTableYesAlbum> :
          <div className="no-data">暂无音乐</div>
        }
        <XYLittleHeaderRCM title="评论" moreLink="#/"></XYLittleHeaderRCM>
        <div className='comment'>
          <XYComment comments={state.playlistComment} mineComments={state.playlistMineComment} subInfo={{type:"playlist",id:showId}}></XYComment>
        </div>
      </XYPlayerLeftContent>
      <XYPlayerRightContent>
        <div className='similarity-playlist'>
            <div className="title">相关推荐</div>
            {
              state.simiPlaylist && state.simiPlaylist.length>0?
              <ul className="playlist-list">
                {
                  state.simiPlaylist && state.simiPlaylist.map((item) => {
                    return (
                      <li className="item" key={item.id}>
                        <div className="image">
                          <NavLink to={`/discover/detailplaylist?id=${item.id}`}>
                            <img src={getSizeImage(item.coverImgUrl, 50)} alt=""/>
                          </NavLink>
                        </div>
                        <div className="info">
                          <NavLink className="playlist-name text-nowrap" to={`/discover/detailplaylist?id=${item.id}`}>
                            {item.name}
                          </NavLink>
                          <span className="creator">by: <span>{item.creator.nickname}</span></span>
                        </div>
                      </li>
                    )
                  })
                }
              </ul> :
              <div style={{"color": "#666"}}>暂无数据</div>
            }
            
          </div>
      </XYPlayerRightContent>
    </XYPlayerWrapper>
  )
})
