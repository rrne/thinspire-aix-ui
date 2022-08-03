import moment from "moment";
import {useState, useEffect} from 'react';
import useStore from 'stores'
import Image from "next/image";
import { observer } from "mobx-react";
import { VerticalBar, VerticalBarTwoOpt, HorizontalBar } from "components/Dashboard/chart";

const LeftPannelComp = observer((): JSX.Element => {
    const store = useStore().Main

    type LeftComp = {
        title:string;
        component: JSX.Element
    }

    const leftCompArray :LeftComp[] = [
        {
            title: "일별 전력 사용량 분석",
            component: <ElecUsageComp />
        },
        {
            title: "월별 전력 사용량 분석",
            component: <VerticalBar data={store.monthlyUsage} />
        },
        {
            title: "월별 스팀 상태 분석",
            component: <VerticalBarTwoOpt data={store.monthlySteamStatus} />
        },
        {
            title: "월별 스팀 상태 분석",
            component: <HorizontalBar data={store.steamCount} />
        },
    ]
  
   return(
    <div className="left-pannel">
        {leftCompArray.map((list,i) => {
            return(
                <div className="left-box" key={i}>
                    <div className="title-box">
                        <Image src={require('public/images/titleIcon.png')} width={18} height={18} alt="" className="titleIcon"/>
                        <div className="title">{list.title}</div>
                    </div>
                    <div className="content">
                        {list.component}
                    </div>
                </div>
            )
        })}
    </div>
   )
})

export default LeftPannelComp;

// 일별 전력 사용량 분석 컴포넌트✨
const ElecUsageComp = ():JSX.Element => {
    const store = useStore().Main

    type TypeDailyUsage = {
        title:string;
        data:number;
    }

    const [dailyUsage, setDailyUsage] = useState<TypeDailyUsage[]>(null)

    useEffect(() => {
        if(!store.dailyUsage)return;
        const data = store.dailyUsage

        const daily :TypeDailyUsage[] = [
            {
                title: moment(data.yesterday_time).format("MM / DD"),
                data: data.yesterday_elec
            },
            {
                title: moment(data.lastweek_time).format("MM / DD"),
                data: data.lastweek_elec
            },
            {
                title: "이번주 평균",
                data: data.now_week_elec
            },
            {
                title: "이번달 평균",
                data: data.now_month_elec
            }
        ]
        setDailyUsage(daily)
    },[store.dailyUsage])

    return(
        <div className="elec-usage">
            {dailyUsage?.map((list,i) => {
                return(
                    <div className="usage" key={i}>
                        <div className="title">{list.title}</div>
                        <div className="data">{list.data.toLocaleString()} 
                            <span> kWh</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}