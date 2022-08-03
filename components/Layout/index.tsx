import React from 'react';
import Head from './Head';
import NewsAlertBar from './NewsAlertBar';
import {MainHeader, SubHeader} from './TopBar'

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
      <>
        {mainpage ? <MainHeader /> : <SubHeader />}
        <NewsAlertBar />
        {children}
      </>
    </div>
  )
}
