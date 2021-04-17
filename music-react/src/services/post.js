import {requestMine} from './axios'

//提交动态
export function addPost(formData) {
  return requestMine({
    method: "post",
    url: "/post/addPost",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

//获取动态
export function getPost(ids) {
  return requestMine({
    method: "get",
    url: "/post/getPost",
    params: {ids}
  })
}

//删除动态
export function deletePost(userId, id) {
  return requestMine({
    method: "post",
    url: "/post/deletePost",
    data: {userId, id}
  })
}

//点赞动态
export function likePost(userId, id) {
  return requestMine({
    method: "post",
    url: "/post/likePost",
    data: {userId, id}
  })
}