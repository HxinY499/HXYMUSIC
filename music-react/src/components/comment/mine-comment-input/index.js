import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom';

import {setComment} from '@/services/user'

import XYMineCommentContent from '../mine-comment-content'
import { Comment, Avatar, Form, Button, Input, message } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';

const Editor = ({ onChange, onSubmit, submitting, value, clickEditor, user }) => (
  <div>
    <Form.Item onClick={()=>{clickEditor()}}>
      <Input.TextArea rows={4} onChange={onChange} value={value} 
       disabled={!user}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary"
      disabled={!user}>
        评论
      </Button>
    </Form.Item>
  </div>
);

export default memo(function XYMineCommentInput(props) {
  const { subInfo } = props
  const history = useHistory()
  const [value, setValue] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [comments, setComments] = useState([])
  const state = useSelector(state => ({
    loginUser: state.getIn(["user", "loginUser"])
  }),shallowEqual)

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      let now = Date.now()
      setComment(state.loginUser, subInfo, value, now).then(res=>{
        if(res.data.success === "true"){
          setSubmitting(false);
          setValue("");
          let arr = [...comments]
          arr.unshift({
            user: state.loginUser,
            content: value,
            time: now
          })
          setComments(arr)
        }else{
          message.error({content: "评论失败", className: "err-message"})
        }
      })
    }, 500);
  }

  //评论前测试是否登录
  const clickEditor = () => {
    if(!state.loginUser.username){
      message.error({content: "请先登录", className: "err-message"})
    }else{return}
  }

  const clickAva = () => {
    if(!state.loginUser.username){
      message.error({content: "请先登录", className: "err-message"})
    }else{
      history.push(`/user/home/like?id=${state.loginUser.id}`)
    }
  } 

  const avatar = (state.loginUser&&state.loginUser.avatar) || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  const userName = (state.loginUser&&state.loginUser.username) || "用户名"

  return (
    <>
      <Comment
        avatar={
          <Avatar
            src={avatar}
            alt={userName}
            onClick={()=>{clickAva()}}/>
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
            clickEditor={clickEditor}
            user={state.loginUser.username}/>
        }/>
      {
        comments && comments.map((item, index)=>{
          return (
            <XYMineCommentContent key={index} comment={item}></XYMineCommentContent>
          )
        })
      }
      
    </>
  )
})
