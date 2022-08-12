import type { NextPage } from 'next'
import { Layout } from 'components'
import Dashboard from 'components/Dashboard'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    axios.get('/api/isLogin').then((res) => {
      if (res.status === 200 && res.data) {
        //login
      } else {
        router.push('/login')
      }
    })
  }, [])
  return (
    <Layout title="Home" mainpage={true}>
      <Dashboard />
    </Layout>
  )
}

export default Home

export async function getServerSideProps({ req, res }) {
  const token = req.cookies.a_name || null
  // const response = await axios.get('api/isLogin')

  console.log(req)

  // no token so i take user  to login page
  if (!token) {
    res.statusCode = 302
    res.setHeader('Location', '/login')
    return { props: {} }
  } else {
    // we have token so i return nothing without changing location
    return
  }
}
