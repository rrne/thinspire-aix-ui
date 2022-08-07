import TitleBox from 'components/Layout/TitleBox'

const DevicePosition = (): JSX.Element => {
  return (
    <div className="device-position">
      <img
        src={require('public/images/elec_deviceposition.png')}
        alt=""
        className="bg"
      />
      <TitleBox title="설비 별 위치" />
      <img
        src={require('public/images/positionbg.png')}
        alt=""
        className="positionBg"
      />
    </div>
  )
}

export default DevicePosition
