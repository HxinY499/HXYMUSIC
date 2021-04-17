import {requestMine} from './axios'

export function saveData(type, mediaData) {
  return requestMine({
    method: "post",
    url: "/data/saveData",
    data: {
      type, mediaData
    }
  })
}




