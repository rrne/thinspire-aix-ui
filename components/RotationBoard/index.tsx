import { observer } from 'mobx-react-lite'
import useStore from 'stores'
import DailyTrendChart from './chart/DailyTrendChart'
import MonthlyTrendChart from './chart/MonthlyTrendChart'
import TitleBox from 'components/Layout/TitleBox'
import { useState } from 'react'
import { Modal } from 'antd'
import ModalComp from './ModalComp'

const RotaionBoard = observer((): JSX.Element => {
  const store = useStore().Rotation
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalData, setModalData] = useState(null)

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const showModal = (value) => {
    setModalData(value)
    setIsModalVisible(true)
  }

  return (
    <div className="rotation-page">
      <img
        src={require('public/images/subpageBG.png')}
        alt=""
        className="subpageBG"
      />
      <div className="rotations-box">
        {store.rotationMotor.map((list, i) => {
          return (
            <div className="motor-box" key={i}>
              <div className="motorImgBox">
                <img
                  src={
                    list.type === 'aircomp'
                      ? require('public/images/aircomp.png')
                      : list.type === 'blower'
                      ? require('public/images/blower.png')
                      : require('public/images/pump.png')
                  }
                  alt=""
                />
                <div className="title">{list.title}</div>
              </div>
              <div className="value-box">
                <div
                  className="value elec"
                  onClick={() => showModal({ title: '전력', list: list })}
                >
                  <div className="text">
                    <div className="label">전력량:</div>
                    {list.value.elec.toLocaleString()}
                    <div className="unit">kWh</div>
                  </div>
                </div>
                <div
                  className="value temp"
                  onClick={() => showModal({ title: '온도', list: list })}
                >
                  <div className="text">
                    <div className="label">온도:</div>
                    {list.value.temp.toLocaleString()}
                    <div className="unit">°C</div>
                  </div>
                </div>
                <div
                  className="value comp"
                  onClick={() => showModal({ title: '압력', list: list })}
                >
                  <div className="text">
                    <div className="label">압력:</div>
                    {list.value.compressure.toLocaleString()}
                    <div className="unit">Mpa</div>
                  </div>
                </div>
              </div>
              <div className="chart-box">
                <div className="charts">
                  <TitleBox title="1일 Trend" />
                  <DailyTrendChart />
                </div>
                <div className="charts">
                  <TitleBox title="1달 Trend" />
                  <MonthlyTrendChart />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        wrapClassName="chartModal"
      >
        <ModalComp data={modalData} />
      </Modal>
    </div>
  )
})

export default RotaionBoard
