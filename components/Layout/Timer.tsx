import moment from 'moment'
import { useState } from 'react'
import { useInterval } from 'react-use'

const Timer = () => {
  const [realTime, setRealTime] = useState(Date.now())

  useInterval(() => {
    setRealTime(Date.now())
  }, 1000)

  return (
    <>
      <div className="date">
        {moment(realTime).format('YYYY/MM/DD HH:mm:ss')}
      </div>
    </>
  )
}
export default Timer
