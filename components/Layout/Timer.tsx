import moment from 'moment';
import { useState } from 'react';
import { useInterval } from 'react-use';

export default function Timer(){
    return <Time />
}

const Time = () =>{
    const [realTime, setRealTime] = useState(Date.now());

    useInterval(() => {
        setRealTime(Date.now())
    }, 1000)

    return(
        <>
            <div className="date">{moment(realTime).format('YYYY/MM/DD ddd')}</div>
            <div className="time">{moment(realTime).format('HH:mm:ss')}</div>
        </>
    )
}
