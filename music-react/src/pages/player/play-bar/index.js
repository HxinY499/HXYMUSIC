import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'

import {
  changeSequenceAction,
  changeCurrentSongAndIndexAction,
  changeCurrentLyricIndexAction,
  changeCurrentSongFromPanelAction,
  changeDeleteSongAction
} from '../store/actionCreators'
import { getSizeImage, formatDate,getPlayUrl } from '@/utils/format-utils'
import { setHistory } from "@/services/user"

import { Slider, message } from 'antd';
import { CaretRightOutlined,DeleteOutlined } from "@ant-design/icons"
import {
  XYPlayBarWrapper,
  XYPlayBarContent,
  XYPlayBarControl,
  XYPlayBarPlayinfo,
  XYPlayBarOperate
} from './style'
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

export default memo(function XYPlayBar(props) {
  
  const dispatch = useDispatch()

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [volume, setVolume] = useState(false)
  const [playlistPanel, setPlaylistPanel] = useState(false)

  const audioRef = useRef()
  const state = useSelector( state => ({
    currentSong: state.getIn(["player", "currentSong"]),
    currentSongIndex: state.getIn(["player", "currentSongIndex"]),
    playList: state.getIn(["player", "playList"]),
    sequence: state.getIn(["player", "sequence"]),
    lyric: state.getIn(["player", "lyric"]),
    currentLyricIndex: state.getIn(["player", "currentLyricIndex"]),
    loginUser: state.getIn(['user', "loginUser"])
  }), shallowEqual )
  const {currentSong} = state
  
  useEffect(() => {
    audioRef.current.src = getPlayUrl(currentSong.id)
    setDuration(currentSong.dt);
    audioRef.current.play().then(res => {
      setIsPlaying(true)
      
    }).catch(res => {
      setIsPlaying(false)
    })
  }, [currentSong]);

  useEffect(() => {
    //生成播放历史
    if(state.loginUser&&state.loginUser.username){
      setHistory(state.loginUser.username, "song", currentSong)
    }
  }, [currentSong, state.loginUser])

  const play = useCallback(() => {
    setIsPlaying(!isPlaying);
    isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(err => {
      setIsPlaying(false);
    });
  }, [isPlaying]);

  const timeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    if (!isChanging) {
      setCurrentTime(currentTime);
      setProgress((currentTime * 1000) / duration * 100);
    }

    let lrcLength = state.lyric.length;
    let i = 0;
    for (; i < lrcLength; i++) {
      const lrcTime = state.lyric[i].time;
      if (currentTime * 1000 < lrcTime) {
        break
      }
    }
    const finalIndex = i - 1;
    if (finalIndex !== state.currentLyricIndex) {
      dispatch(changeCurrentLyricIndexAction(finalIndex));
      message.open({
        content: state.lyric[finalIndex] && state.lyric[finalIndex].content,
        key: "lyric",
        duration: 0,
        className: 'lyric-message',
      })
    }
  }

  const timeEnded = () => {
    if(state.playList.length === 1){
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }else{
      switch (state.sequence) {
        case 2:
          audioRef.current.currentTime = 0;
          audioRef.current.play();
          break;
        default:
          dispatch(changeCurrentSongAndIndexAction(1))
          break;
      }
    }
  }

  const sliderChange = useCallback((value) => {
    setProgress(value);
    const time = value / 100.0 * duration / 1000;
    setCurrentTime(time);
    setIsChanging(true);
  }, [duration])

  const sliderAfterChange = useCallback((value) => {
    const time = value / 100.0 * duration / 1000;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
    setIsChanging(false);

    if (!isPlaying) {
      play();
    }
  }, [duration, isPlaying, play]);

  const changeSequence = () => {
    let newSwquence = state.sequence + 1
    if(newSwquence > 2){
      newSwquence = 0
    }
    dispatch(changeSequenceAction(newSwquence))
  }
  const changeSong = (tag) => {
    if(state.playList.length === 0)return
    else if(state.playList.length === 1){
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }else{
      dispatch(changeCurrentSongAndIndexAction(tag))
    }
  }

  const volumeChange = (value) => {
    audioRef.current.volume = parseFloat(value/100);
  }
  const deleteSong = (event,id,index) => {
    event.stopPropagation();
    dispatch(changeDeleteSongAction(id,index))
  }

  const songImage = (currentSong.al && currentSong.al.picUrl) || ""
  const songName = currentSong && currentSong.name
  const singerName = currentSong.ar && currentSong.ar[0].name
  const id = state.currentSong && state.currentSong.id
  const artistId = state.currentSong&&state.currentSong.ar&&state.currentSong.ar[0]&&state.currentSong.ar[0].id

  return (
    <XYPlayBarWrapper className="sprite_playbar">
      <XYPlayBarContent className="wrap-v2">
        <XYPlayBarControl isPlaying={isPlaying}>
          <button className="sprite_playbar btn prev" onClick={e => changeSong(-1)}></button>
          <button className="sprite_playbar btn play" onClick={e => play()}></button>
          <button className="sprite_playbar btn next" onClick={e => changeSong(1)}></button>
        </XYPlayBarControl>
        <XYPlayBarPlayinfo>
        <div className="image">
            <NavLink to={`/discover/detailsong?id=${id}`}>
              <img src={getSizeImage(songImage, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">
                <NavLink to={`/discover/detailsong?id=${id}`}>{songName}</NavLink>
              </span>
              <span className="singer-name">
                <NavLink to={`/discover/detailartist/main?id=${artistId}`}>{singerName}</NavLink>
              </span>
            </div>
            <div className="progress">
              <Slider value={progress} onChange={sliderChange} onAfterChange={sliderAfterChange} />
              <div className="time">
                <span className="now-time">{formatDate(currentTime*1000, "mm:ss")}</span>
                <span className="divider">/</span>
                <span className="total-time">{formatDate(duration, "mm:ss")}</span>
              </div>
            </div>
          </div>
        </XYPlayBarPlayinfo>
        <XYPlayBarOperate sequence={state.sequence}>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume" onClick={()=>{setVolume(!volume);setPlaylistPanel(false)}}></button>
            <CSSTransition in={volume} classNames="ani" timeout={1000} unmountOnExit={true}>
              <div className="volume-wrapper"><Slider defaultValue={100} onChange={volumeChange} vertical/></div>       
            </CSSTransition>
            <button className="sprite_playbar btn loop" onClick={e => {changeSequence()}}></button>
            <button className="sprite_playbar btn playlist" onClick={()=>{setPlaylistPanel(!playlistPanel);setVolume(false)}}>
              {state.playList.length}
            </button>
          </div>
          <CSSTransition in={playlistPanel} classNames="ani" timeout={1000} unmountOnExit={true}>
            <div className="playlist-panel">
              <div className="playlist-panel-title">播放列表({state.playList.length})</div>
              <ul>
                {
                  state.playList&&state.playList.map((item,index) => {
                    return (
                      <li key={item.id} className={state.currentSongIndex===index?"li-active":""}
                      onClick={()=>{dispatch(changeCurrentSongFromPanelAction(index))}}>
                        <CaretRightOutlined className="playlist-panel-playicon"/>
                        <span className="playlist-panel-name text-nowrap" title={item.name}>{item.name}</span>
                        <span className="control-wrapper">
                          <DeleteOutlined className="delete" onClick={(e)=>{deleteSong(e,item.id,index)}}
                          title="删除"/>
                        </span>
                        <NavLink to={`/discover/detailartist/main?id=${item.ar[0].id}`}
                        className="playlist-panel-artist text-nowrap" title={item.ar[0].name}>{item.ar[0].name}</NavLink>
                        <span className="playlist-panel-time">{formatDate(item.dt, "mm:ss")}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </CSSTransition>
        </XYPlayBarOperate>
      </XYPlayBarContent>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={timeEnded}/> 
    </XYPlayBarWrapper>
  )
})
