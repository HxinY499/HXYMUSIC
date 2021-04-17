import {parseLyric} from '@/utils/parse'
import * as actionTypes from "./constants"
import { 
  getSongDetail,
  getLyric,
  getComment,
  getSimiSong,
  getAlbum,
  getPlaylist,
  getSimiPlaylist,
  getMineComment
} from '@/services/player'
import { 
  getMVDetail,
  getSimiMV,  
  getMVUrl
} from '@/services/mv'  
import { getPlayList } from '@/services/recommend'
import { getMinePlaylistDetail } from '@/services/playlist'
import { 
  getSimiArtist, 
  getArtistSongs, 
  getArtistDesc,
  getArtistMv, 
  getArtistAlbum 
} from '@/services/artist'

const changeCurrentSongAction = (song) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  song: song
})

const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index: index
})

const changePlayListAcion = (playlist) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playlist: playlist
})

const changeLyricAction = (lyric) => ({
  type: actionTypes.CHANGE_LYRIC,
  lyric: lyric
})

const changeSongCommentAction = (songComment) => ({
  type: actionTypes.CHANGE_SONG_COMMENT,
  songComment: songComment
})

const changePlaylistCommentAction = (playlistComment) => ({
  type: actionTypes.CHANGE_PLAYLIST_COMMENT,
  playlistComment: playlistComment
})

const getLyricAction = (id) => {
  return dispatch => {
    getLyric(id).then(res => {
      const lyric = res.uncollected ? [{content: "暂无歌词"}] : 
      (res.nolyric ? [{content: "纯音乐，无歌词"}] : parseLyric(res.lrc.lyric))
      dispatch(changeLyricAction(lyric))
    })
  }
}

const changeSimiSongAction = (simiSong) => ({
  type: actionTypes.CHANGE_SIMI_SONG,
  simiSong
})

const changeSimiPlaylistAction = (simiPlaylist) => ({
  type: actionTypes.CHANGE_SIMI_PLAYLIST,
  simiPlaylist
})

const changeShowSongDetailAction = (song) => ({
  type: actionTypes.CHANGE_SHOW_SONG_DETAIL,
  song
})

const changeShowSongLyricAction = (lyric) => ({
  type: actionTypes.CHANGE_SHOW_SONG_LYRIC,
  lyric
})

const changeShowPlaylistAction = (showPlaylist) => ({
  type: actionTypes.CHANGE_SHOW_PLAYLIST,
  showPlaylist
})

const changeShowAlbumAction = (album) => ({
  type: actionTypes.CHANGE_SHOW_ALBUM,
  album
})

const changeAlbumCommentAction = (albumComment) => ({
  type: actionTypes.CHANGE_ALBUM_COMMENT,
  albumComment
})

const changeArtistAlbumAction = (artistAlbums) => ({
  type: actionTypes.CHANGE_Artist_Album,
  artistAlbums
})
const changeArtistSongAction = (artistSongs) => ({
  type: actionTypes.CHANGE_Artist_SONG,
  artistSongs
})
const changeArtistMvAction = (artistMv) => ({
  type: actionTypes.CHANGE_Artist_MV,
  artistMv
})
const changeArtistDescAction = (artistDesc) => ({
  type: actionTypes.CHANGE_Artist_DESC,
  artistDesc
})
const changeArtistSimiAction = (artistSimi) => ({
  type: actionTypes.CHANGE_Artist_SIMI,
  artistSimi
})

const changeShowMVDetailAction = (showMV) => ({
  type: actionTypes.CHANGE_SHOW_MV_DETAIL,
  showMV
})
const changeMVUrlAction = (mvUrl) => ({
  type: actionTypes.CHANGE_MV_URL,
  mvUrl
})
const changeSimiMVAction = (simiMV) => ({
  type: actionTypes.CHANGE_SIMI_MV,
  simiMV
})
const changeMVCommentAction = (mvComment) => ({
  type: actionTypes.CHANGE_MV_COMMENT,
  mvComment
})
const changeMineCommentAction = (comments, type) => {
  switch (type) {
    case "song":
      return {type: actionTypes.CHANGE_SONG_MINE_COMMENT,songMineComment:comments}
    case "playlist":
      return {type: actionTypes.CHANGE_PLAYLIST_MINE_COMMENT,playlistMineComment:comments}
    case "album":
      return {type: actionTypes.CHANGE_ALBUM_MINE_COMMENT,albumMineComment:comments}
    case "mv":
      return {type: actionTypes.CHANGE_MV_MINE_COMMENT,mvMineComment:comments}
    default:
      break;
  }
}

export const changeCurrentLyricIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
  index
})

