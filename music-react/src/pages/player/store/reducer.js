import {Map} from "immutable"
import * as actionTypes from './constants';

const defaultState = Map({
  playList: [],//播放列表
  currentSongIndex: 0,
  currentSong: {},
  sequence: 0, //0顺序1随机2单曲循环
  lyric: [],
  currentLyricIndex: -1,
  songComment: [],
  songMineComment: [],
  simiSong: [],
  showSongLyric: [],
  showSong: {},
  playlistComment:[],
  playlistMineComment: [],
  showPlaylist: {},
  simiPlaylist: [],
  showAlbum: {},
  albumComment: [],
  albumMineComment: [],
  artistAlbums: [],
  artistSongs: {},
  artistMv: [],
  artistDesc: {},
  artistSimi: [],
  mvComment: [],
  mvMineComment: [],
  simiMV: [],
  showMV: {},
  mvUrl: {},
})

function reducer(state=defaultState, action){
  switch(action.type){
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set("currentSong", action.song);
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set("currentSongIndex", action.index);
    case actionTypes.CHANGE_PLAY_LIST:
      return state.set("playList", action.playlist);
    case actionTypes.CHANGE_SEQUENCE:
      return state.set("sequence", action.sequence);
    case actionTypes.CHANGE_LYRIC:
      return state.set("lyric", action.lyric);
    case actionTypes.CHANGE_CURRENT_LYRIC_INDEX:
      return state.set("currentLyricIndex", action.index);
    case actionTypes.CHANGE_SONG_COMMENT:
      return state.set("songComment", action.songComment);
    case actionTypes.CHANGE_SIMI_SONG:
      return state.set("simiSong", action.simiSong);
    case actionTypes.CHANGE_SHOW_SONG_DETAIL:
      return state.set("showSong", action.song);
    case actionTypes.CHANGE_SHOW_SONG_LYRIC:
      return state.set("showSongLyric", action.lyric);
    case actionTypes.CHANGE_PLAYLIST_COMMENT:
      return state.set("playlistComment", action.playlistComment);
    case actionTypes.CHANGE_SHOW_PLAYLIST:
      return state.set("showPlaylist", action.showPlaylist);
    case actionTypes.CHANGE_SIMI_PLAYLIST:
      return state.set("simiPlaylist", action.simiPlaylist);
    case actionTypes.CHANGE_SHOW_ALBUM:
      return state.set("showAlbum", action.album);
    case actionTypes.CHANGE_ALBUM_COMMENT:
      return state.set("albumComment", action.albumComment);
    case actionTypes.CHANGE_Artist_Album:
      return state.set("artistAlbums", action.artistAlbums)
    case actionTypes.CHANGE_Artist_SONG:
      return state.set("artistSongs", action.artistSongs)
    case actionTypes.CHANGE_Artist_MV:
      return state.set("artistMv", action.artistMv)
    case actionTypes.CHANGE_Artist_DESC:
      return state.set("artistDesc", action.artistDesc)
    case actionTypes.CHANGE_Artist_SIMI:
      return state.set("artistSimi", action.artistSimi)
    case actionTypes.CHANGE_SHOW_MV_DETAIL:
      return state.set("showMV", action.showMV)
    case actionTypes.CHANGE_MV_COMMENT:
      return state.set("mvComment", action.mvComment)
    case actionTypes.CHANGE_SIMI_MV:
      return state.set("simiMV", action.simiMV)
    case actionTypes.CHANGE_MV_URL:
      return state.set("mvUrl", action.mvUrl)
    case actionTypes.CHANGE_MV_MINE_COMMENT:
      return state.set("mvMineComment", action.mvMineComment)
    case actionTypes.CHANGE_PLAYLIST_MINE_COMMENT:
      return state.set("playlistMineComment", action.playlistMineComment)
    case actionTypes.CHANGE_ALBUM_MINE_COMMENT:
      return state.set("albumMineComment", action.albumMineComment)
    case actionTypes.CHANGE_SONG_MINE_COMMENT:
      return state.set("songMineComment", action.songMineComment)
    default:
      return state;
  }
}

export default reducer