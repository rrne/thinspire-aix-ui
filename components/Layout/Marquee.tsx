import Marquee from "react-fast-marquee";
import React, { useEffect, useState } from "react";
import useStore from "stores";
import { observer } from "mobx-react";

const EventMarqee = observer(() => {

    const [news, setNews] = useState([])

   const store = useStore().Main

   useEffect(() => {
    setNews(store.newsData)
   },[store.newsData])

   const moveTheLink = (link:string) => {
    window.open(link)
   }
   return(
        <Marquee speed={50} gradient={false} pauseOnHover={true} loop={0} className="marqueeBox">
             {news.length !== 0 && news.map((list,i) => 
                    <div className='alramList' key={i} onClick={() => moveTheLink(list.link)} dangerouslySetInnerHTML={{__html: list.title}}></div>
            )}
            
        </Marquee>
   )
})

export default EventMarqee;