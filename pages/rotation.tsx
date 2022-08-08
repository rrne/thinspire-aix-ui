import type { NextPage } from 'next'
import { Layout } from 'components'
import RotationBoard from 'components/RotationBoard'
import useStore from 'stores'
import { useEffect } from 'react'

const RotaionPage: NextPage = () => {
  const store = useStore().Main
  const rotation = useStore().Rotation

  useEffect(() => {
    store.changeSubpage('rotation')
    const factoryNum = sessionStorage.getItem('factory')
    rotation.getRotationMotorAPI()
  }, [])
  return (
    <Layout title="Rotation" mainpage={false}>
      <RotationBoard />
    </Layout>
  )
}

export default RotaionPage
