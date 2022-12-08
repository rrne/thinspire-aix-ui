import ReactECharts from 'echarts-for-react'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import useStore from 'stores'
import moment from 'moment'

const MonthlyPredictChart = observer(({motorNm, keyNm} : {motorNm:string; keyNm:string;}) => {
  const store = useStore().Rotation;

  useEffect(() => {
    const data = store.rotationChartData?.items.filter(list => list.devnm === motorNm)[0];
    if (!data) return;
    const time = []
    const real_value = []
    const real_value2 = []
    const subkey = keyNm === "daily_motor_elec" ? "yesterday" : "last_month"
    const subkey2 = keyNm === "daily_motor_elec" ? "today" : "this_month";

    for (let i = 0; i < data[keyNm][subkey].length; i++) {
      time.push(moment(data[keyNm][subkey][i]?.time * 1000).format('MM/DD'))
      real_value.push(data[keyNm][subkey][i]?.elec)
      real_value2.push(data[keyNm][subkey2][i]?.elec)
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
        left: '1%',
        right: '4%',
        bottom: '5%',
        top: '5%',
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
          name: keyNm === "daily_motor_elec" ? 'yesterday' : "last_month",
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
          name: keyNm === "monthly_motor_elec" ? 'today' : "this_month",
          type: 'line',
          data: real_value2,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: {
            color: '#00BCD4',
            width: 3,
          },
          itemStyle: {
            color: '#00BCD4',
          },
        }
      ],
    }
    setOptions(options)
  }, [store.rotationChartData])

  const [options, setOptions] = useState({})

  return (
    <ReactECharts
      option={options}
      className="chart line"
      style={{ height: '100%' }}
    />
  )
})

export default MonthlyPredictChart
