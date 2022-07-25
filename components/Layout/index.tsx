import React from 'react'
import Head from './Head'
import TopHeader from './TopHeader'


type DefaultLayoutProps = {
    title?: string
    children: JSX.Element,
    mainpage: boolean
  }
  
  export const DefaultLayout = ({
    title,
    children,
    mainpage
  }: DefaultLayoutProps): JSX.Element => {
    return (
      <div className='app'>
        <Head title={title} />
        <main>
          <TopHeader mainpage={mainpage} />
          {children}
        </main>
      </div>
    )
  }