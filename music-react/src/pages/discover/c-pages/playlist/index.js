import React, { memo, useCallback, useEffect, useState, shallowEqual } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'

import { getAllCategoryAction, getCurrentPlaylistsAction } from './store/actionCreators'
import { hotCategory } from "@/common/local-data"

import { CSSTransition } from 'react-transition-group';
import { PlaylistWrapper } from './style'
import { DownOutlined } from '@ant-design/icons'
import XYCategoryPanel from './category-panel'
import XYShowPlayList from '@/components/show-playList'
import XYPagination from "@/components/pagination"

export default memo(function XYPlaylist(props) {
  const showCat = decodeURI(props.location.search.split("=")[1] || "全部")
  const state = useSelector((state) => ({
    allCategory: state.getIn(["playlist", "allCategory"]),
    currentPlaylists: state.getIn(["playlist", "currentPlaylists"])
  }),shallowEqual)
  const [order, setOrder] = useState("hot")
  const [showCategoryPanel, setShowCategoryPanel] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const playlists = state.currentPlaylists && state.currentPlaylists.playlists
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getAllCategoryAction())
    dispatch(getCurrentPlaylistsAction(order, showCat, 35, 0))
  },[dispatch, order, showCat])

  function swichOrder(order){
    setOrder(order)
  }

  const pageChange = useCallback((page, pageSize)=>{
    dispatch(getCurrentPlaylistsAction(order, showCat, 35, parseInt((page-1)*pageSize)))
    setCurrentPage(page)
  },[dispatch, order, showCat])

  const changeCategory = useCallback(cat => {
    history.push(`/discover/playlist?cat=${cat}`);
    setShowCategoryPanel(false);
    setCurrentPage(1)
  },[history])

  return (
    <PlaylistWrapper className="wrap-v2">
      <div className="category">
        <div className="swich-category" onClick={()=>{setShowCategoryPanel(!showCategoryPanel)}}>
          <span className="category-name">{showCat}</span>
          <DownOutlined className="category-icon"/>
        </div>
        <ul className="hot-category">
          <li className="item title">热门标签:</li>
          {
            hotCategory.map(item => {
              return (
                <li key={item} className="item" onClick={()=>{changeCategory(item)}}>{item}</li>
              )
            })
          }
        </ul>
        <div className="order">
          <span className={classnames({"hot": true,"active-order": order==="hot"})}
          onClick={()=>{swichOrder("hot");setCurrentPage(1)}}>热门</span>
          <span className={classnames({"new": true,"active-order": order==="new"})}
          onClick={()=>{swichOrder("new");setCurrentPage(1)}}>最新</span>
        </div>
      </div>
      <div className="playlists-wrapper">
        <ul className="playlists">
          {
            playlists && playlists.map(item=>{
              return(
                <li key={item.id}>
                  <XYShowPlayList item={item} width={140} />
                </li>
              )
            })
          }
        </ul>
        <XYPagination total={state.currentPlaylists && state.currentPlaylists.total}
          pageSize={35} pageChange={pageChange} currentPage={currentPage}></XYPagination>
      </div>
      <CSSTransition in={showCategoryPanel} classNames="show-categoryPanel" timeout={1000} unmountOnExit={true}>
        <XYCategoryPanel allCategory={state.allCategory} showCat={showCat} changeCategory={changeCategory}/>
      </CSSTransition>
    </PlaylistWrapper>
  )
})
