import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Form,
  Icon,
  Input,
  Button,
  message
} from 'antd'
import { connect } from 'react-redux'

import './login.less'
import logo from '../../assets/images/logo.png'
import { login } from '../../redux/actions'

// const Item = Form.Item // 不能写在import之前

/*
登陆的路由组件
 */
class Login extends Component {

  
  handleSubmit = (event, user) => {

    // //console.log(user)
    // 阻止事件的默认行为
    event.preventDefault()

    // 对所有表单字段进行检验
    this.props.form.validateFields(async (err, values) => {
      // 检验成功
      if (!err) {
        //console.log('提交登陆的ajax请求', values)
        // 请求登陆
        // const { userName, password } = values

        // 调用分发异步action的函数 => 发登陆的异步请求, 有了结果后更新状态
        this.props.login(values.userName, values.password);
       
      } else {
        // //console.log('检验失败!')
      }
    });

    // 得到form对象
    // const form = this.props.form
    // // 获取表单项的输入数据
    // const values = form.getFieldsValue()
    // //console.log('handleSubmit()', values)
  }


  render() {

    // 得到具强大功能的form对象
    const form = this.props.form
    const { getFieldDecorator } = form;
    // 如果用户已经登陆, 自动跳转到管理界面
    const user = this.props.user
    //console.log(user)
    if (user && user.id) {
      message.success("登录成功")
      return (<Redirect to='/home' />);
    }
    return ( 
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>基于SpringCloud + React的社区电商后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>管理员登录</h2>
          <Form onSubmit={(event) => { this.handleSubmit(event, user) }} className="login-form">
            {/* <Form onSubmit={this.handleSubmit} className="login-form"> */}
            <Form.Item>
              {
                getFieldDecorator('userName', { // 配置对象: 属性名是特定的一些名称
                  // 声明式验证: 直接使用别人定义好的验证规则进行验证
                  rules: [
                    { required: true, whitespace: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名至少4位' },
                    { max: 12, message: '用户名最多12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                  ],
                  // initialValue: 'admin', // 初始值
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    { required: true, whitespace: true, message: '密码必须输入' },
                    { min: 4, message: '密码至少8位' },
                    { max: 12, message: '密码最多16位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }

            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
      )
    
  }
}

const WrapLogin = Form.create()(Login)
export default connect(
  state => ({ user: state.user }),
  { login }
)(WrapLogin)

