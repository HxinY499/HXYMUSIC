import React, { memo, useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getShowMVAction, getMVUrlAction } from "../store/actionCreators";
import { getSizeImage, formatMinuteSecond, getCount } from "@/utils/format-utils"
import { setHistory } from "@/services/user"
import {saveData} from '@/services/mine-data'

import XYComment from '@/components/comment'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYPlaySongControl from '@/components/play-song-control'
import {DetailMVWrapper,DetailMVLeft,DetailMVRight} from './style'
import {VideoCameraOutlined} from '@ant-design/icons'

export default memo(function XYDetailMV(props) {
  const showId = parseInt(props.location.search.split("=")[1])
  const dispatch = useDispatch()
  const mvRef = useRef()
  const state = useSelector(state => ({
    showMV: state.getIn(["player", "showMV"]),
    mvUrl: state.getIn(['player', 'mvUrl']),
    mvComment: state.getIn(['player', 'mvComment']),
    simiMV: state.getIn(['player', 'simiMV']),
    loginUser: state.getIn(['user', 'loginUser']),
    mvMineComment: state.getIn(['player', "mvMineComment"])
  }), shallowEqual)
  const [br, setBr] = useState([])
  const [currentBr, setCurrentBr] = useState()
  const {mvUrl} = state

  useEffect(() => {
    dispatch(getShowMVAction(showId))
  }, [dispatch, showId]);

  useEffect(() => {
    mvRef.current.src = mvUrl.url;
    mvRef.current.play().then(res => {
    }).catch(res => {
      console.log(res)
    })
  }, [mvUrl]);

  useEffect(() => {
    //生成播放历史
    if(state.loginUser&&state.loginUser.username){
      let mediaData = state.showMV
      mediaData.id = state.showMV&&state.showMV.data&&state.showMV.data.id
      setHistory(state.loginUser.username, "mv", mediaData)
    }
  }, [state.loginUser, state.showMV])

  useEffect(() => {
    const brs = state.showMV&&state.showMV.data&&state.showMV.data.brs
    let arr = []
    if(brs instanceof Array && brs.length>0){
      brs.forEach(item=>{
        switch (item.br) {
          case 1080:
            arr.push({br:1080, name:"1080P"})
            break;
          case 720:
            arr.push({br:720, name:"超 清"})
            break;
          case 480:
            arr.push({br:480, name:"高 清"})
            break;
          case 240:
            arr.push({br:240, name:"标 清"})
            break;
          default:
            break;
        }
      })
      setBr(arr)
      setCurrentBr(arr[0].name)
    }
    if(state.showMV&&state.showMV.data){
      saveData("mv", state.showMV)
    }
  }, [state.showMV])

  function changeBr(br){
    setCurrentBr(br.name)
    dispatch(getMVUrlAction(showId, br.br))
  }
  const mvName = state.showMV&&state.showMV.data&&state.showMV.data.name
  const artistId = state.showMV&&state.showMV.data&&state.showMV.data.artistId
  const artistName = state.showMV&&state.showMV.data&&state.showMV.data.artistName
  const mvCover = (state.showMV&&state.showMV.data&&state.showMV.data.imgurl) || (state.showMV&&state.showMV.data&&state.showMV.data.cover)

  return (
    <DetailMVWrapper className="wrap-v2">
      <DetailMVLeft>
        <div className="big-title">
          <span className="icon">MV</span>
          <span className="mv-name">{mvName}</span>
          <NavLink to={`/discover/detailartist?id=${artistId}`} 
          className="artist-name">
            {artistName}
          </NavLink>
          <span className="artist-name"></span>
          <div className="radio">
            {currentBr}
            <ul>
              {
                br&&br.map(item=>{
                  return (
                    <li key={item.br} className={currentBr===item.name?"active":""}
                    onClick={()=>{changeBr(item)}}>{item.name}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        
        <div className="play-banel">
          <video ref={mvRef} controls></video>
        </div>
        <div className='control'>
          <XYPlaySongControl likeId={showId} likeType={"mv"}
          shareInfo={{id:showId,name:mvName,cover:mvCover,creator:artistName,type:"MV"}}></XYPlaySongControl>
        </div>
        <XYLittleHeaderRCM title="评论" isMore={false}></XYLittleHeaderRCM>
        <div className='comment'>
          <XYComment comments={state.mvComment} mineComments={state.mvMineComment} subInfo={{type:"mv",id:showId}}></XYComment>
        </div>
      </DetailMVLeft>
      <DetailMVRight>
        <div className="mv-des">
          <div className="title">mv简介</div>
          <span className="publish-time">
            发布时间：{state.showMV&&state.showMV.data&&state.showMV.data.publishTime}</span>
          <span className="playCount">
            播放次数：{getCount(state.showMV&&state.showMV.data&&state.showMV.data.playCount)}</span>
          <div className="content">{(state.showMV&&state.showMV.data&&state.showMV.data.desc)||"暂无数据"}</div>
        </div>
        <div className="simi-mv">
          <div className="title">相关mv</div>
          <ul>
            {
              state.simiMV&&state.simiMV.map(item => {
                return (
                  <li key={item.id}>
                    <div className="mv-cover">
                      <NavLink to={`/discover/detailmv?id=${item.id}`} className="cover" title={item.name}>
                        <img src={getSizeImage(item.cover, 96, 54)} alt={item.name}/>
                        <VideoCameraOutlined className="video-icon"/>
                      </NavLink>
                    </div>
                    <div className="mv-info text-nowrap">
                      <NavLink to={`/discover/detailmv?id=${item.id}`} className="name text-nowrap" title={item.name}>
                        {item.name}
                      </NavLink>
                      <span className="time text-nowrap">{formatMinuteSecond(item.duration)}</span>
                      <NavLink to={`/discover/detailartist/main?id=${item.artists[0].id}`}
                      className="artist text-nowrap" title={item.artists[0].name}>{item.artists[0].name}</NavLink>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </DetailMVRight>
    </DetailMVWrapper>
  )
})
