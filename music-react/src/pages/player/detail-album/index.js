import React, { memo, useEffect } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import {getSizeImage,timestampToTime} from '@/utils/format-utils'
import {
  getShowAlbumAction
} from '../store/actionCreators'
import {saveData} from '@/services/mine-data'

import XYSongTableNoAlbum from '@/components/song-table/no-album'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYComment from '@/components/comment'
import XYPlaySongControl from '@/components/play-song-control'
import {XYPlayerWrapper,XYPlayerLeftContent,XYPlayerRightContent} from './style'
import { NavLink } from 'react-router-dom'
import { Image } from 'antd';

export default memo(function XYDetailAlbum(props) {
  const showId = props.location.search.split("=")[1]

  const state = useSelector(state => ({
    showAlbum: state.getIn(['player','showAlbum']),
    albumComment: state.getIn(['player', 'albumComment']),
    artistAlbums: state.getIn(["player", "artistAlbums"]),
    albumMineComment: state.getIn(['player', "albumMineComment"])
  }),shallowEqual)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getShowAlbumAction(showId))
  },[dispatch, showId])

  useEffect(() => {
    if(state.showAlbum&&state.showAlbum.album&&state.showAlbum.album.id){
      saveData("album", state.showAlbum)
    }
  }, [state.showAlbum])

  const album = state.showAlbum && state.showAlbum.album
  const albumName = album && album.name
  const albumImage = album && album.picUrl
  const artist = album && album.artist.name
  const artistId = album && album.artist.id
  const publishTime = album && album.publishTime
  const company = album && album.company
  const songs = state.showAlbum && state.showAlbum.songs
  const description = album && album.description

  return (
    <XYPlayerWrapper className="wrap-v2">
      <XYPlayerLeftContent>
        <div className='song-detail'>
          <div className='image sprite_covor'>
            {
              albumImage ? <Image src={(albumImage)} width={177}/> :
              <Image
                src="error"
                fallback="data:image/png;base64,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"
              />
            }
          </div>
          <div className='detail'>
            <div className='song-name'>
              <i className='left'>专辑</i>
              <h1 className="text-nowrap">{albumName}</h1>
            </div>
            <div className="other">
              <div className='artist'>
                <span>歌手: </span>
                <NavLink to={`/discover/detailartist/main?id=${artistId}`}>{artist}</NavLink>
              </div>
              <div className='time'>
                <span>发行时间: </span>
                <span>{timestampToTime(publishTime, false)}</span>
              </div>
              <div className='company'>
                <span>发行公司: </span>
                <span>{company}</span>
              </div>
            </div>
            <div className='control'>
              <XYPlaySongControl playSong={songs} type="all" hasAdd={false}
              likeId={showId} likeType={"album"}
              shareInfo={{id:showId,name:albumName,creator:artist,cover:albumImage,type:"专辑"}}></XYPlaySongControl>
            </div>
          </div>
        </div>
        <div className="introduce">
          <span className="title">专辑介绍</span>
          <div>{description}</div>
        </div>
        <XYLittleHeaderRCM title="歌曲列表" moreLink="#/"></XYLittleHeaderRCM>
        <XYSongTableNoAlbum songs={songs}></XYSongTableNoAlbum>
        <XYLittleHeaderRCM title="评论" moreLink="#/"></XYLittleHeaderRCM>
        <div className='comment'>
          <XYComment comments={state.albumComment} mineComments={state.albumMineComment} subInfo={{type:"album",id:showId}}></XYComment>
        </div>
      </XYPlayerLeftContent>
      <XYPlayerRightContent>
        <div className='similarity-playlist'>
            <div className="title">Ta的其他热门专辑</div>
            <ul className="playlist-list">
              {
                state.artistAlbums && state.artistAlbums.map((item) => {
                  return (
                    <li className="item" key={item.id}>
                      <div className="image">
                        <NavLink to={`/discover/detailalbum?id=${item.id}`}>
                          <img src={getSizeImage(item.picUrl, 50)} alt=""/>
                        </NavLink>
                      </div>
                      <div className="info">
                        <NavLink className="playlist-name text-nowrap" to={`/discover/detailalbum?id=${item.id}`}>
                          {item.name}
                        </NavLink>
                        <span className="time">{timestampToTime(item.publishTime, false)}</span>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
      </XYPlayerRightContent>
    </XYPlayerWrapper>
  )
})
