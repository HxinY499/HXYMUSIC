import React, { memo, useEffect, useState, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {getShowArtistAction} from '../../store/actionCreators'
import {timestampToTime} from '@/utils/format-utils'

import XYShowAlbum from '@/components/show-album'
import XYPagination from "@/components/pagination"
import {DetailArtistAlbumWrapper} from './style'

export default memo(function XYDetailArtistAlbum(props) {
  const showId = parseInt(props.location.search.split("=")[1])
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [albumIndex, setAlbumIndex] = useState(0)
  const state = useSelector(state=>({
    artistAlbums: state.getIn(['player', 'artistAlbums'])
  }),shallowEqual)

  useEffect(()=>{
    dispatch(getShowArtistAction(showId, "album", 100, 0))
  },[dispatch, showId])

  const pageChange = useCallback((page, pageSize)=>{
    setCurrentPage(page)
    setAlbumIndex((page-1)*pageSize)
  },[])

  return (
    <DetailArtistAlbumWrapper>
      <div className="albums">
        {
          state.artistAlbums&&state.artistAlbums.length === 0 ? <div>暂无数据</div> :
          state.artistAlbums&&state.artistAlbums.slice(albumIndex, albumIndex+12).map(item => {
            return (
              <div className="album-item" key={item.id}>
                <XYShowAlbum info={item}></XYShowAlbum>
                <span className="time">{timestampToTime(item.publishTime, false)}</span>
              </div>
            )
          })
        }
      </div>
      <div className="album-page">
        <XYPagination total={state.artistAlbums&&state.artistAlbums.length}
          pageSize={12} pageChange={pageChange} currentPage={currentPage}></XYPagination>
      </div>
    </DetailArtistAlbumWrapper>
  )
})
