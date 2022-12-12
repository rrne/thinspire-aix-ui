import type { NextPage } from 'next'
import { Layout } from 'components'
import ElecBoard from 'components/ElecBoard'
import useStore from 'stores'
import { useEffect,useState } from 'react'

const ElecPage: NextPage = () => {
  const store = useStore().Main
  const elec = useStore().Elec

  const [factoryNum, setFactoryNum] = useState(null);

  useEffect(() => {
    const factoryNumber = sessionStorage.getItem('factory')
    const factory = sessionStorage.getItem('code')
    setFactoryNum(factoryNum)
    store.changeSubpage('elec')

    elec.getUsageChargeAPI(factory)
    elec.getDeviceUsageStatusAPI(factory)
    elec.getDailyPredictAPI(factory)
    elec.getMonthlyPredictAPI(factory)
    elec.getDignosticPlanAPI(factoryNumber)
    // elec.getCsvData()
  }, [])

  return (
    <Layout title="elec" mainpage={false}>
      <ElecBoard fac={factoryNum} />
    </Layout>
  )
}

export default ElecPage
