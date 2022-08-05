import type { NextPage } from 'next'
import { Layout } from 'components';
import ElecBoard from 'components/ElecBoard';

const Home: NextPage = () => {
  return (
    <Layout title="elec" mainpage={false}>
      <ElecBoard /> 
    </Layout>
  )
}

export default Home
