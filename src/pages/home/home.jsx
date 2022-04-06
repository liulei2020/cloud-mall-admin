import React, {Component} from 'react'
import {
  Icon,
  Card,
  DatePicker,
  Timeline
} from 'antd'
import moment from 'moment'
import Line from './line'
import Bar from './bar'
import './home.less'

const dateFormat = 'YYYY/MM/DD'
const {RangePicker} = DatePicker

export default class Home extends Component {

  state = {
    isVisited: true
  }

  handleChange = (isVisited) => {
    return () => this.setState({isVisited})
  }

  render() {
    const {isVisited} = this.state

    return (
      <div className='home'>
        

        <Card
          className="home-content"
          title={<div className="home-menu">
            <span className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
                  onClick={this.handleChange(true)}>访问量</span>
            <span className={isVisited ? "" : 'home-menu-active'} onClick={this.handleChange(false)}>销售量</span>
          </div>}
          extra={<RangePicker
            defaultValue={[moment('2022/01/01', dateFormat), moment('2022/06/01', dateFormat)]}
            format={dateFormat}
          />}
        >
          <Card
            className="home-table-left"
            title={isVisited ? '访问趋势' : '销售趋势'}
            bodyStyle={{padding: 0, height: 275}}
            extra={<Icon type="reload"/>}
          >
            {isVisited?<Bar/> :<Line/>}
          </Card>

          <Card title='任务' extra={<Icon type="reload"/>} className="home-table-right">
            <Timeline>
              <Timeline.Item color="green">项目起步</Timeline.Item>
              <Timeline.Item color="green">利用SpringCloud集成SpringBoot框架开发后端</Timeline.Item>
              <Timeline.Item color="green">利用postman接口测试</Timeline.Item>
              <Timeline.Item color="red">
                 <p>利用React + antd 开发前端</p>
                
              </Timeline.Item>
              <Timeline.Item>
              <p>前端的业务实现</p>
              </Timeline.Item>
              <Timeline.Item>
                
                
                <p>前后端联调</p>
                <p>项目部署</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Card>
      </div>
    )
  }
}