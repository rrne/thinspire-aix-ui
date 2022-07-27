import moment from 'moment'
import { useState } from 'react'
import { useInterval } from 'react-use'

const Timer = () => {
  const [realTime, setRealTime] = useState(null)

  useInterval(() => {
    setRealTime(moment())
  }, 1000)

  return (
    <>
      <div className="date">
        {realTime ? moment(realTime).format('YYYY/MM/DD HH:mm:ss') : 'Loading..'}
      </div>
    </>
  )
}
export default Timer
