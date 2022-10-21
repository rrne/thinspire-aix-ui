import type { NextPage } from 'next'
import { Layout } from 'components'
import Dashboard from 'components/Dashboard'


const Home: NextPage = () => {
  return (
    <Layout title="Home" mainpage={true}>
      <Dashboard />
    </Layout>
  )
}

export default Home;

