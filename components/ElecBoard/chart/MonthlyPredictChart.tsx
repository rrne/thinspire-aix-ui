import ReactECharts from 'echarts-for-react'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import useStore from 'stores'

const MonthlyPredictChart = observer(() => {
  const store = useStore().Elec
  useEffect(() => {
    const data = store.monthlyPredict
    if (data.length === 0) return
    const time = []
    const real_value = []
    const predict_value = []
    const sum_value = []
    const limit = []

    for (let i = 0; i < data.length; i++) {
      time.push(data[i].time)
      real_value.push(data[i].real_value)
      predict_value.push(data[i].predict_value)
      sum_value.push(data[i].sum_value)
      limit.push(data[i].limit)
    }
    const options = {
      backgroundColor: 'rgba(0,0,0,0)',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderWidth: 1,
        borderColor: 'rgba(25,163,223, 0.5)',
        textStyle: {
          color: '#eee',
          fontSize: 12,
        },
        axisPointer: {
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(126,199,255,0)',
                },
                {
                  offset: 0.5,
                  color: 'rgba(126,199,255,1)',
                },
                {
                  offset: 1,
                  color: 'rgba(126,199,255,0)',
                },
              ],
              global: false,
            },
          },
        },
      },
      legend: {
        top: 5,
        right: 0,
        data: ['사용량', '예측사용량', '누적사용량', '예측 누적사용량'],
        textStyle: {
          fontSize: 10,
          color: '#ccc',
        },
        itemHeight: 2,
        itemWidth: 14,
        itemGap: 6,
        orient: 'horizontal',
      },
      grid: {
        left: '0',
        right: '2%',
        bottom: '5%',
        top: '15%',
        containLabel: true,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
      ],
      xAxis: {
        type: 'category',
        boundaryGap: true,
        splitNumber: 3,
        axisLine: {
          lineStyle: {
            color: '#5D96C4',
          },
        },
        axisLabel: {
          show: true,
          color: '#5D96C4',
          fontSize: 10,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#192B45',
          },
        },
        axisTick: {
          show: true,
        },
        data: time,
      },
      yAxis: [
        {
          splitLine: {
            show: true,
            lineStyle: {
              color: '#192B45',
            },
          },
          splitNumber: 3,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#192B45',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#5D96C4',
              padding: 2,
              fontSize: 12,
            },
            overflow: 'truncate',
            width: 50,
          },
          axisTick: {
            show: false,
          },
        },
        {
          splitLine: {
            show: true,
            lineStyle: {
              color: '#192B45',
            },
          },
          splitNumber: 3,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#192B45',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#5D96C4',
              padding: 2,
              fontSize: 12,
            },
            overflow: 'truncate',
            width: 50,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          type: 'bar',
          yAxisIndex: 1,
          name: '사용량',
          data: real_value,
          barGap: '-100%',
          barWidth: '60%',
          itemStyle: {
            color: '#113CFC',
          },
        },
        {
          name: '예측사용량',
          yAxisIndex: 1,
          type: 'bar',
          barGap: '-100%',
          barWidth: '60%',
          data: predict_value,
          itemStyle: {
            color: '#00BCD4',
          },
        },
        {
          name: '누적사용량',
          type: 'line',
          data: sum_value,
          symbol: 'emptyCircle',
          symbolSize: 4,
          lineStyle: {
            width: 3,
            color: '#FFB319',
          },
          itemStyle: {
            color: '#FFB319',
          },
        },
        {
          name: '예측 누적사용량',
          type: 'line',
          data: predict_value,
          symbol: 'circle',
          lineStyle: {
            type: 'dotted',
            width: 3,
            color: '#C2F784',
          },
          itemStyle: {
            color: '#C2F784',
          },
        },
        {
          name: '임계치',
          type: 'line',
          symbol: 'none',
          lineStyle: {
            width: 1,
            color: '#ff3344',
            type: 'dashed',
          },
          itemStyle: {
            color: '#ff3344',
          },
          data: limit,
        },
      ],
    }
    setOptions(options)
  }, [store.monthlyPredict])

  const [options, setOptions] = useState({})

  return (
    <ReactECharts
      option={options}
      className="chart"
      style={{ width: '100%', height: '100%' }}
    />
  )
})

export default MonthlyPredictChart
