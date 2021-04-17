import {request} from "./axios";
import {requestMine} from './axios'

export function getSongDetail(ids) {
  return request({
    url: "/song/detail",
    params: {
      ids
    }
  })
}

export function getLyric(id) {
  return request({
    url: "/lyric",
    params: {
      id
    }
  })
}

export function getSimiSong(id){
  return request({
    url: "/simi/song",
    params: {
      id
    }
  })
}

export function getSimiPlaylist(id){
  return request({
    url: "/related/playlist",
    params: {
      id
    }
  })
}

export function getAlbum(id){
  return request({
    url: "/album",
    params: {
      id
    }
  })
}

export function getPlaylist(id){
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  })
}

export function getComment(id, limit, type){
  if(type === "song"){
    return request({
      url: "/comment/music",
      params: {
        id,
        limit
      }
    })
  }else if(type === "playlist"){
    return request({
      url: "/comment/playlist",
      params: {
        id,
        limit
      }
    })
  }else if(type === "album"){
    return request({
      url: "/comment/album",
      params: {
        id,
        limit
      }
    })
  }else if(type === "mv"){
    return request({
      url: "/comment/mv",
      params: {
        id,
        limit
      }
    })
  }
}

export function getMineComment(id, type){
  return requestMine({
    url: "/comment/getComment",
    params: {
      id,
      type
    }
  })
}


