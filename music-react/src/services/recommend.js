import {request} from "./axios";

export function getTopBanner() {
  return request({
    url: "/banner"
  })
}

export function getHotRecommend(limit) {
  return request({
    url: "/personalized",
    params: {
      limit
    }
  })
}

export function getNewAlbum(limit) {
  return request({
    url: "/album/newest",
    params: {
      limit
    }
  })
}

export function getPlayList(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  })
}