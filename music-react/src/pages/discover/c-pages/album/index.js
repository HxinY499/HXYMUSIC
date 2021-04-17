import React, { memo, useCallback, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {getAllAlbumsAction, getHotAlbumsAction} from "./store/actionCreators"
import {albumCategory} from '@/common/local-data'

import XYPagination from '@/components/pagination'
import {AlbumWrapper, HotAlbums, AllAlbums} from './style'
import XYShowAlbum from '@/components/show-album'

export default memo(function XYAlbum() {

  const dispatch = useDispatch()
  const [area, setArea] = useState("ALL")
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const state = useSelector(state => ({
    hotAlbums: state.getIn(['album', 'hotAlbums']),
    allAlbums: state.getIn(['album', 'allAlbums'])
  }),shallowEqual)

  useEffect(()=>{
    dispatch(getHotAlbumsAction())
  },[dispatch])
  useEffect(()=>{
    dispatch(getAllAlbumsAction(area, 36, offset))
  },[dispatch, area, offset])

  const pageChange = useCallback((page, pageSize)=>{
    setCurrentPage(page)
    setOffset((page-1)*pageSize)
  },[])

  const changeCate = (area) => {
    setArea(area)
  }

  return (
    <AlbumWrapper className="wrap-v2">
      <HotAlbums>
        <div className="title">热门新碟</div>
        <ul className="content">
          {
            state.hotAlbums && state.hotAlbums.map(item => {
              return (
                <li key={item.id}><XYShowAlbum info={item}></XYShowAlbum></li>
              )
            })
          }
        </ul>
      </HotAlbums>
      <AllAlbums>
        <div className="title">
          <span>全部新碟</span>
          <ul className="category">
            {
              albumCategory.map((item, index)=>{
                return (
                  <li key={index} onClick={()=>{changeCate(item[0])}}>{item[1]}<i>|</i></li>
                )
              })
            }
          </ul>
        </div>
        <ul className="content">
          {
            state.allAlbums&&state.allAlbums.albums&&state.allAlbums.albums.map(item => {
              return (
                <li key={item.id}><XYShowAlbum info={item}></XYShowAlbum></li>
              )
            })
          }
        </ul>
        <XYPagination total={state.allAlbums && state.allAlbums.total}
          pageSize={36} pageChange={pageChange} currentPage={currentPage}></XYPagination>
      </AllAlbums>
    </AlbumWrapper>
  )
})
