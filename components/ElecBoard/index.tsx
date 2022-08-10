import FourUsageComp from './FourUsageComp'
import DevicePosition from './DevicePosition'
import TitleBox from 'components/Layout/TitleBox'
import MonthlyPredictChart from './chart/MonthlyPredictChart'
import DailyPredictChart from './chart/DailyPredictChart'
import DignosticPlanChart from './chart/DignosticPlanChart'
import { Modal } from 'antd'
import ModalComp from './ModalComp'
import { useState } from 'react'
import useStore from 'stores'

const ElecBoard = (): JSX.Element => {
  const store = useStore().Elec

  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const showModal = () => {
    const id = sessionStorage.getItem('factory')
    store.getPPGraphDataAPI(id, 'today')
    setIsModalVisible(true)
  }

  return (
    <div className="elec-page">
      <img
        src={require('public/images/subpageBG.png')}
        alt=""
        className="background"
      />
      <div className="data-box">
        <div className="four-usagecomp" onClick={showModal}>
          <FourUsageComp />
        </div>
        <DevicePosition />
      </div>
      <div className="data-box">
        <div className="smallChart-boxes">
          <div className="chart-box">
            <TitleBox title="한달 전력 사용량 예측 그래프" />
            <img
              src={require('public/images/elec_chart.png')}
              alt=""
              className="chartbg"
            />
            <div className="chart">
              <MonthlyPredictChart />
            </div>
          </div>
          <div className="chart-box">
            <TitleBox title="하루 전력 사용량 예측 그래프" />
            <img
              src={require('public/images/elec_chart.png')}
              alt=""
              className="chartbg"
            />
            <div className="chart">
              <DailyPredictChart />
            </div>
          </div>
        </div>
        <div className="scatter-chart">
          <TitleBox title="전력설비 진단분석" />
          <img
            src={require('public/images/elec_scatter.png')}
            alt=""
            className="chartbg"
          />
          <div className="chart">
            <DignosticPlanChart />
          </div>
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        wrapClassName="chartModal"
      >
        <ModalComp />
      </Modal>
    </div>
  )
}

export default ElecBoard
