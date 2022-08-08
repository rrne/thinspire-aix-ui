import type { NextPage } from 'next'
import { Layout } from 'components'
import SteamBoard from 'components/SteamBoard'
import useStore from 'stores'
import { useEffect } from 'react'

const SteamPage: NextPage = () => {
  const store = useStore().Main

  useEffect(() => {
    store.changeSubpage('steam')
  }, [])
  return (
    <Layout title="steam" mainpage={false}>
      <SteamBoard />
    </Layout>
  )
}

export default SteamPage
