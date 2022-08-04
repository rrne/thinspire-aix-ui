import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, message } from 'antd';
import { faUser, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AILoginData from 'public/data/AILoginData.json';
import AIXLoginData from 'public/data/AIXLoginData.json';
import useStore from 'stores';
import { useRouter } from 'next/router'

const Login: NextPage = () => {
    const store = useStore().Main;
    const router = useRouter()
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')

    const [loginInfo, setLoginInfo] = useState(store.module === "AIX" ? AIXLoginData : AILoginData);

    const confirmLogin = () => {
        if(id === "" || pw === "") {
          message.error("양식을 완성해 주세요");
          return;
        }
        const user = loginInfo.loginInfo.filter((list) => list.id === id);
        const userPw = user.filter((list) => list.pw === pw);
    
        if(userPw.length === 0) {
          message.error("아이디나 비밀번호를 확인해주세요");
          return;
        }
        sessionStorage.setItem("sec_user", id);
        router.push('/')
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
            <Image src={require('public/images/BG.png')} layout="fill" alt=''/>
        </div>
        <div className="half-box">
            <div className="title-box">
                <Image src={require('public/images/logo.png')} width={100} height={26} alt=''/>
                <div className="title">
                    22 AI 융합에너지<br/>효율화 종합 대시보드
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
                        prefix={<FontAwesomeIcon className="input-icon" icon={faUser} />}/>
                </div>
                <div className="input">
                    <div className="label">Password</div>
                        <Input.Password
                         onPressEnter={confirmLogin}
                            onChange={inputPW}
                            placeholder="Your password"
                            prefix={<FontAwesomeIcon className="input-icon" icon={faLock}/>}
                            iconRender={
                            visible => (visible ? 
                            <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon  icon={faEyeSlash} />)} 
                        />
                </div>
            </div>
            <div className="button" onClick={confirmLogin}>Login</div>
        </div>
    </div>
  )
}

export default Login;
