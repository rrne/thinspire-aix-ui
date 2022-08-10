import ReactECharts from 'echarts-for-react'
import { SteamStore } from 'stores/steam'
import { useEffect, useState } from 'react'
import TItleBox from 'components/Layout/TitleBox'

const SteamTrapDevice = (store: SteamStore): JSX.Element => {
  useEffect(() => {
    const data = store.steamTrapCount
    if (data.length === 0) return
    const xAxis = [
      {
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
        data: [],
      },
    ]
    const series = [
      {
        name: '스팀',
        type: 'bar',
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 4,
        data: [],
        barWidth: '30%',
        barGap: '30%',
        itemStyle: {
          color: '#316FFF',
        },
      },
    ]
    for (let i = 0; i < data.length; i++) {
      xAxis[0].data.push(data[i].trapType)
      series[0].data.push(data[i].count)
    }
    setOptions({
      ...options,
      xAxis: xAxis,
      series: series,
    })
  }, [store.steamTrapCount])

  const [options, setOptions] = useState({
    tooltip: {
      trigger: 'axis',
      formatter: '{b} : {c}개',
      backgroundColor: '#12131a',
      padding: 4,
      position: 'right',
      textStyle: {
        fontSize: 12,
        color: '#fff',
      },
      borderColor: '#316FFF',
    },
    backgroundColor: 'rgba(0,0,0,0)',
    legend: {
      show: false,
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '0%',
      top: '18%',
      containLabel: true,
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
    ],
    xAxis: [{}],
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
    ],
    series: [],
  })

  return (
    <div className="trap-device panel">
      <TItleBox title="스팀 설비 분류" />
      <div className="chart-box">
        <ReactECharts
          option={options}
          className="verticalBar"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}

export default SteamTrapDevice
