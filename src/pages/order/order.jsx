import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import OrderHome from './home'
import OrderDetail from './detail'

import './order.less'

/*
商品路由
 */
export default class Order extends Component {
  render() {
    return (
      <Switch>
        <Route path='/order' component={OrderHome} exact/> {/*路径完全匹配*/}
        <Route path='/order/detail' component={OrderDetail}/>
        <Redirect to='/order'/>
      </Switch>
    )
  }
}