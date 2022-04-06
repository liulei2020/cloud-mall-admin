import React, { Component } from 'react'
import {
  Card,
  Icon,
  List
} from 'antd'
import LinkButton from '../../components/link-button'
import memoryUtils from "../../utils/memoryUtils";

const Item = List.Item


/*
Product的详情子路由组件
 */
export default class ProductDetail extends Component {
  /*
 在卸载之前清除保存的数据
 */
  componentWillUnmount() {
    memoryUtils.product = {}
  }


  render() {

    // 读取携带过来的state数据
    const { name, stock, price, detail, image } = memoryUtils.product
    const title = (
      <span>
        <LinkButton>
          <Icon
            type='arrow-left'
            style={{ marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{price / 100}元</span>
          </Item>
          <Item>
            <span className="left">商品库存:</span>
            <span>{stock}件</span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              {
                <img
                  key={image}
                  src={image}
                  className="product-img"
                  alt="image"
                />
              }
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}>
            </span>
          </Item>
        </List>
      </Card>
    )
  }
}