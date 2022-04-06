import React, { Component } from 'react'
import {  Card,Row, Col, Table, message,Icon } from 'antd';
import { reqOrderDetail } from '../../api'
import './order-detail.less'
import memoryUtils from "../../utils/memoryUtils";
import LinkButton from '../../components/link-button'
/*
Order的详情子路由组件
 */
export default class OrderDetail extends Component {

  constructor(props) {
    super(props);
    this.columns = [{
      title: '商品图片',
      dataIndex: 'productImg',
      render: (text) => {
        return (
          <img src={text} alt="商品图片" />
        )
      }
    }, {
      title: '商品信息',
      dataIndex: 'productName',
    }, {
      title: '单价',
      dataIndex: 'unitPrice',
      render:(unitPrice) => "￥"+unitPrice/100
    }, {
      title: '数量',
      dataIndex: 'quantity',
    }, {
      title: '合计',
      dataIndex: 'totalPrice',
      render:(totalPrice) => "￥"+totalPrice/100
    }];
    this.state = {
      orderInfo: {},
      productList: [],
    }
  }

  //查询订单详情
  _requestOrderDetail = () => {
    //console.log(memoryUtils.order.orderNo)
    let orderNo = memoryUtils.order.orderNo
    let params = orderNo
    reqOrderDetail(params).then(res => {
      let { status, msg, data } = res;
      if (status !== 10000) {
        message.error(msg);
        return;
      }
      let productList = Array.from(data.orderItemVOList).map((item) => {
        item['productImg'] = `${item.productImg}`  //${data['imageHost']}${item.productImg}
        return item;
      });

      this.setState({
        orderInfo: data,
        productList: productList
      })
    })
  }

  componentDidMount() {
   // const { orderNo, createTime, receiverName,receiverMobile,receiverAddress,orderStatus, paymentType, totalPrice,orderItemVOList } = memoryUtils.order
    this._requestOrderDetail();
  }
  /*
 在卸载之前清除保存的数据
 */
  componentWillUnmount() {
    memoryUtils.order = {}
  }

  render() {
    const title = (
      <span>
        <LinkButton>
          <Icon
            type='arrow-left'
            style={{marginRight: 10, fontSize: 20}}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>

        <span>订单详情</span>
      </span>
    )
    
    return (
      <Card title={title} className='order-detail'>
      <article className="order-detail">
        <Row>
          <Col className='title' span={6}>订单号：</Col>
          <Col className='info' span={18}>{this.state.orderInfo.orderNo}</Col>
        </Row>
        <Row>
          <Col className='title' span={6}>创建时间：</Col>
          <Col className='info' span={18}>{this.state.orderInfo.createTime}</Col>
        </Row>
        <Row>
          <Col className='title' span={6}>收货人信息：</Col>
          <Col className='info' span={18}>
            {this.state.orderInfo.receiverName}，
            {this.state.orderInfo.receiverMobile}，
            {this.state.orderInfo.receiverAddress}
          </Col>
        </Row>
        <Row>
          <Col className='title' span={6}>订单状态</Col>
          <Col className='info' span={18}>
            {this.state.orderInfo.orderStatusName}
          </Col>
        </Row>
        <Row>
          <Col className='title' span={6}>支付方式</Col>
          <Col className='info' span={18}>{this.state.orderInfo.paymentType == 1 ? "在线支付" : "货到付款"}</Col>
        </Row>
        <Row>
          <Col className='title' span={6}>订单金额</Col>
          <Col className='info' span={18}>￥{this.state.orderInfo.totalPrice/100}</Col>
        </Row>
        <Row>
          <Col className='title' span={6}>商品列表</Col>
          <Col className='info' span={18}>
            <Table
              columns={this.columns} rowKey='productId'
              dataSource={this.state.productList}
              pagination={false}
            />
          </Col>
        </Row>
      </article>
      </Card>
    )
  }

}