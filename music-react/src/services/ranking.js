import {request} from "./axios";
// 获取歌单详情（各排行榜也是歌单）方法定义在recommend.js中
export function getAllRanking() {
  return request({
    url: "/toplist"
  })
}