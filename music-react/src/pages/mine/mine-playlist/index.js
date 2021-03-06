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
      message.error({content: "????????????", className: "err-message"})
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
      message.error({content: "????????????", className: "err-message"})
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
      message.error({content: "????????????", className: "err-message"})
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
            <span>????????????</span>
          </div>
          <XYEditPlaylist playlist={editPlaylist} username={state.loginUser&&state.loginUser.username}></XYEditPlaylist>
        </div> : 
        <div>
          <div className="mine-wrapper">
            <XYLittleHeaderRCM title={`??????????????????(${(state.createPlaylists&&state.createPlaylists.length)||0})`} isMore={false}></XYLittleHeaderRCM>
            <button className="add-playlist" onClick={()=>{showModal()}}><i>+</i>??????</button>
            {
              state.createPlaylists && state.createPlaylists.length>0 ?
              <ul className="content">
                {
                  state.createPlaylists && state.createPlaylists.map((item) => {
                    return (
                      <li key={item.id}>
                        <XYShowPlayList width={135} item={item}></XYShowPlayList>
                        <div className="handle">
                          <i className="fa fa-pencil-square-o" title="??????"
                            onClick={()=>{setEdit(true);setEditPlaylist(item)}}></i>
                          <Popconfirm
                            title="?????????????????????"
                            onConfirm={confirmDelete}
                            okText="??????"
                            cancelText="??????">
                            <i className="fa fa-trash-o" title="??????" onClick={()=>{setDeleteId(item.id)}}></i>
                          </Popconfirm>
                        </div>
                      </li>
                    )
                  })
                }
              </ul> : <div className="no-data">????????????????????????</div>
            }
          </div>
          <div className="like-wrapper">
            <XYLittleHeaderRCM title={`??????????????????(${(state.likePlaylists&&state.likePlaylists.length)||0})`} isMore={false}></XYLittleHeaderRCM>
            <ul className="content">
              {
                state.likePlaylists && state.likePlaylists.map((item) => {
                  return (
                    <li key={item.id}>
                      <XYShowPlayList width={135} item={item}></XYShowPlayList>
                      <div className="handle">
                        <Popconfirm
                          title="?????????????????????"
                          onConfirm={confirmDeLike}
                          okText="??????"
                          cancelText="??????">
                          <i className="fa fa-trash-o" title="??????" onClick={()=>{setDeleteLikeId(item.id)}}></i>
                        </Popconfirm>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <Modal title="????????????" 
                visible={add} 
                getContainer={false}
                centered
                onCancel={handleCancel}
                cancelText="??????"
                okText="??????"
                className="login-modal mine-modal add-playlst-modal"
                closable>
              <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                className="add-playlist-form">
                <Form.Item
                  label="?????????"
                  name="playlisyName"
                  rules={[{ required: true, message: '??????????????????' }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    ??????
                  </Button>
                </Form.Item>
              </Form>
          </Modal>
        </div>
      }
    </MinePlaylistWrapper>
  )
})
