import axios from 'axios'
import useSWR from 'swr'
import useStore from 'stores/index'
import { useEffect } from 'react'

const NewsAlertBar = (): JSX.Element => {
  const store = useStore().Main

  //   const { data, error } = useSWR('/api/data', store.getNewsAPI)
  useEffect(() => {
    store.getNewsAPI()
  }, [])
  return (
    <div className="news-bar">
      <div className="box">
        <div className="title">시화산단 뉴스</div>
        <div className="content"></div>
      </div>
      <div className="box">
        <div className="title">AI공지</div>
        <div className="content"></div>
      </div>
    </div>
  )
}

export default NewsAlertBar
