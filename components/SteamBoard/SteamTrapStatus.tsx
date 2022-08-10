import TItleBox from 'components/Layout/TitleBox'
import { useEffect, useState } from 'react'
import { SteamStore } from 'stores/steam'

const SteamTrapStatus = (store: SteamStore): JSX.Element => {
  const [status, setStatus] = useState<StatusType[]>([])
  type StatusType = {
    title: string
    status: number
    className: string
  }

  useEffect(() => {
    if (!store.steamTrapStatus) return
    const data = store.steamTrapStatus
    const dataArr: StatusType[] = [
      {
        title: '정상',
        status: data.normal,
        className: 'normal',
      },
      {
        title: '이상',
        status: data.anomaly,
        className: 'warn',
      },
      {
        title: '고장',
        status: data.diagnosis,
        className: 'err',
      },
    ]
    setStatus(dataArr)
    console.log(data)
  }, [store.steamTrapStatus])

  return (
    <div className="trap-status panel">
      <TItleBox title="스팀트랩 상태현황" />
      <div className="status-box">
        {status?.map((list, i) => {
          return (
            <div className={list.className + ' status'} key={i}>
              <div className="title">{list.title}</div>
              <div className="value">{list.status}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SteamTrapStatus
