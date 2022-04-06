import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

/*
添加分类的form组件
 */
class AddForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    categorys: PropTypes.array.isRequired, // 一级分类的数组
    parentId: PropTypes.string.isRequired, // 父分类的ID
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const {categorys, parentId} = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        

        <Item>分类名称：
          {
            getFieldDecorator('name', {
              initialValue: '',
              rules: [
                {required: true, message: '分类名称必须输入'}
              ]
            })(
              <Input placeholder='请输入分类名称'/>
            )
          }
        </Item>

        <Item>排序值：
          {
            getFieldDecorator('orderNum', {
              initialValue: '',
              rules: [
                {required: true, message: '排序值必须输入'}
              ]
            })(
              <Input placeholder='请输入排序值'/>
            )
          }
        </Item>

        <Item>目录级别：
          {
            getFieldDecorator('type', {
              initialValue: '',
              rules: [
                {required: true, message: '目录级别必须输入'}
              ]
            })(
              <Input placeholder='请输入目录级别（1，2，3）'/>
            )
          }
        </Item>

        <Item>上级目录id：
          {
            getFieldDecorator('parentId', {
              initialValue: '',
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

export default Form.create()(AddForm);