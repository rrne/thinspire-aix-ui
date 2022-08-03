import Timer from './Timer';
import { Modal } from 'antd';
import { useState, useCallback  } from 'react';

export const MainHeader = (): JSX.Element => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true)
    }
    const handleCancel = () => {
        setIsModalVisible(false);
      }

    return (
      <div className="top-header">
        <img src={require('public/images/logo.png')} className="logo" />
        <div className="title">AI 융합에너지 효율화 종합 대시보드</div>
        <div className="right-box">
          <div className="logout" onClick={showModal}>Log Out</div>
          <Timer />
        </div>
        <ModalComp visible={isModalVisible}  cancel={handleCancel} />
      </div>
    )
  }
  
export const SubHeader = (): JSX.Element => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false);
      }

    return (
      <div className="top-header">
        <div className="menu-box"></div>
        <div className="title">AI 융합에너지 효율화 종합 대시보드</div>
        <div className="right-box">
          <div className="logout" onClick={showModal}>Log Out</div>
          <Timer />
        </div>
        <ModalComp visible={isModalVisible} cancel={handleCancel} />
      </div>
    )
  }

  const ModalComp = ({visible, cancel}) => {
    
    return(
        <Modal visible={visible} footer={null}>
            <div className="title">로그아웃 하시겠습니까?</div>
            <div className="btn-box">
                <div className="confirm">확인</div>
                <div className="cancel" onClick={cancel}>취소</div>
            </div>
         </Modal>
    )
  }