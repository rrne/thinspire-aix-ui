import { Select } from 'antd'
const { Option } = Select
import { RotationMotor } from 'types/ApiTypes'
import { useState, useEffect } from 'react'

const ModalComp = ({ data }): JSX.Element => {
  return (
    <div className="modal">
      <div className="top-box">
        <div className="title">
          {data?.list.title} {data?.title}사용량
        </div>
        <div className="selectTime-box">
          <div className="label">조회기간</div>
          <div className="select">
            <Select defaultValue="today" style={{ width: 200 }}>
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
        <div className="chart"></div>
      </div>
      <div className="downloadBtn">다운로드</div>
    </div>
  )
}

export default ModalComp
