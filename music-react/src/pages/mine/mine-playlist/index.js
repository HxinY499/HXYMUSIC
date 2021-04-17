import React, { memo, useEffect, useState, shallowEqual } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { createPlaylist, deletePlaylist } from '@/services/playlist'
import {changeLoginUserAction} from "@/pages/user/store"
import {getLikePlaylistsAction,getCreatePlaylistsAction} from '../store/actionCreators'
import {deleteLikes} from '@/services/user'

import {MinePlaylistWrapper} from './style'
import XYLittleHeaderRCM from '@/components/little-header-rcm'
import XYShowPlayList from '@/components/show-playList'
import XYEditPlaylist from './edit-playlist'
import { Form, Input, Button, Modal, message, Popconfirm } from 'antd';

export default memo(function XYMinePlaylist() {
  const [likes, setLikes] = useState([])
  const [creates, setCreates] = useState([])
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(false)
  const [deleteId, setDeleteId] = useState()
  const [deleteLikeId, setDeleteLikeId] = useState()
  const [editPlaylist, setEditPlaylist] = useState({})
  const dispatch = useDispatch()
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const state = useSelector(state => ({
    likePlaylists: state.getIn(['mine', 'likePlaylists']),
    createPlaylists: state.getIn(['mine', 'createPlaylists']),
    loginUser: state.getIn(['user', 'loginUser'])
  }), shallowEqual)

  useEffect(() => {
    let likeArr = state.loginUser&&state.loginUser.likes&&state.loginUser.likes["playlist"]
    let creatArr = state.loginUser&&state.loginUser.createPlaylists
    if(likeArr&&likeArr.length>0){setLikes(likeArr);console.log(likeArr)}
    if(creatArr&&creatArr.length>0){setCreates(creatArr);console.log(creatArr)}
  }, [state.loginUser])

  useEffect(() => {
    dispatch(getLikePlaylistsAction(likes.join(",")))
  }, [dispatch,likes])
  useEffect(() => {
    dispatch(getCreatePlaylistsAction(creates.join(",")))
  }, [dispatch,creates])

  const showModal = () => {
    setAdd(true);
  };

  const handleCancel = () => {
    setAdd(false);
  };

  const onFinish = (values) => {
    createPlaylist(state.loginUser&&state.loginUser.username, values.playlisyName).then(res=>{
      if(res.data.user!==undefined){
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("loginUser", user)
        dispatch(changeLoginUserAction(res.data.user))
      }
    },err=>{
      message.error({content: "新建失败", className: "err-message"})
    })
    setAdd(false)
  };

  const confirmDelete = () => {
    deletePlaylist(deleteId, state.loginUser&&state.loginUser.username).then(res=>{
      if(res.data.user!==undefined){
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("loginUser", user)
        dispatch(changeLoginUserAction(res.data.user))
      }
    },err=>{
      message.error({content: "删除失败", className: "err-message"})
    })
  }

  const confirmDeLike = () => {
    deleteLikes(state.loginUser&&state.loginUser.username, "playlist", deleteLikeId).then(res=>{
      if(res.data.user!==undefined){
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("loginUser", user)
        dispatch(changeLoginUserAction(res.data.user))
      }
    },err=>{
      message.error({content: "删除失败", className: "err-message"})
    })
  }
  return (
    <MinePlaylistWrapper>
      {
        edit ? 
        <div className="edit">
          <div className="nav-bar">
            <span onClick={()=>{setEdit(false);}}>{editPlaylist.name}</span>
            <i className="fa fa-angle-right"></i>
            <span>编辑歌单</span>
          </div>
          <XYEditPlaylist playlist={editPlaylist} username={state.loginUser&&state.loginUser.username}></XYEditPlaylist>
        </div> : 
        <div>
          <div className="mine-wrapper">
            <XYLittleHeaderRCM title={`我创建的歌单(${(state.createPlaylists&&state.createPlaylists.length)||0})`} isMore={false}></XYLittleHeaderRCM>
            <button className="add-playlist" onClick={()=>{showModal()}}><i>+</i>新建</button>
            {
              state.createPlaylists && state.createPlaylists.length>0 ?
              <ul className="content">
                {
                  state.createPlaylists && state.createPlaylists.map((item) => {
                    return (
                      <li key={item.id}>
                        <XYShowPlayList width={135} item={item}></XYShowPlayList>
                        <div className="handle">
                          <i className="fa fa-pencil-square-o" title="编辑"
                            onClick={()=>{setEdit(true);setEditPlaylist(item)}}></i>
                          <Popconfirm
                            title="确认删除歌单？"
                            onConfirm={confirmDelete}
                            okText="确认"
                            cancelText="取消">
                            <i className="fa fa-trash-o" title="删除" onClick={()=>{setDeleteId(item.id)}}></i>
                          </Popconfirm>
                        </div>
                      </li>
                    )
                  })
                }
              </ul> : <div className="no-data">你还没有创建歌单</div>
            }
          </div>
          <div className="like-wrapper">
            <XYLittleHeaderRCM title={`我喜欢的歌单(${(state.likePlaylists&&state.likePlaylists.length)||0})`} isMore={false}></XYLittleHeaderRCM>
            <ul className="content">
              {
                state.likePlaylists && state.likePlaylists.map((item) => {
                  return (
                    <li key={item.id}>
                      <XYShowPlayList width={135} item={item}></XYShowPlayList>
                      <div className="handle">
                        <Popconfirm
                          title="确认删除歌单？"
                          onConfirm={confirmDeLike}
                          okText="确认"
                          cancelText="取消">
                          <i className="fa fa-trash-o" title="删除" onClick={()=>{setDeleteLikeId(item.id)}}></i>
                        </Popconfirm>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <Modal title="新建歌单" 
                visible={add} 
                getContainer={false}
                centered
                onCancel={handleCancel}
                cancelText="取消"
                okText="新建"
                className="login-modal mine-modal add-playlst-modal"
                closable>
              <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                className="add-playlist-form">
                <Form.Item
                  label="歌单名"
                  name="playlisyName"
                  rules={[{ required: true, message: '请输入歌单名' }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    新建
                  </Button>
                </Form.Item>
              </Form>
          </Modal>
        </div>
      }
    </MinePlaylistWrapper>
  )
})
