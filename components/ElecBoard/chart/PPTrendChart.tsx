import ReactECharts from 'echarts-for-react'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import useStore from 'stores'

const PPTrendChart = observer(() => {
  const store = useStore().Elec
  const [options, setOptions] = useState({})

  useEffect(() => {
    if (!store.ppgraphData) return

    const data = store.ppgraphData.data
    const { seg_count } = store.ppgraphData
    const dataArr = []

    for (let i = 0; i < data.length; i++) {
      dataArr.push({
        value: [data[i].dev_time * 1000, data[i].kwh, data[i].cost],
      })
    }
    const holidayArr = data.filter((list) => list.holiday === 1)
    const holiday = holidayArr.map((list) => list.dev_time * 1000)

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#12131a',
        padding: 4,
        borderColor: '#1543AF',
        position: 'right',
        textStyle: {
          fontSize: 14,
          color: '#fff',
        },
        axisPointer: {
          type: 'cross',
          snap: true,
          crossStyle: {
            color: '#337ab4',
          },
        },
        formatter: (params) =>
          `<div style="color:${
            holiday.includes(params[0].axisValue) ? '#ff4d4d' : '#578ebb'
          }; font-weight:600;">${params[0].axisValueLabel}</div>
                 <div style="font-size:12px; color:#ddd; line-height:24px;" >사용 금액: <span style="font-size:14px; color:#fff; font-weight:600; margin-left:8px;">${params[0].value[2].toLocaleString()} <span style="font-size:14px;font-weight:400;">원</span></span></div>
                 <div style="font-size:12px; color:#ddd;">사용 전력: <span style="font-size:14px; color:#fff; font-weight:600; margin-left:8px;">${params[0].value[1].toLocaleString()} <span style="font-size:14px;font-weight:400;">kwh</span></span</div>`,
      },
      backgroundColor: 'rgba(0,0,0,0)',
      legend: {
        show: false,
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'time',
        axisLine: {
          show: true,
          onZero: false,
          lineStyle: {
            color: '#31526d',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#49789e',
            width: 1.5,
          },
        },
        axisLabel: {
          color(value) {
            return holiday.includes(value) ? '#f32424' : '#578ebb'
          },
          fontSize: '12px',
        },
        boundaryGap: false,
        splitNumber: seg_count,
        minorSplitLine: {
          show: false,
          lineStyle: {
            color: '#49789e',
            width: 1.5,
          },
        },
      },
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(53, 75, 94, 0.5)',
            },
          },
          axisLine: {
            show: false,
            onZero: false,
            lineStyle: {
              color: '#31526d',
            },
          },
          axisLabel: {
            show: true,
            margin: 6,
            color: '#31526d',
            fontSize: '12px',
          },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: '사용전력',
          type: 'line',
          symbol: 'circle',
          smooth: true,
          symbolSize: 5,
          data: dataArr,
          lineStyle: {
            color: '#00b3f4',
            width: 1,
          },
          itemStyle: {
            borderColor: '#00b3f4da',
            color: '#00b3f4',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              r: 0,
              colorStops: [
                { offset: 0, color: '#00b3f4da' },
                { offset: 0.5, color: '#00b3f43b' },
              ],
              global: false,
            },
          },
        },
      ],
    }
    setOptions(option)
  }, [store.ppgraphData])

  return (
    <ReactECharts
      option={options}
      className="chart"
      style={{ width: '100%', height: '100%' }}
    />
  )
})

export default PPTrendChart
