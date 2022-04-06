import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import { connect } from 'react-redux'

import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../not-found/not-found'
import Order from '../order/order'
import beianImg from '../../assets/images/beian.png'

const { Footer, Sider, Content } = Layout

/*
后台管理的路由组件
 */
class Admin extends Component {
  render() {
    const user = this.props.user
    // 如果内存没有存储user ==> 当前没有登陆
    if (!user || !user.id) {
      // 自动跳转到登陆(在render()中)
      return <Redirect to='/login' />
    }
    return (

      <Layout style={{ minHeight: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ marginTop: 20, backgroundColor: '#fff' }}>
            <Switch>
              <Redirect exact from='/' to='/home' />
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Route path="/order" component={Order} />
              <Route component={NotFound} /> {/*上面没有一个匹配, 直接显示*/}
            </Switch>
          </Content>
         
          <Footer style={{ textAlign: 'center', color: 'grey' }}>©2022 liuleinet • Powered by 2022 刘磊<br/>  <a href="https://beian.miit.gov.cn" style={{color: 'grey'}}>赣ICP备2022001959号-1</a>  <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36050202000303" style={{display:'inline-block',color: 'grey',height:'20px','line-height':'20px'}}><img src={beianImg} style={{float:'left'}} />赣公网安备 36050202000303号</a><br/>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
      
    )
  }
}


export default connect(
  state => ({ user: state.user }),
  {}
)(Admin)