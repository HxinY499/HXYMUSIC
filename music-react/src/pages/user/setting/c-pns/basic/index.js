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
        message.warning({content:`????????????????????????`,className: 'warn-message'});
        return
    }
    basicSetting(values).then(res=>{
      if(res.data.success && res.data.success === "true"){
        message.success({content:`????????????`,className: 'suc-message'});
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("loginUser", user);
        dispatch(changeLoginUserAction(res.data.user))
      }else{
        message.error({content:`????????????`,className: 'err-message'});
      }
    },err=>{
      message.error({content:`????????????`,className: 'err-message'});
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
              label="??????">
              <Input disabled/>
            </Form.Item>
            <Form.Item
              name="id"
              label="I D">
              <Input disabled/>
            </Form.Item>

            <Form.Item
              name="nickname"
              label="??????"
              rules={[{
                    pattern: new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9]+$","g"),
                    message: "???????????????2???20??????????????????????????????_????????????"},
                    {
                      min: 2,
                      max: 20,
                      message: "???????????????2???20???"
                    },
                    {
                      required: true,
                      message: "??????????????????"
                    }]}>
              <Input placeholder="???????????????"/>
            </Form.Item>
            <Form.Item name={'description'} label="??????"
                      rules={[{
                        max: 300,
                        message: "????????????300???"}]}>
              <Input.TextArea placeholder="????????????????????????"/>
            </Form.Item>
            <Form.Item
              name="gender"
              label="??????">
              <Radio.Group>
                <Radio.Button value={1}>???</Radio.Button>
                <Radio.Button value={0}>???</Radio.Button>
                <Radio.Button value={-1}>??????</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="birthday" label="??????">
              <DatePicker placeholder="??????????????????????????????"/>
            </Form.Item>
            <Form.Item
              name="residence"
              label="??????">
              <Cascader options={residences} placeholder="?????????????????????"/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button htmlType="submit" className="login-form-button">
                ??????
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="avatar">
          {
            changeAvatar ? 
            <div className="changeAvatar">
              <div className="ca-title">
                <span onClick={e=>{setChangeAvatar(false)}} className="return">??????</span>
                <span className="icon"><RightOutlined /></span>
                <span>????????????</span>
              </div>
              <XYChangeAvatar id={id}></XYChangeAvatar>
            </div> :
            <div>
              <img src={avatar} alt={"??????"} className="now"/>
              <div className="change-avatar" onClick={e => {setChangeAvatar(true)}}>????????????</div>
            </div>
          }
        </div>
      </div>
    </BasicWrapper>
  )
})
