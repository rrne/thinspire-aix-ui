import ReactECharts from "echarts-for-react";
import {useState, useEffect} from 'react'
import moment from "moment";

const VerticalBar = ({data}) => {

    useEffect(() => {
        console.log(data);
        
        if(data.length === 0) return;
        const dataArr = [{
            type: 'bar',
            barWidth:15,
            data: []
          }]
        const xAxis = {
            type: "category",
            boundaryGap:false,
            axisLabel: {
                color: "#92B4C8",
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
            dataArr[0].data.push(data[i].monthly_elec)
            xAxis.data.push(moment(data[i].time*1000).format("MM"))
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
            show: false,
            bottom: 0,
            textStyle: {
                color: "#30EEE9",
                fontSize: 10,
            },
            itemStyle: {
                opacity: 0,
            },
        },
        grid: {
            top: "10%",
            left: "2%",
            right:"2%",
            bottom: "0%",
            containLabel: true
        },
        xAxis: {},
        yAxis: {
            type: "value",
            splitNumber:3,
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
                width: 45,
                margin:12,
                overflow:"truncate",
                ellipsis: "...",
                formatter: "{value} kwh"
            },
        },
        dataZoom:[{
            type:"inside",
            start:0,
            end:100
        }],
        series: null,
        color:["#316FFF"]
    })


    return (
        <ReactECharts
            option={options}
            className="verticalBar"
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default VerticalBar;
