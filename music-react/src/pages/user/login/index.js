import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux';

import {register, login} from '@/services/user'
import {changeLoginUserAction} from "../store/actionCreators"

import {XYLoginWrapper} from './style'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  Modal,
  Button,
  Form,
  Input,
  Checkbox,
  message
} from 'antd';

export default memo(function XYLogin(props) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch()

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields()
    setIsRegister(false)
  };

  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 5 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
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
        offset: 5,
      },
    },
  };
  
  const onFinishRegister = values => {
    register(values).then(res => {
      if(res.data.success && res.data.success === "true"){
        message.success({content:`${values.email}，您已注册成功`,className: 'suc-message'});
        form.resetFields()
        setIsRegister(false);
      }else{
        if(res.data.reason && res.data.reason === "alreadyExist"){
          message.error({content:'该邮箱已有账号注册',className: 'err-message'});
        }else{
          message.error({content:'注册失败',className: 'err-message'});
        }
      }
    })
  }
  const onFinishLogin = values => {
    login(values).then(res => {
      if(res.data.success && res.data.success === "true"){
        message.success({content:`${res.data.user.nickname}，您已登录成功`,className: 'suc-message'});
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("loginUser", user);
        dispatch(changeLoginUserAction(res.data.user))
        form.resetFields();
        setIsModalVisible(false);
      }else{
        if(res.data.reason && res.data.reason === "noUser"){
          message.error({content:"该邮箱还未注册账号",className: 'err-message'});
        }else if(res.data.reason === "passwordError"){
          message.error({content:"密码错误",className: 'err-message'});
        }
      }
    })
  }

  return (
    <XYLoginWrapper>
      <Button className="btn" onClick={showModal}>
        {props.btnTitle}
      </Button>
      <Modal title="享受音乐，享受生活" 
             visible={isModalVisible} 
             getContainer={false}
             centered
             onCancel={handleCancel}
             className="login-modal mine-modal">
        {
          isRegister ? 
          // 注册页
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinishRegister}
            scrollToFirstError>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  type: 'email',
                  message: '您输入的邮箱号无效',
                },
                {
                  required: true,
                  message: '请输入邮箱号',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
                {
                  len: 6,
                  max: 8,
                  message: "密码应为6到8位数字和字母的组合"
                }
              ]}
              hasFeedback>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请确认密码',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('您输入的两次密码不匹配');
                  },
                }),
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject('请先勾选“我已阅读并同意服务条款”'),
                },
              ]}
              {...tailFormItemLayout}>
              <Checkbox>
                我已阅读并同意 <a href="#/">服务条款</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button htmlType="submit" className="register">
                注册
              </Button>
              <Button className="returnLogin" onClick={e => {
                setIsRegister(!isRegister);
                form.resetFields();
              }}>
                返回登录
              </Button>
            </Form.Item>
          </Form> : 
          // 登录页
          <Form
            name="login"
            className="login-form"
            onFinish={onFinishLogin}
            form={form}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用 户 名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密  码"/>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" className="login-form-button">
                登录
              </Button>
              或 <span className="goRegister" onClick={e => {
                  setIsRegister(!isRegister);
                  form.resetFields();
                }}>立 即 注 册</span>
            </Form.Item>
          </Form>
        }
      </Modal>
    </XYLoginWrapper>
  )
})
