import ReactECharts from 'echarts-for-react'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import useStore from 'stores'
import moment from 'moment'

const DailyPredictChart = observer(() => {
  const store = useStore().Elec

  useEffect(() => {
    const data = store.dailyPredict?.items
    if (!data || data.length === 0) return;
    
    const time = []
    const real_value = []
    const predict_value = []
    const limit = []

    for (let i = 0; i < data.length; i++) {
      time.push(moment(data[i].time * 1000).format('hh'))
      real_value.push(data[i].real_value)
      predict_value.push(data[i].predict_value)
      limit.push(data[i].limit)
    }

    // const num = real_value.indexOf(null)
    // const today = time[num - 1]

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
      grid: {
        left: '2%',
        right: '2%',
        bottom: '5%',
        top: '25%',
        containLabel: true,
      },
      legend: {
        top: '15%',
        right: "2%",
        data: ['사용량', '예측사용량'],
        textStyle: {
          fontSize: 12,
          color: '#ccc',
        },
        itemHeight: 2,
        itemWidth: 14,
        itemGap: 6,
        orient: 'horizontal',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
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
      yAxis: [{
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
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: '사용량',
          type: 'line',
          data: real_value,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: {
            color: '#113CFC',
            width: 3,
          },
          itemStyle: {
            color: '#113CFC',
          },
        },
        {
          name: '예측사용량',
          type: 'line',
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            type: 'dotted',
            color: '#00BCD4',
            width: 2,
          },
          itemStyle: {
            color: '#00BCD4',
          },
          data: predict_value,
          // markLine: {
          //   lineStyle: {
          //     type: 'solid',
          //     width: 1,
          //     color: '#69DADB',
          //   },
          //   data: [
          //     {
          //       xAxis: today,
          //     },
          //   ],
          // },
        },
        {
          name: '임계치',
          type: 'line',
          symbol: 'none',
          lineStyle: { width: 1, color: '#ff3344', type: 'dashed' },
          itemStyle: {
            color: '#ff3344',
          },
          data: limit,
        },
      ],
    }
    setOptions(options)
    
  }, [store.dailyPredict])

  const [options, setOptions] = useState({})

  return (
    <ReactECharts
      option={options}
      className="chart"
      style={{ width: '100%', height: '100%' }}
    />
  )
})

export default DailyPredictChart
