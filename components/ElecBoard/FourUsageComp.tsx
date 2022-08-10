import { observer } from 'mobx-react-lite'
import useStore from 'stores'

const FourUsageComp = observer((): JSX.Element => {
  const elec = useStore().Elec
  const usage = elec.useageCharge
    ? [
        {
          title: '실시간 사용량',
          data: elec.useageCharge[0].now_kwh,
          unit: 'kWh',
        },
        {
          title: '실시간 요금',
          data: elec.useageCharge[0].now_cost,
          unit: '원',
        },
        {
          title: '예상 사용량',
          data: elec.useageCharge[0].future_kwh,
          unit: 'kWh',
        },
        {
          title: '예상 요금',
          data: elec.useageCharge[0].future_cost,
          unit: '원',
        },
      ]
    : null

  return (
    <>
      {usage?.map((list, i) => {
        return (
          <div className="usage" key={i}>
            <div className="title">{list.title}</div>
            <div className="value">
              {list.data}
              <span className="unit">{list.unit}</span>
            </div>
          </div>
        )
      })}
    </>
  )
})

export default FourUsageComp
