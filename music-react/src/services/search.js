import {requestMine, request} from "./axios";

export function getSearchResult(keywords) {
  return requestMine({
    url: "/search",
    params: {
      keywords
    }
  })
}

export function getSearchResultNet(keywords, type) {
  return request({
    url: "/search",
    params: {
      keywords,
      type
    }
  })
}