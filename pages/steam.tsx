import type { NextPage } from 'next'
import { Layout } from 'components'
import SteamBoard from 'components/SteamBoard'
import useStore from 'stores'
import { useEffect } from 'react'

const SteamPage: NextPage = () => {
  const store = useStore().Main
  const steam = useStore().Steam

  useEffect(() => {
    store.changeSubpage('steam')
    steam.getSteamTrapDignosisBGdata()
    const factoryNum = sessionStorage.getItem('factory')
    steam.getSteamTrapStatusAPI(factoryNum)
    steam.getSteamTrapCountAPI(factoryNum)
    steam.getSteamTrapDignosisAPI(factoryNum)
    steam.getSteamTrapConditionAPI(factoryNum)
  }, [])
  return (
    <Layout title="steam" mainpage={false}>
      <SteamBoard />
    </Layout>
  )
}

export default SteamPage
