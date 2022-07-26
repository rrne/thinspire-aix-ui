import React from 'react'
import Head from './Head'
import Timer from './Timer'
import NewsAlertBar from './NewsAlertBar'

type DefaultLayoutProps = {
  title?: string
  children: JSX.Element
  mainpage: boolean
}

export const DefaultLayout = ({
  title,
  children,
  mainpage,
}: DefaultLayoutProps): JSX.Element => {
  return (
    <div className="app">
      <Head title={title} />
      <div>
        {mainpage ? <MainHeader /> : <SubHeader />}
        <NewsAlertBar />
        {children}
      </div>
    </div>
  )
}

const MainHeader = (): JSX.Element => {
  return (
    <div className="top-header">
      <img src={require('public/images/logo.png')} alt="" className="logo" />
      <div className="title">AI 융합에너지 효율화 종합 대시보드</div>
      <div className="right-box">
        <div className="logout">Log Out</div>
        {/* <Timer /> */}
      </div>
    </div>
  )
}

const SubHeader = (): JSX.Element => {
  return (
    <div className="top-header">
      <div className="menu-box"></div>
      <div className="title">AI 융합에너지 효율화 종합 대시보드</div>
      <div className="right-box">
        <div className="logout">Log Out</div>
        <Timer />
      </div>
    </div>
  )
}