//将歌曲添加到播放列表中，如果已存在则播放该歌曲，不存在则发送网络请求获得歌曲详情并添加到播放列表中，且播放该歌曲
export const getSongDetailToPlayListAction = (ids) => {
  return (dispatch, getState) => {
    const playList = getState().getIn(["player", "playList"])
    const currentIndex = playList.findIndex(item => item.id === ids)

    if(currentIndex !== -1){
      const song = playList[currentIndex]
      dispatch(changeCurrentSongAction(song))
      dispatch(changeCurrentSongIndexAction(currentIndex))
    }else{
      getSongDetail(ids).then(res => {
        const song = res.songs && res.songs[0]
        const newPlayList = [...playList]
        newPlayList.push(song)
        dispatch(changeCurrentSongAction(song))
        dispatch(changePlayListAcion(newPlayList))
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
      })
    }
    dispatch(getLyricAction(ids))
  }
}

//改变播放顺序
export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence: sequence
})

//上一曲下一曲，根据播放顺序方式切换
export const changeCurrentSongAndIndexAction = (tag) => {
  return (dispatch, getState) => {
    const playList = getState().getIn(["player","playList"])
    const currentSongIndex = getState().getIn(["player","currentSongIndex"])
    const sequence = getState().getIn(["player","sequence"])
    let newSongIndex = 0
    switch(sequence){
      case 1:
        newSongIndex = currentSongIndex
        while(newSongIndex === currentSongIndex){
          newSongIndex = Math.floor(Math.random() * playList.length)
        }
        break
      default:
        newSongIndex = currentSongIndex + tag
        if(newSongIndex === playList.length) newSongIndex = 0
        if(newSongIndex === -1) newSongIndex = playList.length - 1
        break
    }
    dispatch(changeCurrentSongAction(playList[newSongIndex]))
    dispatch(changeCurrentSongIndexAction(newSongIndex))
    dispatch(getLyricAction(playList[newSongIndex].id))
  }
}
//在播放列表面板上改变当前播放歌曲
export const changeCurrentSongFromPanelAction = (index) => {
  return (dispatch, getState) => {
    const playList = getState().getIn(["player","playList"])
    dispatch(changeCurrentSongAction(playList[index]))
    dispatch(changeCurrentSongIndexAction(index))
    dispatch(getLyricAction(playList[index].id))
  }
}
//在播放列表面板上删除歌曲
export const changeDeleteSongAction = (id, index) => {
  return (dispatch, getState) => {
    const playList = getState().getIn(["player","playList"])
    const currentSongIndex = getState().getIn(["player","currentSongIndex"])
    if(playList.length>1){
      const newPlayList = playList.filter(item=>{
        if(item.id!==id){
          return true
        }else{return false}
      })
      dispatch(changePlayListAcion(newPlayList))
      if (index < currentSongIndex) {
        dispatch(changeCurrentSongIndexAction(currentSongIndex-1))
      }else if(index === currentSongIndex){
        let newIndex = currentSongIndex+1
        let newIndex2 = currentSongIndex
        if (newIndex>playList.length-1) {
          newIndex = playList.length-2
          newIndex2 = currentSongIndex-1
        }
        dispatch(changeCurrentSongIndexAction(newIndex2))
        dispatch(changeCurrentSongAction(playList[newIndex]))
        dispatch(getLyricAction(playList[newIndex].id))
      }
    }else{
      return
    }
  }
}

//将歌曲加入播放列表
export const changeAddPlayListAction = (song) => {
  return (dispatch, getState) => {
    const playList = getState().getIn(["player","playList"])
    const currentIndex = playList.findIndex(item => item.id === song.id)
    if(currentIndex === -1){
      
      getSongDetail(song.id).then(res => {
        const newPlayList = [...playList]
        newPlayList.push(res.songs && res.songs[0])
        dispatch(changePlayListAcion(newPlayList))
      })
    }
  }
}

//将整个歌单放入播放列表中，并顺序开始播放
export const changeSongListToPlayListAction = (songList, ifRequest) => {
  return (dispatch) => {
    if(ifRequest === true){
      //歌单类型
      if(songList.type === 0){
        getPlayList(songList.id).then(res => {
          if(res instanceof Error){
            getMinePlaylistDetail(songList.id).then(res=>{
              if(res.data.playlists[0].tracks>0){
                dispatch(changePlayListAcion(res.data.playlists[0].tracks))
                dispatch(changeCurrentSongAction(res.data.playlists[0].tracks[0]))
                dispatch(changeCurrentSongIndexAction(0))
                dispatch(getLyricAction(res.data.playlists[0].tracks[0].id))
              }
            })
          }else{
            if(res.playlist.tracks.length>0){
              dispatch(changePlayListAcion(res.playlist.tracks))
              dispatch(changeCurrentSongAction(res.playlist.tracks[0]))
              dispatch(changeCurrentSongIndexAction(0))
              dispatch(getLyricAction(res.playlist.tracks[0].id))
            }
          }
        })
      }
      //专辑类型或单曲专辑
      if(songList.type === "专辑" || songList.type === "Single"){
        getAlbum(songList.id).then(res => {
          dispatch(changePlayListAcion(res.songs))
          dispatch(changeCurrentSongAction(res.songs[0]))
          dispatch(changeCurrentSongIndexAction(0))
          dispatch(getLyricAction(res.songs[0].id))
        })
      }
    }else{
      dispatch(changePlayListAcion(songList))
      dispatch(changeCurrentSongAction(songList[0]))
      dispatch(changeCurrentSongIndexAction(0))
      dispatch(getLyricAction(songList[0].id))
    }
  }
}

