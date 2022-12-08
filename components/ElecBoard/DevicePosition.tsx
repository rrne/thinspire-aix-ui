import TitleBox from 'components/Layout/TitleBox'
import useStore from 'stores'
import { observer } from 'mobx-react-lite';
import { Progress, Tabs } from 'antd';
import { useEffect, useState } from 'react'
import {
  ElecUsageStatus
} from 'types/ApiTypes';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const { TabPane } = Tabs;
import Image from 'next/image';

const DevicePosition = observer(({factoryNum}:{factoryNum:number}): JSX.Element => {

  const elec = useStore().Elec;
  const factory = useStore().Factory;

  const [selectFactory,setSelectFactory] = useState(null);

  useEffect(() => {
    const fac = factory.AIBoutureFactorys.filter(list => list.id === Number(factoryNum))
    setSelectFactory(fac[0]);
  },[factoryNum])

  const [elecUsageStatus, setElecUsageStatus] = useState<ElecUsageStatus[]>([])
  const [arrow, setArrow] = useState("down")

  useEffect(() => {
    if(elec.elecUsageStatus.length === 0) return;
    listArray(elec.elecUsageStatus)
  },[elec.elecUsageStatus, arrow])

  const listArray = (array) => {
    if(arrow === "up"){
      let data = [...array];
      data.sort((a,b) => a.percent - b.percent);
      setElecUsageStatus(data)
    }else{
      let data = [...array];
      data.sort((a,b) => b.percent - a.percent);
      setElecUsageStatus(data)
    }
  }
  const handleArray = () => {
    arrow === "up" ?  setArrow("down") :  setArrow("up")
  }

  const onChange = (key: string) => {
    console.log(key);
  };


  return (
    <div className="device-position">
      <Tabs
        onChange={onChange}
        type="card"
      >
        <TabPane tab="전력 사용 현황" key="1">
        <div className="table-box">
        <div className="table">
          <div className='thead'>
            <div className="th name">설비명</div>
            <div className="th wh">설비전력</div>
            <div className="th percent">사용전력 <FontAwesomeIcon icon={faArrowDown} className={arrow === "up" ? "arrow up" : "arrow down"} onClick={handleArray}/></div>
          </div>
          <div className='tbody'>
            {elecUsageStatus.map((list,i) => {
              return(
                <div className="tr" key={i}>
                  <div className="td name">{list.pointName}</div>
                  <div className="td wh">{list.maximum_wh} <span className="unit">Wh</span></div>
                  <div className="td percent"><Progress percent={Number((list.percent * 100).toFixed(0))} strokeColor={{ '0%': '#0954b6','100%': '#179eff',}} format={percent => `${percent} %`} /></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
        </TabPane>
        {selectFactory && selectFactory.elecbg ? <TabPane tab="공장 도면" key="2">
            <div className="img-box">
              <Image src={`/images/${selectFactory.elecbg}.png`} layout="fill" />
              </div>
        </TabPane> : ""}
       
      </Tabs>
      {/* <img
        src={require('public/images/elec_deviceposition.png')}
        alt=""
        className="bg"
      /> */}

      {/* <TitleBox title="전력 사용 현황" /> */}
      {/* <img
        src={require('public/images/positionbg.png')}
        alt=""
        className="positionBg"
      /> */}
    </div>
  )
})

export default DevicePosition
