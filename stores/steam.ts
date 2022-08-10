import {
  SteamTrapStatus,
  SteamTrapCount,
  SteamTrapDignosis,
  SteamTrapDignosisBG,
} from 'types/ApiTypes'
import { runInAction, observable } from 'mobx'
import axios from 'axios'

export interface SteamStore {
  steamTrapStatus: SteamTrapStatus
  steamTrapCount: SteamTrapCount[]
  steamTrapDignosis: SteamTrapDignosis[]
  steamTrapDignosisBG: SteamTrapDignosisBG[]
  getSteamTrapStatusAPI: (id: string) => void
  getSteamTrapCountAPI: (id: string) => void
  getSteamTrapDignosisAPI: (id: string) => void
  getSteamTrapDignosisBGdata: () => void
}

const Steam = observable<SteamStore>({
  steamTrapStatus: null,
  steamTrapCount: [],
  steamTrapDignosis: [],
  steamTrapDignosisBG: [],
  async getSteamTrapStatusAPI(id) {
    await axios
      .post('http://175.123.142.155:28887/sub/steam/status_table', {
        siteid: id,
      })
      .then((res) => {
        runInAction(() => {
          console.log(res.data)

          this.steamTrapStatus = res.data[0]
        })
      })
  },
  async getSteamTrapCountAPI(id) {
    await axios
      .post('http://175.123.142.155:28887/sub/steam/steam_dev_count', {
        siteid: id,
      })
      .then((res) => {
        runInAction(() => {
          this.steamTrapCount = res.data
        })
      })
  },
  async getSteamTrapDignosisAPI(id) {
    await axios
      .post('http://175.123.142.155:28887/sub/steam/diagnostic_plane', {
        siteid: id,
      })
      .then((res) => {
        runInAction(() => {
          this.steamTrapDignosis = res.data
        })
      })
  },
  async getSteamTrapDignosisBGdata() {
    axios.get('/data/steamScatterBG.json').then((res) => {
      runInAction(() => {
        this.steamTrapDignosisBG = res.data
      })
    })
  },
})

export default Steam
