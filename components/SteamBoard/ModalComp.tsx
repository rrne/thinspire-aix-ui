import { Select, Empty } from 'antd'
const { Option } = Select
import FemsTrendChart from './chart/FemsTrendChart'
import useStore from 'stores'
import { useState, useEffect, useRef } from 'react'
import { CSVLink } from 'react-csv'
import { observer } from 'mobx-react-lite'
import { SteamTrapCondition, ElecPPCondition } from 'types/ApiTypes'

const ModalComp = observer(
  (props: {
    data: SteamTrapCondition | ElecPPCondition
    type: string
    cancel: boolean
  }): JSX.Element => {
    const store = useStore().Steam
    const csvLink = useRef(null)

    const [period, setPeriod] = useState('today')
    const [csvData, setCsvData] = useState([])

    useEffect(() => {
      setPeriod('today')
    }, [props.cancel])

    const factoryNum = sessionStorage.getItem('factory')
    const changeOptions = (value) => {
      setPeriod(value)
      store.getFemsGraphDataAPI({
        siteid: factoryNum,
        devid: `0${props.data.devId}`,
        type: 'temp',
        period: value,
      })
    }

    const downloadCSV = () => {
      store.downloadFemsGraphDataAPI({
        siteid: factoryNum,
        devid: `0${props.data.devId}`,
        type: 'temp',
        period: period,
      })
    }

    useEffect(() => {
      if (store.downloadFemsData.length === 0) return
      setCsvData(store.downloadFemsData)
    }, [store.downloadFemsData])

    useEffect(() => {
      if (csvData.length === 0) return
      csvLink.current.link.click()
    }, [csvData])

    return (
      <div className="modal">
        <div className="top-box">
          <div className="title">{props.data.pointName}</div>
          <div className="selectTime-box">
            <div className="label">조회기간</div>
            <div className="select">
              <Select
                defaultValue="today"
                style={{ width: 200 }}
                onChange={changeOptions}
                value={period}
              >
                <Option value="today">오늘</Option>
                <Option value="yesterday">어제</Option>
                <Option value="last_week">저번주</Option>
                <Option value="last_7days">7일</Option>
                <Option value="last_month">저번달</Option>
                <Option value="last_30days">30일간</Option>
              </Select>
            </div>
          </div>
        </div>
        <div className="chart-conent">
          {store.femsGraphData.length !== 0 ? (
            <FemsTrendChart type={props.type} />
          ) : (
            <Empty />
          )}
        </div>
        <div className="downloadBtn" onClick={downloadCSV}>
          다운로드
          <CSVLink
            target="_blank"
            data={csvData}
            className="hidden"
            ref={csvLink}
          />
        </div>
      </div>
    )
  }
)

export default ModalComp
