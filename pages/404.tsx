import React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'

const NotFound: NextPage = () => {
  return (
    <div className="err-page">
      <img src={require('public/images/background.png')} alt="" />
      <div className="content">
        <h1>404</h1>
        <p>Page Not Found</p>
        <span>The resource requested could not be found on this server!</span>
        <Link href="/">
          <div>Back</div>
        </Link>
      </div>
      <style jsx>
        {`
          .err-page {
            position: relative;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
            .content {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: rgba(0, 0, 0, 0.5);
              padding: 24px;
              border-radius: 12px;
              display: flex;
              justify-content: center;
              flex-direction: column;

              h1 {
                font-size: 5em;
                line-height: 0.8em;
                text-align: center;
                color: #4780af;
                font-weight: 700;
              }
              p {
                font-size: 2em;
                font-weight: 600;
                line-height: 0.2em;
                text-align: center;
                color: white;
              }
              span {
                color: white;
              }
              div {
                margin-top: 30px;
                background: #054478ca;
                padding: 6px;
                display: flex;
                justify-content: center;
                font-size: 20px;
                border-radius: 30px;
                font-weight: 600;
                cursor: pointer;
                transition: 0.25s;
                box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
              }
              div:hover {
                transform: translate(-1px, -2px);
              }
            }
          }
        `}
      </style>
    </div>
  )
}

export default NotFound
