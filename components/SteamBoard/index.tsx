import UnityComp from './UnityComp'
import SteamTrapDignosis from './SteamTrapDignosis'
import SteamTrapDevice from './SteamTrapDevice'
import SteamTrapStatus from './SteamTrapStatus'
import useStore from 'stores'
import { observer } from 'mobx-react-lite'
import TitleBox from 'components/Layout/TitleBox'
import { useState, useEffect } from 'react'
import SteamTrapComp from './SteamTrapComp'
import ElecTrapComp from './ElecTrapComp'

const SteamBoard = observer((): JSX.Element => {
  const store = useStore().Steam
  const [tap, setTap] = useState('steam')
  const [trap, setTrap] = useState([])

  useEffect(() => {
    tap === 'steam'
      ? setTrap(store.steamTrapCondition)
      : setTrap(store.elecPPCondition)
  }, [store.steamTrapCondition, store.elecPPCondition])

  const clickTheTap = (value) => {
    const factoryNum = sessionStorage.getItem('factory')
    if (value === 'steam') {
      store.getSteamTrapConditionAPI(factoryNum)
      setTap('steam')
    } else {
      store.getElecPPConditionAPI(factoryNum)
      setTap('elec')
    }
  }

  return (
    <div className="steam-page">
      <UnityComp />
      <div className="left-panel">
        <SteamTrapStatus {...store} />
        <SteamTrapDevice {...store} />
        <SteamTrapDignosis {...store} />
      </div>
      <div className="right-panel">
        <TitleBox title="설비별 상태" />
        <div className="btn-box">
          <div
            className={tap === 'steam' ? 'btn select' : 'btn'}
            onClick={() => clickTheTap('steam')}
          >
            스팀트랩
          </div>
          <div
            className={tap === 'elec' ? 'btn select' : 'btn'}
            onClick={() => clickTheTap('elec')}
          >
            전력설비
          </div>
        </div>
        <div className="content-box">
          {tap === 'steam' ? (
            <SteamTrapComp tap={tap} trap={trap} />
          ) : (
            <ElecTrapComp tap={tap} trap={trap} />
          )}
        </div>
      </div>
    </div>
  )
})

export default SteamBoard
