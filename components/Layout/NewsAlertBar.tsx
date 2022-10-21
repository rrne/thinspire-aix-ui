import axios from 'axios'
import useSWR from 'swr'
import useStore from 'stores/index'
import { useEffect } from 'react';
import Marquee from './Marquee';
import AIMarquee from './AIMarquee';
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewsAlertBar = (): JSX.Element => {
  const store = useStore().Main
  useEffect(() => {
    store.getNewsAPI()
    store.getAIAlarm()
  }, [])
  return (
    <div className="news-bar">
      <div className="box">
        <div className="title">시화산단 뉴스</div>
        <div className="content"><Marquee/></div>
      </div>
      <div className="box">
        <div className="title">AI공지
        <div className="icon">
        <FontAwesomeIcon icon={faClipboardList}/>
        </div>
        </div>
        <div className="content">
          <AIMarquee/>
          </div>
      </div>
    </div>
  )
}

export default NewsAlertBar
