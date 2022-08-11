import {
  faFaceSmile,
  faFaceFrown,
  faFaceTired,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Spin, Modal } from 'antd'
import ModalComp from './ModalComp'
import { useEffect, useState } from 'react'
import useStore from 'stores'

const SteamTrapComp = ({ tap, trap }: { tap; trap }): JSX.Element => {
  const store = useStore().Steam
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalData, setModalData] = useState(null)

  const showSteamTrapChart = (value) => {
    const factoryNum = sessionStorage.getItem('factory')
    // setIsModalVisible(true)
    setIsModalVisible(() => true)
    setModalData(value)

    store.getFemsGraphDataAPI({
      siteid: factoryNum,
      devid: `0${value.devId}`,
      type: 'temp',
      period: 'today',
    })
  }
  return (
    <>
      {trap.length !== 0 ? (
        trap.map((list, i) => {
          return (
            <div
              className="trap"
              key={i}
              onClick={() => showSteamTrapChart(list)}
            >
              <div className="img-box">
                <img
                  src={
                    list.traptype === '버켓'
                      ? require('public/images/bucket.png')
                      : list.traptype === '플롯'
                      ? require('public/images/float.png')
                      : require('public/images/disk.png')
                  }
                  alt=""
                />
                <div className="title">{list.pointName}</div>
              </div>
              <div className="value-box">
                <div className="value">
                  <div className="label">In/Out</div>
                  <div className="temp-box">
                    <div className="in temp">
                      {list.inTemp} <span>°C</span>
                    </div>
                    <div className="out temp">
                      {list.outTemp}
                      <span>°C</span>
                    </div>
                  </div>
                </div>
                <div className="value">
                  <div className="label">동작상태</div>
                  <div
                    className={
                      list.status === 0.0
                        ? 'status'
                        : list.status === 1.0
                        ? 'warn status'
                        : 'err status'
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        list.status === 0.0
                          ? faFaceSmile
                          : list.status === 1.0
                          ? faFaceFrown
                          : faFaceTired
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="spin">
          <Spin size="large" />
        </div>
      )}
      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        wrapClassName="chartModal"
      >
        <ModalComp data={modalData} type="temp" cancel={isModalVisible} />
      </Modal>
    </>
  )
}

export default SteamTrapComp
