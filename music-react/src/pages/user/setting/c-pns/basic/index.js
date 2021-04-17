import React, { memo, useEffect, useState,shallowEqual } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

import {residences} from "@/common/local-data"
import {changeLoginUserAction} from '../../../store/actionCreators'
import {basicSetting} from '@/services/user'

import {BasicWrapper} from './style'
import XYChangeAvatar from "../change-avatar"
import {RightOutlined} from '@ant-design/icons'
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  Cascader,
  message
} from 'antd';

export default memo(function XYBasic() {
  const state = useSelector((state) => ({
    loginUser: state.getIn(["user", "loginUser"])
  }),shallowEqual)
  const [changeAvatar, setChangeAvatar] = useState(false)
  const avatar = state.loginUser && state.loginUser.avatar;
  const email = state.loginUser && state.loginUser.username;
  const nickname = state.loginUser && state.loginUser.nickname;
  const description = state.loginUser && state.loginUser.description;
  const gender = state.loginUser && state.loginUser.gender;
  const birthday = moment(state.loginUser && state.loginUser.birthday);
  const residence = state.loginUser && state.loginUser.residence;
  const id = state.loginUser && state.loginUser.id;

  useEffect(() => {
    form.setFieldsValue({
      email: email,
      nickname: nickname,
      description: description,
      gender: gender,
      birthday: birthday,
      residence: residence,
      id: id
    })
  },[email, nickname, description, gender, birthday, residence, id])
  
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
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const onFinishBasic = (values) => {
    if(values.nickname === nickname &&
      values.description === description &&
      values.gender === gender &&
      values.birthday === birthday &&
      values.residence === residence){
        message.warning({content:`您的信息没有改变`,className: 'warn-message'});
        return
    }
    basicSetting(values).then(res=>{
      if(res.data.success && res.data.success === "true"){
        message.success({content:`保存成功`,className: 'suc-message'});
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("loginUser", user);
        dispatch(changeLoginUserAction(res.data.user))
      }else{
        message.error({content:`保存失败`,className: 'err-message'});
      }
    },err=>{
      message.error({content:`保存失败`,className: 'err-message'});
    })
  };

  return (
    <BasicWrapper>
      <div className="content">
        <div className="detail">
          <Form
            {...formItemLayout}
            form={form}
            name="setting"
            onFinish={onFinishBasic}
            scrollToFirstError
            initialValues={{}}>
            <Form.Item
              name="email"
              label="邮箱">
              <Input disabled/>
            </Form.Item>
            <Form.Item
              name="id"
              label="I D">
              <Input disabled/>
            </Form.Item>

            <Form.Item
              name="nickname"
              label="昵称"
              rules={[{
                    pattern: new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9]+$","g"),
                    message: "昵称只能是2到20位的字母数字汉字和“_”的组合"},
                    {
                      min: 2,
                      max: 20,
                      message: "昵称只能是2到20位"
                    },
                    {
                      required: true,
                      message: "昵称不能为空"
                    }]}>
              <Input placeholder="起个名字吧"/>
            </Form.Item>
            <Form.Item name={'description'} label="介绍"
                      rules={[{
                        max: 300,
                        message: "介绍最多300字"}]}>
              <Input.TextArea placeholder="介绍一下你自己吧"/>
            </Form.Item>
            <Form.Item
              name="gender"
              label="性别">
              <Radio.Group>
                <Radio.Button value={1}>男</Radio.Button>
                <Radio.Button value={0}>女</Radio.Button>
                <Radio.Button value={-1}>保密</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="birthday" label="生日">
              <DatePicker placeholder="你什么时候过生日呢？"/>
            </Form.Item>
            <Form.Item
              name="residence"
              label="地区">
              <Cascader options={residences} placeholder="你住在哪里呢？"/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button htmlType="submit" className="login-form-button">
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="avatar">
          {
            changeAvatar ? 
            <div className="changeAvatar">
              <div className="ca-title">
                <span onClick={e=>{setChangeAvatar(false)}} className="return">头像</span>
                <span className="icon"><RightOutlined /></span>
                <span>更新头像</span>
              </div>
              <XYChangeAvatar id={id}></XYChangeAvatar>
            </div> :
            <div>
              <img src={avatar} alt={"头像"} className="now"/>
              <div className="change-avatar" onClick={e => {setChangeAvatar(true)}}>更换头像</div>
            </div>
          }
        </div>
      </div>
    </BasicWrapper>
  )
})
