import React, { memo } from 'react'

import XYMineCommentInput from './mine-comment-input'
import XYMineCommentContent from './mine-comment-content'
import XYWangyiComment from './wangyi-comment'
import {XYCommentWrapper} from './style'

export default memo(function XYComment(props) {

  const songComment = props.comments
  const mineComments = props.mineComments

  return (
    <XYCommentWrapper>
      <XYMineCommentInput subInfo={props.subInfo} comments={mineComments}></XYMineCommentInput>
      {
        mineComments && mineComments.map(item => {
          return (
            <XYMineCommentContent key={item._id} comment={item}></XYMineCommentContent>
          )
        })
      }
      {
        songComment && songComment.map(item => {
          return (
            <XYWangyiComment key={item.commentId} comment={item}></XYWangyiComment>
          )
        })
      }
    </XYCommentWrapper>
  )
})
