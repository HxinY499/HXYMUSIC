import React, { memo, useEffect, useState, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {getShowArtistAction} from '../../store/actionCreators'

import {DetailArtistMvWrapper} from './style'
import XYShowMv from '@/components/show-mv'
import XYPagination from "@/components/pagination"

export default memo(function XYDetailArtistMv(props) {
  const showId = parseInt(props.location.search.split("=")[1])
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [albumIndex, setAlbumIndex] = useState(0)
  
  const state = useSelector(state=>({
    artistMv: state.getIn(['player', 'artistMv'])
  }),shallowEqual)

  useEffect(()=>{
    dispatch(getShowArtistAction(showId, "mv", 100, 0))
  },[dispatch, showId])

  const pageChange = useCallback((page, pageSize)=>{
    setCurrentPage(page)
    setAlbumIndex((page-1)*pageSize)
  },[])

  return (
    <DetailArtistMvWrapper>
      <div className="mvs">
        {
          state.artistMv&&state.artistMv.length === 0 ? <div>暂无数据</div> :
          state.artistMv&&state.artistMv.slice(albumIndex, albumIndex+12).map(item => {
            return (
              <div className="mv-item" key={item.id}>
                <XYShowMv item={item}></XYShowMv>
              </div>
            )
          })
        }
      </div>
      <div className="album-page">
        <XYPagination total={state.artistMv&&state.artistMv.length}
          pageSize={12} pageChange={pageChange} currentPage={currentPage}></XYPagination>
      </div>
    </DetailArtistMvWrapper>
  )
})
