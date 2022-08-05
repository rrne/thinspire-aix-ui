import type { NextPage } from 'next'
import { Layout } from 'components';
import SteamBoard from 'components/SteamBoard';

const Home: NextPage = () => {
  return (
    <Layout title="steam" mainpage={false}>
      <SteamBoard /> 
    </Layout>
  )
}

export default Home
