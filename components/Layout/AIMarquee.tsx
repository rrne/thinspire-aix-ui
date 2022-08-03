import Marquee from "react-fast-marquee";
import React, { useEffect, useState } from "react";
import useStore from "stores";
import { observer } from "mobx-react";
import { AINews } from 'types/ApiTypes';
import { Popover } from 'antd';
import moment from "moment";

const AIMarquee = observer(() => {

    const [news, setNews] = useState<AINews[]>([])

   const store = useStore().Main

   useEffect(() => {
    setNews(store.AINews)
   },[store.AINews])

   return(
        <Marquee speed={50} gradient={false} pauseOnHover={true} loop={0} className="marqueeBox">
             {news.map((list,i) => 
                <Popover key={i} content={TootipComp(list)}>
                    <div className='alramList'>
                    {list.api_title}
                    </div>
                </Popover>
            )}
            
        </Marquee>
   )
})

export default AIMarquee;

const TootipComp = (list) => {
    return(
        <div className="listTooltip">
            <div className="box">
                <span className="label">발생 시각</span>
                {moment(list.time * 1000).format("YY년 MM월 DD일 hh:mm:ss")}
            </div>
            <div className="box">
                <span className="label">고장 장소</span>
                {list.api_contents.split(",")[0].split("_")[1]}
            </div>
            <div className="box">
                <span className="label">고장 설비</span>
                {list.api_contents.split(",")[1].split("_")[1]}
            </div>
        </div>
    )
}