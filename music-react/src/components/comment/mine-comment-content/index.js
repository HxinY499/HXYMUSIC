import { useHistory } from 'react-router-dom';
import React, { memo } from 'react';

import {timestampToTime} from '@/utils/format-utils'

import { Comment, Tooltip, Avatar } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import {CommentWrapper} from './style'

export default memo(function XYMineCommentContent(props) {

  const com = props.comment
  const history = useHistory()

  const name = com ? com.user.nickname : "no nickname"
  const avatar = com ?  com.user.avatar : "http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"
  const content = com ? com.content : "暂未获得内容"
  const time = com ? com.time : "0000000000000"
  const like = com ? com.likedCount : "0"
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span>
        <LikeOutlined />
        <span className="comment-action">{like}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <CommentWrapper>
      <Comment
        actions={actions}
        author={name}
        avatar={
          <Avatar
            src={avatar}
            alt="用户"
            onClick={()=>{history.push(`/user/home/like?id=${com.user.id}`)}}
          />
        }
        content={
          <p className="comment-content">{content}</p>
        }
        datetime={
          <Tooltip title={timestampToTime(time)}>
            <span>{timestampToTime(time)}</span>
          </Tooltip>
        }
      />
      <div className="outline"></div>
    </CommentWrapper>
  );
})