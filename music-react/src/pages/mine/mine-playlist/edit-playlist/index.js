import React, { memo, useState, useEffect } from 'react'
import classnames from 'classnames'
import { useDispatch } from 'react-redux';

import {editPlaylist} from '@/services/playlist'
import {changeLoginUserAction} from "@/pages/user/store"
import {allPlaylistCategory} from '@/common/local-data'

import {GlobalOutlined,HighlightOutlined,CoffeeOutlined,SmileOutlined,SkinOutlined} from '@ant-design/icons'
import { EditPlaylistWrapper, CategoryPanelWrapper } from "./style";
import {RightOutlined} from '@ant-design/icons'
import XYChangeCover from '../change-cover'
import { CSSTransition } from 'react-transition-group';
import {
  Form,
  Input,
  Button,
  message
} from 'antd';

export default memo(function XYEditPlaylist(props) {
  const cover = props.playlist.picUrl
  const username = props.username
  const name = props.playlist.name
  const description = props.playlist.description==="暂无描述" ? "" : props.playlist.description
  const tags = props.playlist.tag
  const [changeCover, setChangeCover] = useState(false)
  const [ifPick, setIfPick] = useState(false)
  const [pickTags, setPickTags] = useState(tags)
  const [pickCount, setPickCount] = useState(tags.length)
  const [form] = Form.useForm();
  const dispatch = useDispatch()

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 3,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 19,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 3,
      },
    },
  };

  useEffect(() => {
    form.setFieldsValue({
      name: name,
      description: description
    })
  },[name, description, form])

  function onFinish(values){
    let editData = {
      id: props.playlist.id,
      name: values.name,
      tags: pickTags,
      description: values.description
    }
    editPlaylist(username, editData).then(res=>{
      if(res.data.success && res.data.success === "true"){
        message.success({content:`保存成功`,className: 'suc-message'});
        if(res.data.user !== undefined){
          const user = JSON.stringify(res.data.user)
          localStorage.setItem("loginUser", user);
          dispatch(changeLoginUserAction(res.data.user))
        }
      }else{
        message.error({content:`保存失败`,className: 'err-message'});
      }
    },err=>{
      message.error({content:`保存失败`,className: 'err-message'});
    })
  }

  function handlePick(item){
    let newArr = [...pickTags], hasIndex
    let isHas = newArr.some((element, index)=>{
      if(element === item){
        hasIndex = index
        return true
      }else{return false}
    })
    if(isHas){
      newArr.splice(hasIndex, 1)
    }else{
      if(pickCount===3){
        message.warning({content:`最多选择三项`,className: 'warn-message'});
        return
      }
      newArr.push(item)
    }
    setPickTags(newArr)
    setPickCount(newArr.length)
  }

  function deletePicked(item){
    let newArr = [...pickTags], hasIndex
    newArr.forEach((element, index)=>{
      if(element === item){hasIndex = index}
    })
    newArr.splice(hasIndex, 1)
    setPickTags(newArr)
    setPickCount(newArr.length)
  }

  return (
    <EditPlaylistWrapper>
      <Form
        {...formItemLayout}
        form={form}
        name="edit-playlist"
        onFinish={onFinish}
        scrollToFirstError
        initialValues={{}}>
        <Form.Item
          name="name"
          label="歌单名"
          rules={[{ required: true, message: '请输入歌单名' }]}>
          <Input placeholder="起个名字吧"/>
        </Form.Item>
        <div className="mine-form-item">
          <span className="form-item-title">标签 : </span>
          <div>
            {
              pickTags.map((item, index)=>{
                return(
                  <span key={index} className="pick-item">
                    {item}
                    <i className="fa fa-times" onClick={()=>{deletePicked(item)}}></i>
                  </span>
                )
              })
            }
            <span className="pick-btn" onClick={()=>{setIfPick(!ifPick)}}>选择标签</span>
          </div>
          <div className="tip">选择适合的标签，最多选3个</div>
        </div>
        <Form.Item name={'description'} label="介绍"
                  rules={[{
                    max: 1000,
                    message: "介绍最多1000字"}]}
                  className="form-desc">
          <Input.TextArea />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button htmlType="submit" className="login-form-button">
            保存
          </Button>
        </Form.Item>
      </Form>
      <div className="cover">
        {
          changeCover ? 
          <div className="changeCover">
            <div className="ca-title">
              <span onClick={e=>{setChangeCover(false)}} className="return">封面</span>
              <span className="icon"><RightOutlined /></span>
              <span>更新封面</span>
            </div>
            <XYChangeCover id={props.playlist.id} username={username}></XYChangeCover>
          </div> :
          <div className="old-cover">
            <img src={cover} alt={"头像"} className="now"/>
            <div className="change-cover" onClick={e => {setChangeCover(true)}}>更换封面</div>
          </div>
        }
      </div>
      
      <CSSTransition in={ifPick} classNames="show-pick" timeout={1000} unmountOnExit={true}>
        <CategoryPanelWrapper>
          <li className="category-wrapper">
            <div className="category-title"><GlobalOutlined />{allPlaylistCategory[0][0]}</div>
            <ul className="category-content">
              {
                allPlaylistCategory[0][1].map((item, index) => {
                  return (<li key={index} onClick={()=>{handlePick(item)}}
                    className={classnames({"active-category":pickTags&&pickTags.includes(item)})}>{item}</li>)
                })
              }
            </ul>
          </li>
          <li className="category-wrapper">
            <div className="category-title"><HighlightOutlined />{allPlaylistCategory[1][0]}</div>
            <ul className="category-content">
              {
                allPlaylistCategory[1][1].map((item, index) => {
                  return (<li key={index} onClick={()=>{handlePick(item)}}
                    className={classnames({"active-category":pickTags&&pickTags.includes(item)})}>{item}</li>)
                })
              }
            </ul>
          </li>
          <li className="category-wrapper">
            <div className="category-title"><CoffeeOutlined />{allPlaylistCategory[2][0]}</div>
            <ul className="category-content">
              {
                allPlaylistCategory[2][1].map((item, index) => {
                  return (<li key={index} onClick={()=>{handlePick(item)}}
                    className={classnames({"active-category":pickTags&&pickTags.includes(item)})}>{item}</li>)
                })
              }
            </ul>
          </li>
          <li className="category-wrapper">
            <div className="category-title"><SmileOutlined />{allPlaylistCategory[3][0]}</div>
            <ul className="category-content">
              {
                allPlaylistCategory[3][1].map((item, index) => {
                  return (<li key={index} onClick={()=>{handlePick(item)}}
                    className={classnames({"active-category":pickTags&&pickTags.includes(item)})}>{item}</li>)
                })
              }
            </ul>
          </li>
          <li className="category-wrapper">
            <div className="category-title"><SkinOutlined />{allPlaylistCategory[4][0]}</div>
            <ul className="category-content">
              {
                allPlaylistCategory[4][1].map((item, index) => {
                  return (<li key={index} onClick={()=>{handlePick(item)}}
                    className={classnames({"active-category":pickTags&&pickTags.includes(item)})}>{item}</li>)
                })
              }
            </ul>
          </li>
        </CategoryPanelWrapper>
      </CSSTransition>
    </EditPlaylistWrapper>
  )
})
