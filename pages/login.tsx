import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Input, message } from 'antd'
import {
  faUser,
  faEye,
  faEyeSlash,
  faLock,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import axios from 'axios'
import useStore from 'stores'

const Login: NextPage = () => {
  const router = useRouter()
  const store = useStore()

  // useEffect(() => {
  //   router.events.on("routeChangeStart", () => router.push('/login'))
  // },[])

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const confirmLogin = async () => {
    if (id === '' || pw === '') {
      message.error('양식을 완성해 주세요')
      return
    }

   await axios.post('/api/login', { id: id, pw: pw, type:store.Main.module },).then((res) => {
      if (res.status === 201) {
        router.reload()
        router.push('/')
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    })
  }

  const inputID = (value) => {
    setId(value.target.value)
  }
  const inputPW = (value) => {
    setPw(value.target.value)
  }

  return (
    <div className="login-page">
      <div className="bg">
        <Image src={require('public/images/background.png')} layout="fill" alt="" />
      </div>
      <div className="half-box">
        <div className="title-box">
          <Image
            src={require('public/images/logo.png')}
            width={100}
            height={26}
            alt=""
          />
          <div className="title">
            22 AI 융합에너지
            <br />
            효율화 종합 대시보드
          </div>
          <div className="sub-title">
            회전기기 부하 최적제어로 에너지 절감
          </div>
        </div>
      </div>
      <div className="half-box">
        <div className="input-box">
          <div className="input">
            <div className="label">ID</div>
            <Input
              onPressEnter={confirmLogin}
              onChange={inputID}
              placeholder="Your username"
              prefix={<FontAwesomeIcon className="input-icon" icon={faUser} />}
            />
          </div>
          <div className="input">
            <div className="label">Password</div>
            <Input.Password
              onPressEnter={confirmLogin}
              onChange={inputPW}
              placeholder="Your password"
              prefix={<FontAwesomeIcon className="input-icon" icon={faLock} />}
              iconRender={(visible) =>
                visible ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )
              }
            />
          </div>
        </div>
        <div className="button" onClick={confirmLogin}>
          Login
        </div>
      </div>
    </div>
  )
}

export default Login
