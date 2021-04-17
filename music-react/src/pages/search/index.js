import React, { memo } from 'react'
import { shallowEqual, useSelector } from 'react-redux';

import {XYSearchWrapper} from './style'
import { Tabs } from 'antd';
import XYShowAlbum from '@/components/show-album'
import XYSongTableYesAlbum from '@/components/song-table/yes-album'
import XYShowArtist from '@/components/show-artist'
import XYShowPlayList from '@/components/show-playList'

export default memo(function XYSearch(props) {
  const state = useSelector(state => ({
    searchResult: state.getIn(['search', "searchResult"])
  }), shallowEqual)
  return (
    <XYSearchWrapper className="wrap-v2">
      <Tabs defaultActiveKey="1" type="card" size={"large"}>
        <Tabs.TabPane tab="单 曲" key="1">
          {
            state?.searchResult?.songs?.length>0 ? 
            <XYSongTableYesAlbum songs={state?.searchResult?.songs} search={true}></XYSongTableYesAlbum> :
            <div className="no-data">暂无数据</div>
          }
        </Tabs.TabPane>
        <Tabs.TabPane tab="专 辑" key="2">
          {
            state?.searchResult?.albums?.length>0 ? 
            (
              <ul className="content album">
                {
                  state?.searchResult?.albums?.map(item => {
                    return (
                      <li key={item.id}>
                        <XYShowAlbum info={item}></XYShowAlbum>
                      </li>
                    )
                  })
                }
              </ul>
            ) : 
            (
              <div className="no-data">暂无数据</div>
            )
          }
        </Tabs.TabPane>
        <Tabs.TabPane tab="歌 手" key="3">
          {
            state?.searchResult?.artists?.length>0 ?
            (
              <ul className="content artist">
                {
                  state?.searchResult?.artists?.map(item => {
                    return (
                      <li key={item.id}>
                        <XYShowArtist artist={item}></XYShowArtist>
                      </li>
                    )
                  })
                }
              </ul>
            ) :
            (
              <div className="no-data">暂无数据</div>
            )
          }
        </Tabs.TabPane>
        <Tabs.TabPane tab="歌 单" key="4">
          {
            state?.searchResult?.playlists?.length>0 ?
            (
              <ul className="content playlist">
                {
                  state?.searchResult?.playlists?.map(item => {
                    return (
                      <li key={item.id}>
                        <XYShowPlayList width={135} item={item}></XYShowPlayList>
                      </li>
                    )
                  })
                }
              </ul>
            ) :
            (
              <div className="no-data">暂无数据</div>
            )
          }
        </Tabs.TabPane>
      </Tabs>
    </XYSearchWrapper>
  )
})
