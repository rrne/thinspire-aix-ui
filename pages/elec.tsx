import type { NextPage } from 'next'
import { Layout } from 'components';
import ElecBoard from 'components/ElecBoard';
import useStore from 'stores';
import { useEffect } from 'react';

const ElecPage: NextPage = () => {
  const store = useStore().Main;

  useEffect(() => {
    store.changeSubpage('elec')
  },[])
  
  return (
    <Layout title="elec" mainpage={false}>
      <ElecBoard /> 
    </Layout>
  )
}

export default ElecPage
