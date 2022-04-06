import './order.less'
import React, {Component} from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message,
  Modal
} from 'antd'

import LinkButton from '../../components/link-button'
import {reqOrders, reqSearchOrders,reqOrderDelivery,reqOrderEnd} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
import memoryUtils from "../../utils/memoryUtils";

const Option = Select.Option


export default class OrderHome extends Component {
 
  state = {
    total: 0, // 订单的总数量
    orders: [], // 订单的数组
    loading: false, // 是否正在加载中
    searchContent: '', // 搜索的关键字内容
    searchType: 'orderNo', // 根据哪个字段搜索
  }


  /*
  初始化table的列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        width: 140,
        title: '订单号',
        dataIndex: 'orderNo',
      },
      {
        width: 100,
        title: '订单总价',
        dataIndex: 'totalPrice',
        render: (totalPrice) => '¥' + totalPrice/100 // 当前指定了对应的属性, 传入的是对应的属性值
      },
      {
        width:110,
        title: '订单状态',
        dataIndex: 'orderStatusName',
        // render:(orderStatus) => {
        //   switch(orderStatus){
        //     case 0:return "用户已取消";
        //     case 10:return "未付款";
        //     case 20:return "已支付";
        //     case 30:return "已发货";
        //     case 40:return "交易完成";
        //   }
        // }
      },
      {
        width:100,
        title: '支付方式',
        dataIndex: 'paymentType',
        render:(paymentType) => paymentType==1?"在线支付":"货到付款"
      },
      {
        width:150,
        title: '创建时间',
        dataIndex: 'createTime',
        render:(createTime) => createTime.substring(0,10)+" "+createTime.substring(11,20)
      },
      {
        width:100,
        title: '收货人',
        dataIndex: 'receiverName'
      },
      {
        width:140,
        title: '收货人手机号',
        dataIndex: 'receiverMobile'
      },
      {
        title: '收货地址',
        dataIndex: 'receiverAddress'
      },
      {
        width: 100,
        title: '操作',
        render: (order) => {
          return (
            <span>
              {/*将order对象使用state传递给目标路由组件*/}
              <LinkButton onClick={() => this.showDetail(order)}>详情</LinkButton>
              <LinkButton onClick={() => this.showDelivery(order)}>发货</LinkButton>
              <LinkButton onClick={() => this.showEnd(order)}>完结</LinkButton>
            </span>
          )
        }
      },
    ];
  }


  /*
  获取指定页码的列表数据显示
   */
  getOrders = async (pageNum) => {
    this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
    this.setState({loading: true}) // 显示loading

    const {searchContent, searchType} = this.state
    // 如果搜索关键字有值, 说明我们要做搜索分页
    let result
    if (searchContent) {
      result = await reqSearchOrders({pageNum, pageSize: PAGE_SIZE, searchContent, searchType})
    } else { // 一般分页请求
      result = await reqOrders(pageNum, PAGE_SIZE)
    }

    this.setState({loading: false}) // 隐藏loading
    if (result.status === 10000) {
      // 取出分页数据, 更新状态, 显示分页列表
      const {total, list} = result.data
      //console.log(total,list)
      this.setState({
        total,
        orders: list
      })
    }
  }


  /**
   *  显示订单详情界面
   */
  showDetail = (order) => {
    // 缓存order对象 ==> 给detail组件使用
    memoryUtils.order = order
    this.props.history.push(
      '/order/detail'
    )
  }

  /**
   * 订单发货
   */
  showDelivery = (order) =>{
    Modal.confirm({
      title: `确认发货${order.orderNo}吗?`,
      onOk: async () => {
        let orderNo =parseInt(order.orderNo);
        const result = await reqOrderDelivery(orderNo)
        if (result.status === 10000) {
          message.success('发货成功!')
          this.getOrders(1)
        }
      }
    })
  }

   /**
   * 订单完结
   */
    showEnd = (order) =>{
      Modal.confirm({
        title: `确认完结${order.orderNo}吗?`,
        onOk: async () => {
          let orderNo =parseInt(order.orderNo);
          const result = await reqOrderEnd(orderNo)
          if (result.status === 10000) {
            message.success('订单交易完成!')
            this.getOrders(1)
          }
        }
      })
    }


  componentWillMount () {
    this.initColumns()
  }
 
  componentDidMount () {
    this.getOrders(1)
  }

 render() {

    // 取出状态数据
    const {orders, total, loading, searchType, searchContent} = this.state



    const title = (
      <span>
        <Select
          value= {searchType}
          style={{width: 150}}
          onChange={value => this.setState({searchType:value})}
        >
          <Option value='orderNo'>按订单号搜索</Option>
          <Option value='receiverName'>按收货人搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{width: 150, margin: '0 15px'}}
          value={searchContent}
          onChange={event => this.setState({searchContent:event.target.value})}
        />
        <Button type='primary' onClick={() => this.getOrders(1)}>搜索</Button>
      </span>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='id'
          loading={loading}
          dataSource={orders}
          columns={this.columns}
          pagination={{
            current: this.pageNum,
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getOrders
          }}
        />
      </Card>
    )
  }
}

 