//获得展示页歌曲信息
export const getShowSongAction = (id) => {
  return (dispatch) => {
    //歌曲详情
    getSongDetail(id).then(res => {
      const song = res.songs && res.songs[0]
      dispatch(changeShowSongDetailAction(song))
    })
    //评论
    getComment(id, 15, "song").then(res => {
      dispatch(changeSongCommentAction(res.hotComments))
    })
    getMineComment(id, "song").then(res=>{
      dispatch(changeMineCommentAction(res.data.comments, "song"))
    })
    //歌词
    getLyric(id).then(res => {
      const lyric = res.uncollected ? [{content: "暂无歌词"}] : 
      (res.nolyric ? [{content: "纯音乐，无歌词"}] : parseLyric(res.lrc.lyric))
      dispatch(changeShowSongLyricAction(lyric))
    })
    //相似歌曲
    getSimiSong(id).then(res => {
      dispatch(changeSimiSongAction(res.songs))
    })
  }
}

//获得展示页歌单信息
export const getShowPlaylistAction = (id) => {
  return (dispatch) => {
    //歌单详情
    getPlaylist(id).then(res => {
      if(res instanceof Error){
        getMinePlaylistDetail(id).then(mineRes=>{
          if(mineRes.data){
            dispatch(changeShowPlaylistAction(mineRes.data.playlists[0]))
          }
        })
      }else{
        dispatch(changeShowPlaylistAction(res.playlist))
      }
    },err=>{
      getMinePlaylistDetail(id).then(mineRes=>{
        dispatch(changeShowPlaylistAction(mineRes.data.playlists[0]))
      })
    })
    //评论
    getComment(id, 15, "playlist").then(res => {
      dispatch(changePlaylistCommentAction(res.comments))
    })
    getMineComment(id, "playlist").then(res=>{
      dispatch(changeMineCommentAction(res.data.comments, "playlist"))
    })
    //相似歌单
    getSimiPlaylist(id).then(res => {
      dispatch(changeSimiPlaylistAction(res.playlists))
    })
  }
}

//获得展示页专辑信息
export const getShowAlbumAction = (id) => {
  return (dispatch) => {
    //专辑详情
    getAlbum(id).then(res => {
      dispatch(changeShowAlbumAction(res))
      //该歌手的其他热门专辑
      const id = res&&res.album&&res.album.artist.id
      getArtistAlbum(id, 5, 0).then(res => {
        dispatch(changeArtistAlbumAction(res.hotAlbums))
      })
    })
    //评论
    getComment(id, 15, "album").then(res => {
      dispatch(changeAlbumCommentAction(res.comments))
    })
    getMineComment(id, "album").then(res=>{
      dispatch(changeMineCommentAction(res.data.comments, "album"))
    })
  }
}

//获得展示页歌手信息,分模块的，调用时传类型判断模块
export const getShowArtistAction = (id, type, limit, offset) => {
  return dispatch => {
    if(type === "main"){
      getArtistSongs(id).then(res=>{
        dispatch(changeArtistSongAction(res))
      })
      getSimiArtist(id).then(res=>{
        dispatch(changeArtistSimiAction(res.artists))
      })
    }else if(type === "album"){
      getArtistAlbum(id, limit, offset).then(res=>{
        dispatch(changeArtistAlbumAction(res.hotAlbums))
      })
    }else if(type === "mv"){
      getArtistMv(id, limit, offset).then(res=>{
        dispatch(changeArtistMvAction(res.mvs))
      })
    }else if(type === "desc"){
      getArtistDesc(id).then(res=>{
        dispatch(changeArtistDescAction(res))
      })
    }
  }
}

export const getShowMVAction = (id) => {
  return dispatch => {
    getMVDetail(id).then(res=>{
      dispatch(changeShowMVDetailAction(res))
      const r =  res&&res.data&&res.data.brs[0]&&res.data.brs[0].br
      getMVUrl(id, r&&r).then(res=>{
        dispatch(changeMVUrlAction(res.data))
      })
    })
    getComment(id, 15, "mv").then(res=>{
      dispatch(changeMVCommentAction(res.hotComments))
    })
    getMineComment(id, "mv").then(res=>{
      dispatch(changeMineCommentAction(res.data.comments, "mv"))
    })
    getSimiMV(id).then(res=>{
      dispatch(changeSimiMVAction(res.mvs))
    })
  }
}

export const getMVUrlAction = (id, r) => {
  return dispatch => {
    getMVUrl(id, r).then(res=>{
      dispatch(changeMVUrlAction(res.data))
    })
  }
}