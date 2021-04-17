import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import {formatMinuteSecond} from '@/utils/format-utils'
import {
  getSongDetailToPlayListAction,
  changeAddPlayListAction,
} from '@/pages/player/store/actionCreators'
import { NavLink } from 'react-router-dom'
import { PlaySquareOutlined } from '@ant-design/icons'
import {SongTableNoAlbumWrapper} from './style'

export default memo(function XYSongTableNoAlbum(props) {
  const songs = props.songs
  const dispatch = useDispatch()
  function play(id){
    dispatch(getSongDetailToPlayListAction(id))
  }

  function addPlaylist(song){
    dispatch(changeAddPlayListAction(song))
  }
  return (
    <SongTableNoAlbumWrapper>
      <table className='songs'>
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
              songs && songs.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="text-nowrap select">{index+1}</td>
                    <td className="text-nowrap">
                      <NavLink to={`/discover/detailsong?id=${item.id}`}>{item.name}</NavLink>
                      {item.alia.length>0 && <span style={{"marginleft":"8px","color":"#aeaeae"}}>{" - "+item.alia[0]}</span>}
                      {
                        item.mv !== 0 && <NavLink to={`/discover/detailmv?id=${item.mv}`} className="mv" title="播放mv"><PlaySquareOutlined/></NavLink>
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
                      <NavLink to={`/discover/detailartist/main?id=${item.ar[0].id}`}>{item.ar[0].name}</NavLink>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
    </SongTableNoAlbumWrapper>
  )
})
