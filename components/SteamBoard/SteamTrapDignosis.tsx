import ReactECharts from 'echarts-for-react'
import { SteamStore } from 'stores/steam'
import { useEffect, useState } from 'react'
import TitleBox from 'components/Layout/TitleBox'

const SteamTrapDignosis = (store: SteamStore): JSX.Element => {
  useEffect(() => {
    const data = store.steamTrapDignosis
    if (data.length === 0) return

    const diagnosticData = []
    const errDiagnosticData = []
    const bgdata = []

    for (let i = 0; i < data.length; i++) {
      data[i].anomaly_labels
        ? diagnosticData.push(data[i])
        : errDiagnosticData.push(data[i])
    }
    for (let i = 0; i < store.steamTrapDignosisBG.length; i++) {
      bgdata.push([
        store.steamTrapDignosisBG[i].intemp,
        store.steamTrapDignosisBG[i].outtemp,
      ])
    }
    console.log(bgdata)

    const series = [
      {
        type: 'scatter',
        symbolSize: 3,
        itemStyle: {
          color: '#344a69',
        },
        large: true,
        data: bgdata,
        tooltip: {
          show: false,
        },
      },
      {
        type: 'scatter',
        symbolSize: 8,
        itemStyle: {
          color: '#85EF47',
        },
        large: true,
        data: convertData(diagnosticData),
        tooltip: {
          formatter(params) {
            return params.name
          },
        },
      },
      {
        type: 'effectScatter',
        symbolSize: 8,
        itemStyle: {
          color: '#f32424',
        },
        large: true,
        rippleEffect: {
          brushType: 'stroke',
          scale: 3.5,
        },
        data: convertData(errDiagnosticData),
        tooltip: {
          formatter(params) {
            console.log(params)

            return params.name
          },
        },
      },
    ]

    setOptions({
      ...options,
      series: series,
    })
  }, [store.steamTrapDignosis])

  const convertData = (data) => {
    const result = []
    for (let i = 0; i < data.length; i++) {
      result.push({
        seriesName: data[i].site_name,
        name: `${data[i].site_name}<br/>${data[i].time}<br/>${data[i].point_name}`,
        value: [data[i].in_temp, data[i].out_temp],
      })
    }
    return result
  }

  const [options, setOptions] = useState({
    tooltip: {
      trigger: 'item',
      backgroundColor: '#12131a',
      padding: 4,
      position: 'right',
      textStyle: {
        fontSize: 12,
        color: '#fff',
      },
      confine: true,
      axisPointer: {
        snap: true,
      },
    },
    backgroundColor: 'rgba(0,0,0,0)',
    legend: {
      show: false,
    },
    grid: {
      left: '2%',
      right: '3%',
      bottom: '2%',
      top: '10%',
      containLabel: true,
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
    ],
    xAxis: [
      {
        type: 'value',
        boundaryGap: true,
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
      },
    ],
    yAxis: [
      {
        splitLine: {
          show: true,
          lineStyle: {
            color: '#192B45',
          },
        },
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
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [],
  })

  return (
    <div className="trap-dignosis panel">
      <TitleBox title="스팀트랩 진단분석" />
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

export default SteamTrapDignosis
