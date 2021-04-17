import React, { memo, useState,shallowEqual } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setPass, setPassProtect } from "@/services/user"
import { passProtectQuestions } from "@/common/local-data"

import {PasswordWrapper} from './style'
import { Steps, Button, Form, Input, Select, message } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons'

export default memo(function XYSetPassword() {
  const { Step } = Steps;
  const [form] = Form.useForm()
  const history = useHistory()
  const state = useSelector(state => ({
    loginUser: state.getIn(['user', 'loginUser'])
  }),shallowEqual)
  const id = state.loginUser && state.loginUser.id
  const [current, setCurrent] = useState(0)

  const onFinishPassprotect = (values) => {
    const question = values.question
    const anser = values.anser
    setPassProtect({question,anser,id, type:"check"}).then(res=>{
      if(res.data.success === "true"){
        setCurrent(current + 1);
        form.resetFields();
      }else{
        message.error({content: "密保问题或答案错误", className: "err-message"})
      }
    }, err=>{message.error({content: "密保问题或答案错误", className: "err-message"})})
  };

  const onFinishPassword = (values) => {
    const password = values.password
    setPass(password, id).then(res => {
      if(res.data.success === "true"){
        setCurrent(current + 1);
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("loginUser", user);
        form.resetFields();
      }else{
        message.error({content: "修改密码失败", className: "err-message"})
      }
    }, err => {
      message.error({content: "修改密码失败", className: "err-message"})
    })
  }

  const passprotectform = (
    <Form
      name="checkForm"
      className="setForm"
      onFinish={onFinishPassprotect}
      form={form}>
      <Form.Item label="密保问题" name="question">
        <Select>
          {
            passProtectQuestions.map((item, index) => {
              return (
                <Select.Option key={item} value={item}>{item}</Select.Option>
              )
            })
          }
        </Select>
      </Form.Item>
      <Form.Item label="答&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;案" name="anser">
        <Input placeholder="输入密保答案"/>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="set-button login-form-button">
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
  const passwordform = (
    <Form
      name="passwordForm"
      className="setForm"
      onFinish={onFinishPassword}
      form={form}>
      <Form.Item
        name="password"
        label="新的密码"
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
      <Form.Item>
        <Button htmlType="submit" className="set-button login-form-button">
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
  const success = (
    <div className="success">
      <span className="suc-title">修改密码成功</span>
      <CheckCircleFilled className="suc-icon"/>
      <Button onClick={() => {history.push("/user/setting/basic")}} className="suc-btn login-form-button">返回个人设置</Button>
    </div>
  );
  const steps = [
    {
      title: '验证身份',
      content: passprotectform,
    },
    {
      title: '设置密码',
      content: passwordform,
    },
    {
      title: '设置成功',
      content: success,
    },
  ];
  return (
    <PasswordWrapper>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
    </PasswordWrapper>
  )
})
