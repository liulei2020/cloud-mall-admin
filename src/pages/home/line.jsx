import React from "react"
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts"
import DataSet from "@antv/data-set"

export default class Line extends React.Component {
  render() {
    const data = [
      {
        month: "Jan",
        2020: 7.0,
        2021: 4.9,
        2022: 5.9
      },
      {
        month: "Feb",
        2020: 6.9,
        2021: 5.2,
        2022: 4.9
      },
      {
        month: "Mar",
        2020: 9.5,
        2021: 7.7,
        2022: 5.9
      },
      {
        month: "Apr",
        2020: 14.5,
        2021: 8.5,
        2022: 5.5
      },
      {
        month: "May",
        2020: 18.4,
        2021: 11.9,
        2022: 4.9
      },
      {
        month: "Jun",
        2020: 21.5,
        2021: 15.2,
        2022: 10.0
      },
      {
        month: "Jul",
        2020: 25.2,
        2021: 17.0,
        2022: 12.9
      },
      {
        month: "Aug",
        2020: 26.5,
        2021: 16.6,
        2022: 15.9
      },
      {
        month: "Sep",
        2020: 23.3,
        2021: 14.2,
        2022: 20.7
      },
      {
        month: "Oct",
        2020: 18.3,
        2021: 10.3,
        2022: 25.9
      },
      {
        month: "Nov",
        2020: 13.9,
        2021: 6.6,
        2022: 30.9
      },
      {
        month: "Dec",
        2020: 9.6,
        2021: 4.8,
        2022: 32.9
      }
    ]
    const ds = new DataSet()
    const dv = ds.createView().source(data)
    dv.transform({
      type: "fold",
      fields: ["2020", "2021", "2022"],
      // 展开字段集
      key: "city",
      // key字段
      value: "temperature" // value字段
    })
    const cols = {
      month: {
        range: [0, 1]
      }
    }
    return (
      <div style={{float: 'left', width: 750,marginTop: 40}}>
        <Chart height={250} data={dv} scale={cols} forceFit>
          <Legend/>
          <Axis name="month"/>
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}个`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={"city"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape={"circle"}
            color={"city"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    )
  }
}
