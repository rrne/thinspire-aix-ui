import { Select, Empty } from 'antd'
const { Option } = Select
import PPTrendChart from './chart/PPTrendChart'
import useStore from 'stores'
import { useState, useEffect, useRef } from 'react'
import { CSVLink } from 'react-csv'
import { observer } from 'mobx-react-lite';
import {DataType} from './DevicePosition'

const DeviceModalComp = observer(({data} : {data:DataType}): JSX.Element => {
  const store = useStore().Elec
  const factory = useStore().Factory
  const csvLink = useRef(null)

  const [title, setTitle] = useState('')
  const [period, setPeriod] = useState('today')
  const [csvData, setCsvData] = useState([])

  const id = sessionStorage.getItem('code')

  useEffect(() => {
    setTitle(data.device_name)
  }, [data])

  const changeOptions = (value) => {
    setPeriod(value)
    store.getPPGraphDataAPI(id, value)
  }

  const downloadCSV = () => {
    store.downloadPPGraphDataAPI(id, period)
  }

  useEffect(() => {
    console.log(store.downloadPPTrendData.length)

    if (store.downloadPPTrendData.length === 0) return
    setCsvData(store.downloadPPTrendData)
  }, [store.downloadPPTrendData])

  useEffect(() => {
    if (csvData.length === 0) return
    csvLink.current.link.click()
  }, [csvData])

  return (
    <div className="modal">
      <div className="top-box">
        <div className="title">{title} 현재 사용전력</div>
        <div className="selectTime-box">
          <div className="label">조회기간</div>
          <div className="select">
            <Select
              defaultValue="today"
              style={{ width: 200 }}
              onChange={changeOptions}
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
        {store.ppgraphData ? <PPTrendChart /> : <Empty />}
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
})

export default DeviceModalComp
