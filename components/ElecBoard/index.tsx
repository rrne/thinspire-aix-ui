import FourUsageComp from "./FourUsageComp";
import DevicePosition from "./DevicePosition";
import TitleBox from "components/Layout/TitleBox";

const ElecBoard = ():JSX.Element => {
    
    return(
        <div className="elec-page">
            <img src={require('public/images/subpageBG.png')}alt="" className="background" />
           <div className="data-box">
            <FourUsageComp/>
            <DevicePosition/>
           </div>
           <div className="data-box">
            <div className="smallChart-boxes">
                <div className="chart-box">
                    <TitleBox title="한달 전력 사용량 예측 그래프"/>
                    <img src={require('public/images/elec_chart.png')} alt="" className="chartbg"/>
                </div>
                <div className="chart-box">
                    <TitleBox title="한달 전력 사용량 예측 그래프"/>
                    <img src={require('public/images/elec_chart.png')} alt="" className="chartbg"/>
                </div>
            </div>
            <div className="scatter-chart">
            <TitleBox title="전력설비 진단분석"/>
                    <img src={require('public/images/elec_scatter.png')} alt="" className="chartbg"/>
            </div>
           </div>
        </div>
    )
}

export default ElecBoard