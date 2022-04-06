import React, { Component } from 'react'
import {
  Card,
  Button,
  Icon,
  Table,
  message,
  Modal
} from 'antd'

import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus, reqDeleteProduct } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import memoryUtils from "../../utils/memoryUtils";


/*
Product的默认子路由组件
 */
export default class ProductHome extends Component {

  state = {
    total: 0, // 商品的总数量
    products: [], // 商品的数组
    loading: false, // 是否正在加载中
    keyword: '', // 搜索的关键字
  }

  /*
  初始化table的列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        width: 50,
        title: '商品id',
        dataIndex: 'id',
      },
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品更新时间',
        dataIndex: 'updateTime',
        render: (updateTime) => updateTime.substring(0, 10) + " " + updateTime.substring(11, 20)
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price / 100
      },
      {
        title: '商品库存',
        dataIndex: 'stock',
      },
      {
        width: 100,
        title: '状态',
        //dataIndex: 'status',
        render: (product) => {
         // //console.log(product)
          const { status, id } = product
          const newStatus = status === 1 ? 0 : 1
          return (
            <span>
              <span>{status === 1 ? '在售' : '已下架'}</span>
              <Button
                type='primary'
                onClick={() => this.updateStatus(id, newStatus)}
              >
                {status === 1 ? '下架' : '上架'}
              </Button>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              {/*将product对象使用state传递给目标路由组件*/}
              <LinkButton onClick={() => this.showDetail(product)}>详情</LinkButton>
              <LinkButton onClick={() => this.showUpdate(product)}>修改</LinkButton>
              <LinkButton onClick={() => this.deleteProduct(product)}>删除</LinkButton>
            </span>
          )
        }
      },
    ];
  }

  /*
  显示商品详情界面
   */
  showDetail = (product) => {
    // 缓存product对象 ==> 给detail组件使用
    memoryUtils.product = product
    this.props.history.push('/product/detail')
  }

  /*
  显示修改商品界面
   */
  showUpdate = (product) => {
    // 缓存product对象 ==> 给修改组件使用
    memoryUtils.product = product
    this.props.history.push('/product/update')
  }

  /*
  获取指定页码的列表数据显示
   */
  getProducts = async (pageNum) => {
    this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
    this.setState({ loading: true }) // 显示loading

    const { keyword} = this.state
    // 如果搜索关键字有值, 说明我们要做搜索分页
    let result
    if (keyword) {
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, keyword })
    } else { // 一般分页请求
      result = await reqProducts(pageNum, PAGE_SIZE)
    }

    this.setState({ loading: false }) // 隐藏loading
    if (result.status === 10000) {
      // 取出分页数据, 更新状态, 显示分页列表
      const { total, list } = result.data
     // //console.log(total, list)
      this.setState({
        total,
        products: list
      })
    }
  }

  /*
  更新指定商品的状态
   */
  updateStatus = async (ids, sellStatus) => {
    const result = await reqUpdateStatus(ids, sellStatus)
    if (result.status === 10000) {
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
    }
  }

  /*
  删除指定商品
  */
  deleteProduct = (product) => {
   // //console.log(product, "=======")
    Modal.confirm({
      title: `确定删除${product.name}吗?`,
      onOk: async () => {
        const result = await reqDeleteProduct(product.id)
        if (result.status === 10000) {
          message.success('删除商品成功!')
          this.getProducts(this.pageNum)
        }
      }
    })
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getProducts(1)
  }

  render() {

    // 取出状态数据
    const { products, total, loading, keyword } = this.state



    // const title = (
    //   <span>
       
    //       按名称搜索
        
    //     <Input
    //       placeholder='关键字'
    //       style={{ width: 150, margin: '0 15px' }}
    //       value={keyword}
    //       onChange={event => this.setState({ keyword: event.target.value })}
    //     />
    //     <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
    //   </span>
    // )
    const title = (
      <span>商品列表</span>
    )

    const extra = (
      <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>
        <Icon type='plus' />
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='id'
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{
            current: this.pageNum,
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}