import { Progress, Spin, Modal } from 'antd'
import ModalComp from './ModalComp'
import { useEffect, useState } from 'react'
import useStore from 'stores'

const ElecTrapComp = ({ tap, trap }: { tap; trap }): JSX.Element => {
  const store = useStore().Steam
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalData, setModalData] = useState(null)

  const showSteamTrapChart = (value) => {
    const factoryNum = sessionStorage.getItem('factory')
    setIsModalVisible(() => true)
    setModalData(value)

    store.getFemsGraphDataAPI({
      siteid: factoryNum,
      devid: `0${value.devId}`,
      type: 'kwh',
      period: 'today',
    })
  }
  return (
    <>
      {trap.length !== 0 ? (
        trap.map((list, i) => {
          return (
            <div
              className="elec"
              key={i}
              onClick={() => showSteamTrapChart(list)}
            >
              <div className="title">{list.pointName}</div>
              <div className="value-box">
                <Progress
                  percent={Number((list.percent * 100).toFixed(0))}
                  strokeColor={{
                    '0%': '#0169fb',
                    '100%': '#02a5ce',
                  }}
                />
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
        <ModalComp data={modalData} type="kwh" cancel={isModalVisible} />
      </Modal>
    </>
  )
}

export default ElecTrapComp
