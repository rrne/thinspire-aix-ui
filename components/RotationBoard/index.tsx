import { observer } from 'mobx-react-lite'
import useStore from 'stores'
import DailyTrendChart from './chart/DailyTrendChart'
import MonthlyTrendChart from './chart/MonthlyTrendChart'
import TitleBox from 'components/Layout/TitleBox'
import Image from 'next/image'

const RotaionBoard = observer((): JSX.Element => {
  const store = useStore().Rotation

  return (
    <div className="rotation-page">
      <img
        src={require('public/images/subpageBG.png')}
        alt=""
        className="subpageBG"
      />
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
              <div className="value elec">
                <div className="text">
                  <div className="label">전력량:</div>
                  {list.value.elec.toLocaleString()}
                  <div className="unit">kWh</div>
                </div>
              </div>
              <div className="value temp">
                <div className="text">
                  <div className="label">온도:</div>
                  {list.value.temp.toLocaleString()}
                  <div className="unit">°C</div>
                </div>
              </div>
              <div className="value comp">
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
  )
})

export default RotaionBoard
