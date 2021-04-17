import React, { memo } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import {DetailArtistSongWrapper} from './style'
import XYSongTableYesAlbum from '@/components/song-table/yes-album'
import XYPlaySongControl from '@/components/play-song-control'
export default memo(function XYDetailArtistSong() {
  const state = useSelector(state=>({
    artistSongs: state.getIn(['player', 'artistSongs'])
  }),shallowEqual)
  return (
    <DetailArtistSongWrapper>
      <div className="control">
        <XYPlaySongControl playSong={state.artistSongs&&state.artistSongs.hotSongs} 
          type="all" hasAdd={false} hasOther={false} notOther={true}/>
      </div>
      {
        state.artistSongs&&state.artistSongs.length === 0 ? <div>暂无数据</div> :
        <XYSongTableYesAlbum songs={state.artistSongs&&state.artistSongs.hotSongs}></XYSongTableYesAlbum>
      }
    </DetailArtistSongWrapper>
  )
})
