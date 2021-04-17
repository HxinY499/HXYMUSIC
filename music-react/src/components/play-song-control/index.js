import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {
  getSongDetailToPlayListAction,
  changeAddPlayListAction,
  changeSongListToPlayListAction
} from '@/pages/player/store/actionCreators'
import { setLikes } from "@/services/user";
import { addPost } from "@/services/post";
import {changeLoginUserAction} from "@/pages/user/store"
import {getBase64} from '@/utils/format-utils'

import {PlaySongControlWrapper} from './style'
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Modal, Upload } from 'antd';
import Picker from 'emoji-picker-react';

export default memo(function XYPlaySongControl(props) {
  const playSong = props.playSong || []
  const shareInfo = props.shareInfo || {}
  const songToPlaylist = props.songToPlaylist || {}
  const type = props.type || "all"
  const hasAdd = props.hasAdd
  const notOther = props.notOther
  const likeId = props.likeId
  const likeType = props.likeType
  const likeBtn = props.likeText || "喜欢"
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [ifLike, setIfLike] = useState(false)
  const [shareText, setShareText] = useState("")
  const [fileList, setFileList] = useState([])
  const [postImg, setPostImg] = useState([])
  const [previewImage, setPreviewImage] = useState()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [isShowUpload, setIsShowUpload] = useState(false)
  const [isShowEmoji, setIsShowEmoji] = useState(false)
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    loginUser: state.getIn(['user', 'loginUser'])
  }), shallowEqual)

  useEffect(() => {
    let like = state.loginUser&&state.loginUser.likes&&state.loginUser.likes[likeType]&&
    state.loginUser.likes[likeType].includes(parseInt(likeId))
    like ? setIfLike(true) : setIfLike(false)
  }, [likeType,likeId,state.loginUser])

  function play(playSong){
    if(playSong&&playSong.length>0){
      if(type === "single"){
        dispatch(getSongDetailToPlayListAction(playSong))
      }else if(type === "all"){
        dispatch(changeSongListToPlayListAction(playSong))
      }
    }
  }

  function addPlaylist(song){
    dispatch(changeAddPlayListAction(song))
  }

  function isLoginFn(){
    if(JSON.stringify(state.loginUser)==="{}"){
      message.error({content: "请先登录", className: "err-message"})
      return false
    }else{
      return true
    }
  }

  function handleLike(){
    let isLogin = isLoginFn()
    if(isLogin){
      setLikes(state.loginUser&&state.loginUser.username, likeType, likeId).then(res=>{
        if(res.data.success === "true"){
          const user = JSON.stringify(res.data.user)
          localStorage.setItem("loginUser", user);
          dispatch(changeLoginUserAction(res.data.user))
        }else{
          message.error({content: "处理失败", className: "err-message"})
        }
      }, err=>{
        message.error({content: "处理失败", className: "err-message"})
      })
    }else{
      return
    }
  }

  function handleCollectSong(){
    let isLogin = isLoginFn()
    if(isLogin){
      props.collectSong()
    }else{
      return
    }
  }

  function handleShare(){
    let isLogin = isLoginFn()
    if(isLogin){
      setIsModalVisible(true)
    }else{
      return
    }
  }

  function handleCancel(){
    setFileList([])
    setShareText("")
    setIsShowUpload(false)
    setIsModalVisible(false)
    setIsShowEmoji(false)
    setPostImg([])
  }

  function handlePreviewCancel(){
    setPreviewVisible(false)
  }

  function handleSubmit(e){
    let formData = new FormData()
    postImg.forEach(item=>{
      formData.append("posts", item)
    })
    formData.append("text", shareText)
    formData.append("shareInfo", JSON.stringify(shareInfo))
    formData.append("username", JSON.parse(localStorage.getItem("loginUser")).username)
    addPost(formData).then(res=>{
      if(res.data.success === "true"){
        message.success({content: "分享成功", className: "suc-message"})
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("loginUser", user);
        dispatch(changeLoginUserAction(res.data.user))
      }else{
        message.error({content: "分享失败", className: "err-message"})
      }
    }, err => {
      message.error({content: "分享失败", className: "err-message"})
    })
    handleCancel()
    e.preventDefault();
  }

  function handleShareTextChange(e){
    setShareText(e.target.value)
  }

  const handleUploadChange = ({ fileList }) => {setFileList( fileList )};

  const handleUploadPreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  };

  function uploadImgs(values){
    let arr = [...postImg]
    arr.push(values.file)
    setPostImg(arr)
    values.onSuccess()
  }

  function onEmojiClick(event, emojiObject){
    let text = shareText
    text += emojiObject.emoji
    setShareText(text)
  }

  return (
    <PlaySongControlWrapper>
      <button className='play-button btn' onClick={e=>{play(playSong, type)}}>
        <PlayCircleOutlined />播放
      </button>
      {
        hasAdd && <button className='play-button2' onClick={e=>{addPlaylist(songToPlaylist)}}><PlusOutlined /></button>
      }
      {
        !notOther && 
        <div className="other-btn">
          <button className="btn btn2" onClick={e=>{handleLike();}}>
            <i className="fa fa-heart" style={{"color":ifLike ? "var(--red)" : ""}}></i>{likeBtn}
          </button>
          <button className="btn btn2 collect" onClick={()=>{handleCollectSong()}}><i className="fa fa-plus-square-o"></i>收藏</button>
          <button className="btn btn2" onClick={()=>{handleShare()}}><i className="fa fa-share-square-o"></i>分享</button>
          <button className="btn btn2"><i className="fa fa-download"></i>下载</button>
        </div>
      }
      <Modal title="分享" 
             visible={isModalVisible} 
             getContainer={false}
             centered
             onCancel={handleCancel}
             className="login-modal mine-modal share-modal">
        <form onSubmit={e => handleSubmit(e)}>
          <textarea className="text-area" onChange={e => handleShareTextChange(e)} value={shareText}></textarea>
          <div className="share-info">
            {`${shareInfo.type}：${shareInfo.name} by ${shareInfo.creator}`}
          </div>
          <div className="share-control">
            <i className="fa fa-smile-o" onClick={()=>setIsShowEmoji(!isShowEmoji)}></i>
            <i className="fa fa-picture-o" onClick={()=>setIsShowUpload(!isShowUpload)}></i>
          </div>
          {
            isShowEmoji ? 
            <Picker onEmojiClick={onEmojiClick}/> : null
          }
          {
            isShowUpload ? 
            <Upload
              name="posts"
              listType="picture-card"
              className="img-uploader"
              fileList={fileList}
              onPreview={handleUploadPreview}
              onChange={handleUploadChange}
              customRequest={uploadImgs}>
              {fileList.length >= 9 ? null : uploadButton}
            </Upload> : null
          }
          <input type="submit" value="分享" className="submit"></input>
        </form>
      </Modal>
      <Modal
        visible={previewVisible}
        title={"预览"}
        footer={null}
        onCancel={handlePreviewCancel}
        className={"login-modal mine-modal"}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </PlaySongControlWrapper>
  )
})
