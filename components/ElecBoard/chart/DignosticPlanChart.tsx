import ReactECharts from 'echarts-for-react'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import useStore from 'stores'
import moment from 'moment'

const DignosticPlanChart = observer(() => {
  const store = useStore().Elec

  const convertData = (data) => {
    const result = []
    for (let i = 0; i < data.length; i++) {
      result.push({
        seriesName: data[i].site_name,
        name: `${data[i].site_name}<br/>${moment(data[i].time).format(
          'YY년MM월DD일 hh:mm:ss'
        )}<br/>${data[i].point_name}`,
        value: [data[i].act_kwh, data[i].react_kwh],
      })
    }
    return result
  }

  useEffect(() => {
    const data = store.dignosticPlan
    if (data.length === 0) return
    const diagnosticData = []
    const errorDiagnosticData = []
    const bgdata = []

    for (let i = 0; i < data.length; i++) {
      data[i].anomaly_labels
        ? diagnosticData.push(data[i])
        : errorDiagnosticData.push(data[i])
    }

    for (let i = 0; i < store.csvData.length; i++) {
      bgdata.push([store.csvData[i].act_kwh, store.csvData[i].react_kwh])
    }
    const options = {
      backgroundColor: 'rgba(0,0,0,0)',
      legend: {
        show: false,
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
      grid: {
        left: '3%',
        right: '3%',
        top: '15%',
        bottom: '5%',
        containLabel: true,
      },
      series: [
        {
          name: '0',
          // data: jsonData.normal_data,
          data: bgdata,
          type: 'scatter',
          symbolSize: 2,
          itemStyle: {
            color: '#344a69',
          },
          large: true,
          tooltip: {
            formatter(obj) {
              return ''
            },
          },
          animation: false,
          animationThreshold: 10000,
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
          data: convertData(errorDiagnosticData),
          tooltip: {
            formatter(params) {
              return params.name
            },
          },
        },
      ],
    }
    setOptions(options)
  }, [store.dignosticPlan])

  const [options, setOptions] = useState({})

  return (
    <ReactECharts
      option={options}
      className="chart"
      style={{ width: '100%', height: '100%' }}
    />
  )
})

export default DignosticPlanChart
