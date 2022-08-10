import UnityComp from './UnityComp'
import SteamTrapDignosis from './SteamTrapDignosis'
import SteamTrapDevice from './SteamTrapDevice'
import SteamTrapStatus from './SteamTrapStatus'
import useStore from 'stores'
import { observer } from 'mobx-react-lite'

const SteamBoard = observer((): JSX.Element => {
  const store = useStore().Steam

  return (
    <div className="steam-page">
      <UnityComp />
      <div className="left-panel">
        <SteamTrapStatus {...store} />
        <SteamTrapDevice {...store} />
        <SteamTrapDignosis {...store} />
      </div>
      <div className="right-panel"></div>
    </div>
  )
})

export default SteamBoard
