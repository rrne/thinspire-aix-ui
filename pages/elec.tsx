import type { NextPage } from 'next'
import { Layout } from 'components'
import ElecBoard from 'components/ElecBoard'
import useStore from 'stores'
import { useEffect } from 'react'

const ElecPage: NextPage = () => {
  const store = useStore().Main
  const elec = useStore().Elec

  useEffect(() => {
    store.changeSubpage('elec')
    const factoryNum = sessionStorage.getItem('factory')
    elec.getUsageChargeAPI(factoryNum)
    elec.getElecUsageStatusAPI(factoryNum)
    elec.getDailyPredictAPI(factoryNum)
    elec.getMonthlyPredictAPI(factoryNum)
    elec.getDignosticPlanAPI(factoryNum)
    elec.getCsvData()
  }, [])

  return (
    <Layout title="elec" mainpage={false}>
      <ElecBoard />
    </Layout>
  )
}

export default ElecPage
