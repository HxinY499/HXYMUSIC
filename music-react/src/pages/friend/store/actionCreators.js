import * as actionTypes from "./constants"
import { getPost } from '@/services/post'
import { getMineComment } from '@/services/player'

const changePostsAction = (posts) => {
  return {
    type: actionTypes.CHANGE_POSTS,
    posts
  }
}

const changeMineCommentAction = (postComment) => ({
  type: actionTypes.CHANGE_POSTS_COMMENT,
  postComment
})

export const getPostsAction = (ids) => {
  return dispatch => {
    getPost(ids).then(res=>{
      if(res.data.success === "true"){
        dispatch(changePostsAction(res.data.posts.reverse()))
      }
    })
  }
}

export const getPostCommentAction = (id) => {
  return dispatch => {
    getMineComment(id, "post").then(res=>{
      dispatch(changeMineCommentAction(res.data.comments))
    })
  }
}


