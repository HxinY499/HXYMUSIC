import * as actionTypes from "./constants"
import { getSearchResult, getSearchResultNet } from '@/services/search'

const changeSearchResultAction = (searchResult) => {
  return {
    type: actionTypes.CHANGE_SEARCH_RESULT,
    searchResult
  }
}

export const getSearchResultAction = (keywords) => {
  return (dispatch) => {
    const searchResult = {}
    const promiseArr = []
    // promiseArr.push(getSearchResult(keywords))
    promiseArr.push(getSearchResultNet(keywords, 1))//  单曲
    promiseArr.push(getSearchResultNet(keywords, 10))// 专辑
    promiseArr.push(getSearchResultNet(keywords, 100))//  歌手
    promiseArr.push(getSearchResultNet(keywords, 1000))//  歌单
    Promise.all(promiseArr).then(result=>{
      result.forEach(item => {
        if(item.result.songs){
          searchResult.songs = item.result.songs
        }else if(item.result.albums){
          searchResult.albums = item.result.albums
        }else if(item.result.artists){
          searchResult.artists = item.result.artists
        }else if(item.result.playlists){
          searchResult.playlists = item.result.playlists
        }
      })
      dispatch(changeSearchResultAction(searchResult))
    })
  }
}