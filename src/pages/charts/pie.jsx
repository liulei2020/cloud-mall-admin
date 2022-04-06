import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'

/*
后台管理的饼图路由组件
 */
export default class Pie extends Component {

  getOption = () => {
    return {
      title: {
        text: '销售类型比重',
        subtext: '暂未完成',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ['家电', '电脑', '生活用品', '服装', '食品']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 335, name: '家电' },
            { value: 310, name: '电脑' },
            { value: 234, name: '生活用品' },
            { value: 135, name: '服装' },
            { value: 1548, name: '食品' }
          ]
        }
      ]
    };

  }



  render() {
    return (
      <div>
        <Card title='饼图一'>
          <ReactEcharts option={this.getOption()} />
        </Card>
      </div>
    )
  }
}
