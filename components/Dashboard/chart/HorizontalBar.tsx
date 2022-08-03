import ReactECharts from "echarts-for-react";
import {useState, useEffect} from 'react'
import moment from "moment";

const HorizontalBar = ({data}) => {

    useEffect(() => {
        if(data.length === 0) return;
        console.log(data);
        
        const dataArr = [{
            type: 'bar',
            barWidth: 8,
            data: []
          }]
        const yAxis = {
            type: "category",
            inverse: true,
            axisLabel: {
                color: "#92B4C8",
                fontSize:10
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show:false,
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
            dataArr[0].data.push(data[i].count)
            yAxis.data.push(data[i].trapType)
        }
        setOptions({
            ...options,
            yAxis : yAxis,
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
            top: "2%",
            left: "2%",
            right:"3%",
            bottom: "0%",
            containLabel: true
        },
        xAxis: {
            type: "value",
            axisLine: {
                show:true,
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
            },
        },
        yAxis: {
            
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

export default HorizontalBar;
