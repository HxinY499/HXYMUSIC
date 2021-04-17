import {request} from "./axios";
import {requestMine} from "./axios";

export function getAllAlbums(area, limit, offset) {
  return request({
    url: "/album/new",
    params: {
      area,
      limit,
      offset
    }
  })
}

export function getMineAlbumDetail(ids){
  return requestMine({
    url: "/data/album",
    params: {
      ids
    }
  })
}

export function getMineLikeAlbumDetail(ids){
  return requestMine({
    url: "/likes/likeAlbum",
    params: {
      ids
    }
  })
}

//获取热门新碟的函数定义在recommend.js