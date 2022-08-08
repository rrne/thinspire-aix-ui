import Timer from './Timer'
import { Modal } from 'antd'
import { useState, useCallback, useEffect } from 'react'
import {
  faFireFlameCurved,
  faHouseChimney,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStore from 'stores'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react'

export const MainHeader = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="top-header">
      <img src={require('public/images/logo.png')} className="logo" />
      <div className="title">
        <div className="icon">
          <FontAwesomeIcon icon={faFireFlameCurved} />
        </div>
        AI 융합에너지 효율화 종합 대시보드
      </div>
      <div className="right-box">
        <div className="logout" onClick={showModal}>
          Log Out
        </div>
        <Timer />
      </div>
      <ModalComp visible={isModalVisible} cancel={handleCancel} />
    </div>
  )
}

export const SubHeader = observer((): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const store = useStore().Main
  const router = useRouter()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const goToControlPage = (page: string) => {
    if (page === 'elec' && store.subpage === 'rotation') {
      router.push('elec')
    } else if (page === 'rotation' && store.subpage === 'elec') {
      router.push('rotation')
    } else if (page === 'home') {
      router.push('/')
    }
  }

  const factory =
    store.module === 'AIX'
      ? useStore().Factory.AIXFactorys
      : useStore().Factory.AIBoutureFactorys

  const [title, setTitle] = useState('')

  useEffect(() => {
    const fac = sessionStorage.getItem('factory')
    const thisFactory = factory.filter((list) => list.id === JSON.parse(fac))[0]
    const text =
      store.subpage === 'elec'
        ? thisFactory.title + ' 전기 에너지 효율화 대시보드'
        : thisFactory.title + ' 회전기기 에너지 효율화 대시보드'
    setTitle(text)
  }, [])

  return (
    <div className="top-header">
      <div className="menu-box">
        {store.module === 'AIX' ? (
          <>
            <div className="home" onClick={() => goToControlPage('home')}>
              <FontAwesomeIcon icon={faHouseChimney} />
            </div>
            <div className="sub-box">
              <div
                className={store.subpage === 'elec' ? 'select menu' : 'menu'}
                onClick={() => goToControlPage('elec')}
              >
                전기에너지
              </div>
              <div
                className={
                  store.subpage === 'rotation' ? 'select menu' : 'menu'
                }
                onClick={() => goToControlPage('rotation')}
              >
                회전기기
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
      <div className="title">{title}</div>
      <div className="right-box">
        <div className="logout" onClick={showModal}>
          Log Out
        </div>
        <Timer />
      </div>
      <ModalComp visible={isModalVisible} cancel={handleCancel} />
    </div>
  )
})

const ModalComp = ({ visible, cancel }) => {
  return (
    <Modal visible={visible} footer={null}>
      <div className="title">로그아웃 하시겠습니까?</div>
      <div className="btn-box">
        <div className="confirm">확인</div>
        <div className="cancel" onClick={cancel}>
          취소
        </div>
      </div>
    </Modal>
  )
}
