import React, { memo, useState,shallowEqual } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setPassProtect } from "@/services/user"
import { passProtectQuestions } from "@/common/local-data"

import {PassProtectWrapper} from './style'
import { Steps, Button, Form, Input, Select, message } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons'

export default memo(function XYSetPassProtect(props) {
  
  const { Step } = Steps;
  const [form] = Form.useForm()
  const history = useHistory()
  const state = useSelector(state => ({
    loginUser: state.getIn(['user', 'loginUser'])
  }),shallowEqual)
  const id = state.loginUser && state.loginUser.id
  const passProtect = state.loginUser && state.loginUser.passProtect
  const [current, setCurrent] = useState(0)
  const [currentFirst, setCurrentFirst] = useState(0)

  const onFinish = (values) => {
    const question = values.question
    const anser = values.anser
    if(passProtect === undefined){
      setPassProtect({question,anser,id, type:"set"}).then(res=>{
        if(res.data.success === "true"){
          setCurrentFirst(currentFirst + 1);
          const user = JSON.stringify(res.data.user)
          localStorage.setItem("loginUser", user);
          form.resetFields();
        }else{
          message.error({content: "设置失败", className: "err-message"})
        }
      }, err=>{message.error({content: "设置失败", className: "err-message"})})
    }else{
      if(current === 0){
        setPassProtect({question,anser,id, type:"check"}).then(res=>{
          if(res.data.success === "true"){
            setCurrent(current + 1);
            form.resetFields();
          }else{
            message.error({content: "密保问题或答案错误", className: "err-message"})
          }
        }, err=>{message.error({content: "密保问题或答案错误", className: "err-message"})})
      }else{
        setPassProtect({question,anser,id, type:"set"}).then(res=>{
          if(res.data.success === "true"){
            setCurrent(current + 1);
            const user = JSON.stringify(res.data.user)
            localStorage.setItem("loginUser", user);
            form.resetFields();
          }else{
            message.error({content: "设置失败", className: "err-message"})
          }
        }, err=>{message.error({content: "设置失败", className: "err-message"})})
      }
    }
  };

  const passprotectform = (
    <Form
      name="setForm"
      className="setForm"
      onFinish={onFinish}
      form={form}>
      <Form.Item label="密保问题" name="question" rules={[{
        required: true,
        message: '此项必须输入'
      }]}>
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
      <Form.Item label="答&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;案" name="anser" rules={[{
        required: true,
        message: '此项必须输入'
      }]}>
        <Input placeholder="输入密保答案"/>
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
      <span className="suc-title">设置密保成功</span>
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
      title: '设置密保',
      content: passprotectform,
    },
    {
      title: '设置成功',
      content: success,
    },
  ];
  const stepsFirst = [
    {
      title: '设置密保',
      content: passprotectform,
    },
    {
      title: '设置成功',
      content: success,
    },
  ];
  return (
    <PassProtectWrapper>
      {
        props.location.state && props.location.state.first === true ? 
        <div>
          <Steps current={currentFirst}>
            {stepsFirst.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{stepsFirst[currentFirst].content}</div>
        </div> : 
        <div>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
        </div>
      }
    </PassProtectWrapper>
  )
})
