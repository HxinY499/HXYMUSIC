import React, { memo, useCallback, useEffect, useState } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import {getShowSongAction,getSongDetailToPlayListAction,changeAddPlayListAction} from '../store/actionCreators'
import {saveData} from '@/services/mine-data'
import {getMineCreatePlaylistsDetail,songToPlaylist} from '@/services/playlist'

import XYComment from '@/components/comment'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYPlaySongControl from '@/components/play-song-control'
import {XYPlayerWrapper,XYPlayerLeftContent,XYPlayerRightContent} from './style'
import { NavLink, useHistory } from 'react-router-dom'
import { Image, Modal, message } from 'antd';
import { PlaySquareOutlined } from '@ant-design/icons'


export default memo(function XYDetailSong(props) {
  const showId = props.location.search.split("=")[1]
  const [isMore, setIsMore] = useState(true)
  const [more, setMore] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [collectPlaylist, setCollectPlaylist] = useState([])
  const history = useHistory()

  const state = useSelector(state => ({
    showSong : state.getIn(['player','showSong']),
    lyric: state.getIn(["player","showSongLyric"]),
    simiSong: state.getIn(["player","simiSong"]),
    songComment: state.getIn(['player', 'songComment']),
    songMineComment: state.getIn(['player', "songMineComment"]),
    loginUser: state.getIn(['user', 'loginUser'])
  }),shallowEqual)

  useEffect(() => {
    if(state.lyric.length <= 12 && state.lyric.length>0){
      setIsMore(false)
    }
  },[state.lyric])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getShowSongAction(showId))
  },[dispatch, showId])

  useEffect(() => {
    if(state.showSong&&state.showSong.id){
      saveData("song", state.showSong)
    }
  }, [state.showSong])

  useEffect(()=>{
    if(state.loginUser&&state.loginUser.createPlaylists&&state.loginUser.createPlaylists.length>0){
      getMineCreatePlaylistsDetail(state.loginUser.createPlaylists.join(",")).then(res=>{
        if(res.data.success === "true"){
          setCollectPlaylist(res.data.playlists)
          console.log(res.data.playlists)
        }else{
          setCollectPlaylist([])
        }
      })
    }
  },[state.loginUser])

  function changeMore(){
    setMore(!more)
  }

  function play(id){
    dispatch(getSongDetailToPlayListAction(id))
  }

  function addPlaylist(song){
    dispatch(changeAddPlayListAction(song))
  }

  function playMV(mv){
    history.push(`/discover/detailmv?id=${mv}`)
  }

  function handleCancel(){
    setIsModalVisible(false)
  }

  function handleCollect(id){
    songToPlaylist(id, showId).then(res=>{
      if(res.data.success==="true"){
        message.success({content:"已加入歌单",className: 'suc-message'});
      }else{
        if(res.data.reason==="alreadyExist"){
          message.error({content:"歌曲已存在",className: 'err-message'});
        }else{
          message.error({content:"收藏失败",className: 'err-message'});
        }
      }
    },err=>{
      message.error({content:"收藏失败",className: 'err-message'});
    })
    setIsModalVisible(false)
  }
  
  const collectSong = useCallback(()=>{
    setIsModalVisible(true)
  },[])

  const songImage = (state.showSong.al && state.showSong.al.picUrl)
  const songName = state.showSong && state.showSong.name
  const singerName = state.showSong.ar && state.showSong.ar[0].name
  const singerId = state.showSong.ar && state.showSong.ar[0].id
  const albumName = state.showSong.al && state.showSong.al.name
  const mv = state.showSong && state.showSong.mv
  const albumId = state.showSong.al && state.showSong.al.id

  return (
    <XYPlayerWrapper className="wrap-v2">
      <XYPlayerLeftContent more={more} mv={mv}>
        <div className='song-detail'>
          <div className='image'>
            <div className='top sprite_covor'></div>
            {
              songImage ? <Image src={songImage}/> :
              <Image
                src="error"
                fallback="data:image/png;base64,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"
              />
            }
          </div>
          <div className='detail'>
            <div className='song-name'>
              <i className='left'>单曲</i>
              <h1 className="text-nowrap">{songName}</h1>
              <PlaySquareOutlined className="right" onClick={()=>{playMV(mv)}}/>
            </div>
            <div className='singer-name'>
              <span className='top'>
                歌手：<NavLink to={`/discover/detailartist/main?id=${singerId}`}>{singerName}</NavLink>
              </span>
              <span className='bottom'>
                所属专辑：<NavLink to={`/discover/detailalbum?id=${albumId}`}>{albumName}</NavLink>
              </span>
            </div>
            <div className='control'>
              <XYPlaySongControl playSong={state.showSong&&state.showSong.id}
                type={"single"} songToPlaylist={state.showSong} hasAdd={true}
                likeId={showId} likeType={"song"} collectSong={collectSong}
                shareInfo={{id:showId,name:songName,cover:songImage,creator:singerName,type:"歌曲"}}></XYPlaySongControl>
            </div>
            {
              isMore ? 
              <div className='lyric'>
                <div className='top'>
                  {
                    state.lyric.slice(0,12).map((item, index) => {
                      return (
                        <div key={index}>
                          <span>{item.content}</span>
                        </div>
                      )
                    })
                  }
                </div>
                <div className={"bottom"}>
                  {
                    state.lyric.slice(12,state.lyric.length).map((item, index) => {
                      return (
                        <div key={index}>
                          <span>{item.content}</span>
                        </div>
                      )
                    })
                  }
                </div>
                <div className={"more"} 
                     onClick={e => {changeMore()}}>{more ? "收起" : "展开"}</div>
              </div> : 
              <div className='lyric'>
                {
                    state.lyric.map((item, index) => {
                      return (
                        <div key={index}>
                          <span>{item.content}</span>
                        </div>
                      )
                    })
                }
              </div>
            }         
          </div>
        </div>
        <XYLittleHeaderRCM title="评论" moreLink="#/"></XYLittleHeaderRCM>
        <div className='comment'>
          <XYComment comments={state.songComment} mineComments={state.songMineComment} subInfo={{type:"song",id:showId}}></XYComment>
        </div>
      </XYPlayerLeftContent>
      <XYPlayerRightContent>
        <div className='similarity-song'>
          <div className="title">相似歌曲</div>
          <ul className="song-list">
            {
              state.simiSong && state.simiSong.map((item) => {
                return (
                  <li className="item" key={item.id}>
                    <div className="info text-nowrap">
                      <NavLink to={`/discover/detailsong?id=${item.id}`}>{item.name}</NavLink>
                      <span className="artist-name">{item.artists[0].name}</span>
                    </div>
                    <div className="control">
                      <i className="fa fa-play" onClick={e=>{play(item.id)}}></i>
                      <i className="fa fa-plus" onClick={e=>{addPlaylist(item)}}></i>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </XYPlayerRightContent>
      <Modal title="添加到歌单" 
             visible={isModalVisible} 
             getContainer={false}
             centered
             onCancel={handleCancel}
             className="login-modal mine-modal">
        <ul className="collectModal">
          {
            collectPlaylist&&collectPlaylist.map(item=>{
              return (
                <li key={item.id} className="playlist-item" onClick={()=>{handleCollect(item.id)}}>
                  <div className="cover"><img src={item.picUrl} alt={item.name}/></div>
                  <div className="detail">
                    <div>{item.name}</div>
                    <div>{item.trackCount}首</div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </Modal>
    </XYPlayerWrapper>
  )
})
