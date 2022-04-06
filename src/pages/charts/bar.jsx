import React, {Component} from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

/*
后台管理的柱状图路由组件
 */
export default class Bar extends Component {

  state = {
    sales: [5, 20, 36, 10, 10, 20], // 销量的数组
    stores: [6, 10, 25, 20, 15, 10], // 库存的数组
  }

  update = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale + 1),
      stores: state.stores.reduce((pre, store) => {
        pre.push(store-1)
        return pre
      }, []),
    }))
  }

  /*
  返回柱状图的配置对象
   */
  getOption = (sales, stores) => {
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data:['销量', '库存']
      },
      xAxis: {
        data: ['家电', '电脑', '生活用品', '服装', '食品']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: sales,
        itemStyle: {
          normal: {
            color: "#ee8572"
          }
        }
      }, {
        name: '库存',
        type: 'bar',
        data: stores,
        itemStyle: {
          normal: {
            color: "#63b7af"
          }
        }
      }]
    }
  }

  getOption2 = () => {
    return {

      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['家电', '电脑', '生活用品', '服装', '食品']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      series: [
        {
          name: '家电',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'insideRight'
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: '电脑',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'insideRight'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '生活用品',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'insideRight'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '服装',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'insideRight'
          },
          data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
          name: '食品',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'insideRight'
          },
          data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
  }
  
  render() {
    const {sales, stores} = this.state
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.update}>更新</Button>
        </Card>

        <Card title='柱状图一'>
          <ReactEcharts 
            option={this.getOption(sales, stores)} 
            
          />
        </Card>

        <Card title='柱状图二'>
          <ReactEcharts option={this.getOption2()} />
        </Card>
      </div>
    )
  }
}