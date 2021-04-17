import {request} from "./axios";
import {requestMine} from "./axios";

export function getMVDetail(mvid) {
  return request({
    url: "/mv/detail",
    params: {
      mvid
    }
  })
}

//mvid可以是单个也可以多个，多个使用逗号分割
export function getMineMVDetail(ids) {
  return requestMine({
    url: "/data/mv",
    params: {
      ids
    }
  })
}

export function getSimiMV(mvid) {
  return request({
    url: "/simi/mv",
    params: {
      mvid
    }
  })
}

export function getMVUrl(id, r) {
  return request({
    url: "/mv/url",
    params: {
      id,
      r
    }
  })
}