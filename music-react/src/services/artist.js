import {request} from "./axios";
import {requestMine} from "./axios";

export function getArtists(type, area, initial) {
  return request({
    url: "/artist/list",
    params: {
      type, 
      area,
      initial,
      limit: 100
    }
  })
}

export function getMineArtistDetail(ids) {
  return requestMine({
    url: "/data/artist",
    params: {
      ids
    }
  })
}

//相似歌手
export function getSimiArtist(id) {
  return request({
    url: "/simi/artist",
    params: {
      id
    }
  })
}

//歌手单曲
export function getArtistSongs(id) {
  return request({
    url: "/artists",
    params: {
      id
    }
  })
}

//歌手MV
export function getArtistMv(id, limit, offset) {
  return request({
    url: "/artist/mv",
    params: {
      id,
      limit,
      offset
    }
  })
}

//歌手描述
export function getArtistDesc(id) {
  return request({
    url: "/artist/desc",
    params: {
      id
    }
  })
}

//歌手专辑
export function getArtistAlbum(id, limit, offset){
  return request({
    url: "/artist/album",
    params: {
      id,
      limit,
      offset
    }
  })
}

