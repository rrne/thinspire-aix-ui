import ReactECharts from "echarts-for-react";
import {useState, useEffect} from 'react'
import moment from "moment";

const VerticalBarTwoOpt = ({data}) => {

    useEffect(() => {
        if(data.length === 0) return;
        const dataArr = [{
            type: 'bar',
            name:"스팀 가동률",
            barWidth:15,
            data: []
          },
          {
            type: 'bar',
            barWidth:15,
            name:"스팀 효율",
            data: []
          }]
        const xAxis = {
            type: "category",
            splitNumber:5,
            axisLabel: {
                color: "#92B4C8",
                fontSize:10
            },
            splitLine: {
                show:true,
                lineStyle: {
                    color: "#3A4759",
                },
            },
            axisLine: {
                lineStyle: {
                    color: "#3A4759",
                },
            },
            data:[]
        }
        for(let i = 0; i < data.length; i++){
            dataArr[0].data.push(data[i].site_max_avg_percent)
            dataArr[1].data.push(data[i].site_in_out_percent)
            xAxis.data.push(data[i].site_name)
        }
        setOptions({
            ...options,
            xAxis : xAxis,
            series: dataArr
        })
    },[data])

    const [options, setOptions] = useState({
        tooltip: {
            trigger: "item",
            textStyle:{
                fontSize:10,
                color:"white"
            },
            backgroundColor:"rgba(0,0,0,0.8)",
            borderColor:"#116386"
        },
        legend: {
            show: true,
            top: -2,
            right:0,
            textStyle: {
                color: "white",
                fontSize: 8,
            },
            itemHeight: 2,
            itemWidth:15
        },
        grid: {
            top: "13%",
            left: "2%",
            right:"2%",
            bottom: "0%",
            containLabel: true
        },
        xAxis: {},
        yAxis: {
            type: "value",
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: "#3A4759",
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#3A4759",
                },
            },
            axisLabel: {
                fontSize:10,
                color: "#92B4C8",
                width: 50,
                overflow:"truncate",
                ellipsis: "...",
                formatter: "{value} %"
            },
        },
        dataZoom:[{
            type:"inside",
            start:0,
            end:100
        }],
        series: null,
        color:["#316FFF","#00BD56"]
    })


    return (
        <ReactECharts
            option={options}
            className="verticalBar"
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default VerticalBarTwoOpt;
