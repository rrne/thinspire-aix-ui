import { useState, useEffect } from 'react'
import { AIXFactoryType } from 'types/FactoryType'
import Image from 'next/image'
import {
  faFaceSmile,
  faFaceSadTear,
  faHouse,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'

const RightPannelComp = observer(
  ({
    func,
    store,
    factory,
    funcTotal,
  }: {
    func
    store
    factory
    funcTotal
  }): JSX.Element => {
    const router = useRouter()
    const data =
      store.module === 'AIX' ? factory.AIXFactorys : factory.AIBoutureFactorys

    const [GJFactory, setGJFactory] = useState(
      data.filter((list) => list.code === 'G')
    )
    const [YSfactory, setYSFactory] = useState(
      data.filter((list) => list.code === 'Y')
    )

    type PannelData = {
      label: string
      className: string
      data: AIXFactoryType[]
    }

    const pannel: PannelData[] = [
      {
        label: '광주',
        className: 'gj',
        data: GJFactory,
      },
      {
        label: '여수',
        className: 'ys',
        data: YSfactory,
      },
    ]

    const goToControlPage = ({ page, value }) => {
      if (page === 'elec') {
        router.push('elec')
        sessionStorage.setItem('factory', value)
      } else if (page === 'steam') {
        router.push('steam')
        sessionStorage.setItem('factory', value)
      } else {
        router.push('rotation')
        sessionStorage.setItem('factory', value)
      }
    }

    return (
      <div
        className={store.module === 'AIX' ? 'right-pannel' : 'AIright-pannel'}
      >
        <div className="right-box">
          <div className="title-box">
            <div className="title">
              <Image
                src={require('public/images/titleIcon.png')}
                width={18}
                height={18}
                alt=""
                className="titleIcon"
              />
              <div>에너지 효율 현황</div>
            </div>
            {store.module === 'AIX' ? (
              ''
            ) : (
              <div className="factoryLabel" onClick={funcTotal}>
                <FontAwesomeIcon icon={faHouse} />
                전체보기
              </div>
            )}
          </div>
          <div className="content">
            {store.module === 'AIX'
              ? pannel.map((list, i) => {
                  return (
                    <div className={list.className + ' factory-box'} key={i}>
                      <div className="factoryLabel" onClick={funcTotal}>
                        <div className="icon">
                          <FontAwesomeIcon icon={faHouse} />
                        </div>
                        {list.label}
                      </div>
                      {list.data?.map((factory, k) => {
                        return (
                          <div
                            className={
                              factory.electronic && factory.heats
                                ? 'factory'
                                : 'factory error'
                            }
                            key={k}
                          >
                            <div
                              className="img-box"
                              onClick={() => func(factory)}
                            >
                              <Image
                                src={require('public/images/marker.png')}
                                alt=""
                                width={50}
                                height={50}
                              />
                              <div className="title">{factory.title}</div>
                            </div>
                            <div className="content">
                              <div
                                className="box"
                                onClick={() =>
                                  goToControlPage({
                                    page: 'elec',
                                    value: factory.id,
                                  })
                                }
                              >
                                <div className="label">전기에너지</div>
                                <div
                                  className={
                                    factory.electronic ? 'status' : 'status err'
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={
                                      factory.electronic
                                        ? faFaceSmile
                                        : faFaceSadTear
                                    }
                                  />
                                </div>
                              </div>
                              <div
                                className="box"
                                onClick={() =>
                                  goToControlPage({
                                    page: 'rotation',
                                    value: factory.id,
                                  })
                                }
                              >
                                <div className="label">회전기기 제어</div>
                                <div
                                  className={
                                    factory.heats ? 'status' : 'status err'
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={
                                      factory.heats
                                        ? faFaceSmile
                                        : faFaceSadTear
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })
              : factory.AIBoutureFactorys.map((factory, i) => {
                  return (
                    <div className="factory-box" key={i}>
                      <div
                        className={factory.heats ? 'factory' : 'factory error'}
                      >
                        <div className="img-box" onClick={() => func(factory)}>
                          <Image
                            src={require('public/images/marker.png')}
                            alt=""
                            width={50}
                            height={50}
                          />
                          <div className="title">{factory.title}</div>
                        </div>
                        <div className="content">
                          <div
                            className="box"
                            onClick={() =>
                              goToControlPage({
                                page: 'steam',
                                value: factory.id,
                              })
                            }
                          >
                            <div className="label">스팀에너지</div>
                            <div
                              className={
                                factory.heats ? 'status' : 'status err'
                              }
                            >
                              <FontAwesomeIcon
                                icon={
                                  factory.heats ? faFaceSmile : faFaceSadTear
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
          </div>
        </div>
      </div>
    )
  }
)

export default RightPannelComp
