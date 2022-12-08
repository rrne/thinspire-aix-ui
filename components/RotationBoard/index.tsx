import { observer } from 'mobx-react-lite'
import useStore from 'stores'
import GaugeChart from './chart/GaugeChart'
import LineChart from './chart/LineChart'
import TotalGaugeChart from './chart/TotalGaugeChart'
import TotalLineChart from './chart/TotalLineChart'
import TitleBox from 'components/Layout/TitleBox'
import { useEffect, useState } from 'react'
import { Modal } from 'antd'
import ModalComp from './ModalComp'
import motorData from 'components/data/rotationMotor.json';
import {faT} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RotaionBoard = observer((): JSX.Element => {
  const store = useStore().Rotation
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  
  const [motor, setMotor] = useState(null)

  useEffect(() => {
    const factory = sessionStorage.getItem('code');
    const data = motorData[factory];
    setMotor(data)
    console.log(data);
    
  },[])

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
         <div className="motor-box total">
              <div className="motorImgBox">
               <div className="total-img">
                <FontAwesomeIcon icon={faT}/></div>
                <div className="title">TOTAL</div>
                
              </div>
              <div className="value-box">
                <div
                  className="value elec"
                >
                  <div className="text">
                    <div className="label">전력량:</div>
                    {motor?.map(list => list.value.elec).reduce((a,b) => a + b, 0)}
                    <div className="unit">kWh</div>
                  </div>
                </div>
                <div
                  className="value temp"
                >
                  <div className="text">
                    <div className="label">모터용량:</div>
                    {motor?.map(list => list.value.motor).reduce((a,b) => a + b, 0)}
                    <div className="unit">kW</div>
                  </div>
                </div>
              </div>
              <div className="chart-box">
                <div className="charts">
                  <TitleBox title="1일 Trend" />
                  <div className="chart-comp">
                    <TotalGaugeChart keyNm="now_motor_usage" percent={motor?.map(list => list.value.elec).reduce((a,b) => a + b, 0)}/>
                    <TotalLineChart keyNm="daily_motor_elec" />
                  </div>
                </div>
                <div className="charts">
                  <TitleBox title="1달 Trend" />
                  <div className="chart-comp">
                    <TotalGaugeChart keyNm="month_motor_usage" percent={motor?.map(list => list.value.motor).reduce((a,b) => a + b, 0)}/>
                    <TotalLineChart keyNm="monthly_motor_elec" />
                  </div>
                </div>
              </div>
            </div>
        {motor && motor.map((list, i) => {
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
                    <div className="label">모터용량:</div>
                    {list.value.motor.toLocaleString()}
                    <div className="unit">kW</div>
                  </div>
                </div>
              </div>
              <div className="chart-box">
                <div className="charts">
                  <TitleBox title="1일 Trend" />
                  <div className="chart-comp">
                    <GaugeChart motorNm={list.title} keyNm="now_motor_usage" percent={list.value.motor}/>
                    <LineChart motorNm={list.title} keyNm="daily_motor_elec" />
                  </div>
                </div>
                <div className="charts">
                  <TitleBox title="1달 Trend" />
                  <div className="chart-comp">
                    <GaugeChart motorNm={list.title} keyNm="month_motor_usage" percent={list.value.motor}/>
                    <LineChart motorNm={list.title} keyNm="monthly_motor_elec" />
                  </div>
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
