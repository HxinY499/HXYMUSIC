import {Map} from "immutable"
import * as actionTypes from './constants';

const defaultState = Map({
  likeSongs: [],
  likeMVs: [],
  likePlaylists: [],
  likeAlbums: [],
  likeArtists: [],
  createPlaylists: [],
  history: {}
})

function reducer(state=defaultState, action){
  switch(action.type){
    case actionTypes.CHANGE_LIKE_SONGS:
      return state.set("likeSongs", action.likeSongs);
    case actionTypes.CHANGE_LIKE_MVS:
      return state.set("likeMVs", action.likeMVs);
    case actionTypes.CHANGE_LIKE_PLAYLISTS:
      return state.set("likePlaylists", action.likePlaylists);
    case actionTypes.CHANGE_LIKE_ALBUMS:
      return state.set("likeAlbums", action.likeAlbums);
    case actionTypes.CHANGE_LIKE_ARTISTS:
      return state.set("likeArtists", action.likeArtists);
    case actionTypes.CHANGE_CREATE_PLAYLISTS:
      return state.set("createPlaylists", action.createPlaylists);
    case actionTypes.CHANGE_HISTORY:
      return state.set("history", action.history);
    default:
      return state;
  }
}
export default reducer