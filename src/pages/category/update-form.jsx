import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item

/*
更新分类的form组件
 */
class UpdateForm extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  componentWillMount () {
    // 将form对象通过setForm()传递父组件
    this.props.setForm(this.props.form)
  }

  render() {

    const {name,orderNum,type,parentId} = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item> 分类名称
          {
            getFieldDecorator('name', {
              initialValue: name,
              rules: [
                {required: true, message: '分类名称必须输入'}
              ]
            })(
             <Input placeholder='请输入分类名称'/>
            )
          }
        </Item>

        <Item> 排序值
          {
            getFieldDecorator('orderNum', {
              initialValue: orderNum,
              rules: [
                {required: true, message: '排序值必须输入'}
              ]
            })(
              <Input placeholder='请输入排序值'/>
            )
          }
        </Item>

        <Item> 目录级别
          {
            getFieldDecorator('type', {
              initialValue: type,
              rules: [
                {required: true, message: '目录级别必须输入'}
              ]
            })(
              <Input placeholder='请输入目录级别'/>
            )
          }
        </Item>

        <Item> 上级目录id：
          {
            getFieldDecorator('parentId', {
              initialValue: parentId,
              rules: [
                {required: true, message: '上级目录id必须输入'}
              ]
            })(
              <Input placeholder='请输入上级目录id'/>
            )
          }
        </Item>

      </Form>
    )
  }
}

export default Form.create()(UpdateForm)