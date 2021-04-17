import {requestMine} from './axios'

export function register(user) {
  return requestMine({
    method: "post",
    url: "/user/register",
    data: {
      user
    }
  })
}

export function login(user) {
  return requestMine({
    method: "post",
    url: "/user/login",
    data: {
      user
    }
  })
}

export function basicSetting(user) {
  return requestMine({
    method: "post",
    url: "/user/basic",
    data: {
      user
    }
  })
}

export function changeAva(formData) {
  return requestMine({
    method: "post",
    url: "/user/changeAva",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

//设置密保
export function setPassProtect(data) {
  return requestMine({
    method: "post",
    url: "/user/setPassProtect",
    data: data
  })
}

export function setPass(password, id) {
  return requestMine({
    method: "post",
    url: "/user/checkPass",
    data: {
      password,
      id
    }
  })
}

//生成历史记录
export function setHistory(user, type, mediaData) {
  return requestMine({
    method: "post",
    url: "/history/saveHistory",
    data: {
      user, type, mediaData
    }
  })
}

//提交评论
export function setComment(user, subInfo, content) {
  return requestMine({
    method: "post",
    url: "/comment/saveComment",
    data: {
      user, subInfo, content
    }
  })
}

//收藏歌曲、歌单、专辑、MV、关注用户、歌手
export function setLikes(username, type, id) {
  return requestMine({
    method: "post",
    url: "/likes/setLikes",
    data: {
      username, type, id
    }
  })
}

//删除用户喜欢
export function deleteLikes(username, type, id) {
  return requestMine({
    method: "post",
    url: "/likes/deleteLikes",
    data: {
      username, type, id
    }
  })
}

//获取用户信息
export function getUser(id){
  return requestMine({
    url: "user/getUser",
    params:{
      id
    }
  })
}

//获取用户历史记录
export function getHistory(username){
  return requestMine({
    url: "history/getHistory",
    params:{
      username
    }
  })
}

//获取用户音乐数据
export function getDate(username){
  return requestMine({
    url: "user/getUserData",
    params:{
      username
    }
  })
}



