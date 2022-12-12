import ReactECharts from 'echarts-for-react'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import useStore from 'stores'
import moment from 'moment'

const GaugeChart = observer(({motorNm, keyNm , percent} : {motorNm:string; keyNm:string; percent:number}) => {
  const store = useStore().Rotation;

  const [gauge, setGauge] = useState({});

  useEffect(() => {
    const data = store.rotationChartData?.items.filter(list => list.devnm === motorNm)[0];
    if (!data) return;
   
    const options = {
      tooltip:{
        trigger:"item",
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderWidth: 1,
        borderColor: 'rgba(25,163,223, 0.5)',
        textStyle: {
          color: '#fff',
        },
        show:true,
        formatter: () => `
          <div style="font-size:16px; font-weight:600">
          ${(percent / Number(data[keyNm]) * 1000).toFixed(0)}<span style="margin-left:2px; font-size:12px; font-weight:400; color: #cadddf">km/h</span>
          </div>
        `
      },
      series:[
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          radius:"90%",
          center:["50%","60%"],
          max: percent,
          splitNumber: 2,
          itemStyle: {
            color: '#2ed5ff',
            shadowColor: 'rgba(0,138,255,0.45)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          },
          progress: {
            show: true,
            roundCap: true,
            width: 12
          },
          pointer: {
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            length: '65%',
            width: 12,
            offsetCenter: [0, '5%']
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 12
            }
          },
          axisTick: {
            splitNumber: 4,
            lineStyle: {
              width: 1,
              color: '#b6ccce'
            }
          },
          splitLine: {
            length: 12,
            lineStyle: {
              width: 1,
              color: '#b6ccce'
            }
          },
          axisLabel: {
            distance: 12,
            color: '#ffffff',
            fontSize: 10
          },
          title: {
            show: false
          },
          detail: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 1,
            width: '60%',
            lineHeight: 16,
            height: 20,
            borderRadius: 8,
            offsetCenter: [0, '50%'],
            valueAnimation: true,
            
            formatter: function (value) {
              return '{value|' + ((value / percent) * 100).toFixed(0) + '}{unit|%}';
            },
            rich: {
              value: {
                fontSize: 30,
                fontWeight: 'bolder',
                color: '#58D9F9'
              },
              unit: {
                fontSize: 12,
                color: '#e6edee',
                padding: [0, 0, -10, 0]
              }
            }
          },
          data: [
            {
              value:  percent / Number(data[keyNm]) * 1000
            }
          ]
        }
      ]
    }

    setGauge(options)
  }, [store.rotationChartData])

  return (
      <ReactECharts
      option={gauge}
      className="chart gauge"
      style={{ height: '100%' }}
      />
  )
})

export default GaugeChart;
