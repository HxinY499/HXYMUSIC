import {request} from "./axios";
import { requestMine } from './axios'

export function getAllCategory(){
  return request({
    url: "/playlist/catlist"
  })
} 

export function getCurrentPlaylists(order, cat, limit, offset){
  return request({
    url: "/top/playlist",
    params: {
      order,
      cat,
      limit,
      offset
    }
  })
} 

export function getMinePlaylistDetail(ids){
  return requestMine({
    url: "/data/playlist",
    params: {
      ids
    }
  })
} 

//有username字段则删除该用户中创建歌单数组的该歌单id，没有则仅仅是删除歌单
export function deletePlaylist(id, username){
  return requestMine({
    method: "post",
    url: "/playlist/delete",
    data: {
      id, username
    }
  })
} 

//修改歌单封面
export function changeCover(formData) {
  return requestMine({
    method: "post",
    url: "/playlist/changeCover",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

//编辑歌单
export function editPlaylist(username, playlist){
  return requestMine({
    method: "post",
    url: "/playlist/edit",
    data: {
      username, playlist
    }
  })
}

export function getMineLikePlaylistDetail(ids){
  return requestMine({
    url: "/likes/likePlaylist",
    params: {
      ids
    }
  })
} 

export function getMineCreatePlaylistsDetail(ids){
  return requestMine({
    url: "/playlist/getCreatePlaylist",
    params: {
      ids
    }
  })
} 

export function createPlaylist(username, name){
  return requestMine({
    method: "post",
    url: "/playlist/createPlaylist",
    data: {
      username, name
    }
  })
} 

export function songToPlaylist(playlistId, songId){
  return requestMine({
    method: "post",
    url: "/playlist/songToPlaylist",
    data: {
      playlistId, songId
    }
  })
} 