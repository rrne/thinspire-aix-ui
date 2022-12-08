import {
  UseageType,
  DailyPredict,
  MonthlyPredict,
  DignosticPlan,
  CsvData,
  PPgraphData,
  ElecUsageStatus
} from 'types/ApiTypes'
import { runInAction, observable } from 'mobx'
import axios from 'axios'

interface ElecStore {
  useageCharge: UseageType
  dailyPredict: {
    site:string;
    items:DailyPredict[]
  }
  elecUsageStatus: ElecUsageStatus[]
  monthlyPredict: {
    site:string;
    items:MonthlyPredict[]
  }
  dignosticPlan: DignosticPlan[]
  csvData: CsvData[]
  ppgraphData: PPgraphData
  downloadPPTrendData: string[]
  getUsageChargeAPI: (factoryCode: string) => void
  getElecUsageStatusAPI: (id: string) => void
  getDailyPredictAPI: (factoryCode: string) => void
  getMonthlyPredictAPI: (factoryCode: string) => void
  getDignosticPlanAPI: (id: string) => void
  getPPGraphDataAPI: (id: string, period: string) => void
  downloadPPGraphDataAPI: (id: string, period: string) => void
  getCsvData: () => void
}

const Elec = observable<ElecStore>({
  useageCharge: null,
  dailyPredict: null,
  elecUsageStatus:[],
  monthlyPredict: null,
  dignosticPlan: [],
  csvData: [],
  ppgraphData: null,
  downloadPPTrendData: [],
  async getUsageChargeAPI(factoryCode) {
    await axios
      .get(`http://175.123.142.155:58888/sub/power/usage-charge/${factoryCode}`)
      .then((res) => {
        runInAction(() => {
          this.useageCharge = res.data.data
        })
      })
  },
  async getElecUsageStatusAPI(id) {
    await axios
      .post('http://175.123.142.155:28887/sub/elec/power_plant_details', {
        siteid: id,
      })
      .then((res) => {
        runInAction(() => {
          this.elecUsageStatus = res.data;
        })
      })
  },
  async getDailyPredictAPI(factoryCode) {
    await axios
    .get(`http://175.123.142.155:58888/sub/power/daily-predict/${factoryCode}`)
      .then((res) => {
        runInAction(() => {
          this.dailyPredict = res.data.data
        })
      })
  },
  async getMonthlyPredictAPI(factoryCode) {
    await axios
    .get(`http://175.123.142.155:58888/sub/power/monthly-predict/${factoryCode}`)
      .then((res) => {
        runInAction(() => {
          this.monthlyPredict = res.data.data
        })
      })
  },
  async getDignosticPlanAPI(id) {
    await axios
      .post('http://175.123.142.155:28887/sub/elec/diagnostic_plane', {
        siteid: id,
      })
      .then((res) => {
        runInAction(() => {
          this.dignosticPlan = res.data
        })
      })
  },
  async getCsvData() {
    axios.get('/data/scatterbg.json').then((res) => {
      runInAction(() => {
        this.csvData = res.data
      })
    })
  },
  async getPPGraphDataAPI(id, period) {
    await axios
      .post('http://175.123.142.155:28887/sub/pp_trend_graph', {
        siteid: id,
        search_period: period,
      })
      .then((res) => {
        runInAction(() => {
          this.ppgraphData = res.data
        })
      })
  },
  async downloadPPGraphDataAPI(id, period) {
    await axios
      .post('http://175.123.142.155:28887/sub/pp_trend_csv', {
        siteid: id,
        search_period: period,
      })
      .then((res) => {
        runInAction(() => {
          this.downloadPPTrendData = res.data
        })
      })
  },
})

export default Elec
