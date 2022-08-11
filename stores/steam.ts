import {
  SteamTrapStatus,
  SteamTrapCount,
  SteamTrapDignosis,
  SteamTrapDignosisBG,
  SteamTrapCondition,
  ElecPPCondition,
  FemsGraphData,
} from 'types/ApiTypes'
import { runInAction, observable } from 'mobx'
import axios from 'axios'

export interface SteamStore {
  steamTrapStatus: SteamTrapStatus
  steamTrapCount: SteamTrapCount[]
  steamTrapDignosis: SteamTrapDignosis[]
  steamTrapDignosisBG: SteamTrapDignosisBG[]
  steamTrapCondition: SteamTrapCondition[]
  elecPPCondition: ElecPPCondition[]
  femsGraphData: FemsGraphData[]
  downloadFemsData: string[]
  getSteamTrapStatusAPI: (id: string) => void
  getSteamTrapCountAPI: (id: string) => void
  getSteamTrapDignosisAPI: (id: string) => void
  getSteamTrapConditionAPI: (id: string) => void
  getElecPPConditionAPI: (id: string) => void
  getSteamTrapDignosisBGdata: () => void
  getFemsGraphDataAPI: ({ siteid, devid, type, period }) => void
  downloadFemsGraphDataAPI: ({ siteid, devid, type, period }) => void
}

const Steam = observable<SteamStore>({
  steamTrapStatus: null,
  steamTrapCount: [],
  steamTrapDignosis: [],
  steamTrapDignosisBG: [],
  steamTrapCondition: [],
  elecPPCondition: [],
  femsGraphData: [],
  downloadFemsData: [],
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
  async getSteamTrapConditionAPI(id) {
    this.steamTrapCondition = []
    await axios
      .post('http://175.123.142.155:28887/sub/steam/trap-condition', {
        siteid: id,
      })
      .then((res) => {
        runInAction(() => {
          this.steamTrapCondition = res.data
        })
      })
  },
  async getElecPPConditionAPI(id) {
    this.elecPPCondition = []
    await axios
      .post('http://175.123.142.155:28887/sub/elec/power_plant_details', {
        siteid: id,
      })
      .then((res) => {
        runInAction(() => {
          this.elecPPCondition = res.data
        })
      })
  },
  async getFemsGraphDataAPI({ siteid, devid, type, period }) {
    this.femsGraphData = []
    await axios
      .post('http://175.123.142.155:28887/sub/fems_trend_graph', {
        siteid: siteid,
        devid: devid,
        search_type: type,
        search_period: period,
      })
      .then((res) => {
        runInAction(() => {
          this.femsGraphData = res.data
        })
      })
  },
  async downloadFemsGraphDataAPI({ siteid, devid, type, period }) {
    await axios
      .post('http://175.123.142.155:28887/sub/fems_trend_csv', {
        siteid: siteid,
        devid: devid,
        search_type: type,
        search_period: period,
      })
      .then((res) => {
        runInAction(() => {
          this.downloadFemsData = res.data
        })
      })
  },
  getSteamTrapDignosisBGdata() {
    axios.get('/data/steamScatterBG.json').then((res) => {
      runInAction(() => {
        this.steamTrapDignosisBG = res.data
      })
    })
  },
})

export default Steam
