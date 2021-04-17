import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import { getSizeImage } from '@/utils/format-utils';
import { 
  getSongDetailToPlayListAction,
  changeAddPlayListAction,
  changeSongListToPlayListAction 
} from '@/pages/player/store';

import { TopRankingWrapper } from './style';

export default memo(function XYTopRanking(props) {
  // props and state
  const { info } = props;
  const { tracks = [] } = info;

  // redux hooks
  const dispatch = useDispatch();

  // other handle
  const history = useHistory()
  const playMusic = (id) => {
    history.push(`/discover/detailsong?id=${id}`);
  }

  function play(id){
    dispatch(getSongDetailToPlayListAction(id))
  }

  function addPlaylist(song){
    dispatch(changeAddPlayListAction(song))
  }

  function allAddPlaylist(songList){
    dispatch(changeSongListToPlayListAction(songList))
  }

  return (
    <TopRankingWrapper bg={info.coverImgUrl + "?imageView&blur=40x10"}>
      <div className="header">
        <div className="info">
          <span className="name">{info.name}</span>
          <span className="control" onClick={e=>{allAddPlaylist(tracks)}}>
            <i className="fa fa-play"></i>
          </span>
        </div>
      </div>
      <div className="list">
        { 
          tracks.slice(0, 10).map((item, index) => {
            return (
              <div key={item.id} className="list-item">
                <div className="rank select">{index + 1}</div>
                <div className="info">
                  <div className="song" onClick={e=>{playMusic(item.id)}}>
                    {item.name}
                  </div>
                  <div className='item-control'>
                    <i className="fa fa-play" onClick={e=>{play(item.id)}}></i>
                    <i className="fa fa-plus" onClick={e=>{addPlaylist(item)}}></i>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </TopRankingWrapper>
  )
})
