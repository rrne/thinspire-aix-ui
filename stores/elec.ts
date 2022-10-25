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
  dailyPredict: DailyPredict[]
  elecUsageStatus: ElecUsageStatus[]
  monthlyPredict: MonthlyPredict[]
  dignosticPlan: DignosticPlan[]
  csvData: CsvData[]
  ppgraphData: PPgraphData
  downloadPPTrendData: string[]
  getUsageChargeAPI: (id: string) => void
  getElecUsageStatusAPI: (id: string) => void
  getDailyPredictAPI: (id: string) => void
  getMonthlyPredictAPI: (id: string) => void
  getDignosticPlanAPI: (id: string) => void
  getPPGraphDataAPI: (id: string, period: string) => void
  downloadPPGraphDataAPI: (id: string, period: string) => void
  getCsvData: () => void
}

const Elec = observable<ElecStore>({
  useageCharge: null,
  dailyPredict: [],
  elecUsageStatus:[],
  monthlyPredict: [],
  dignosticPlan: [],
  csvData: [],
  ppgraphData: null,
  downloadPPTrendData: [],
  async getUsageChargeAPI(id) {
    await axios
      .post('http://175.123.142.155:28887/sub/elec/usage-charge', {
        siteid: id,
      })
      .then((res) => {
        runInAction(() => {
          this.useageCharge = res.data
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
  async getDailyPredictAPI(id) {
    await axios
      .post('http://175.123.142.155:28887/sub/elec/daily-predict', {
        siteid: id,
      })
      .then((res) => {
        runInAction(() => {
          this.dailyPredict = res.data
        })
      })
  },
  async getMonthlyPredictAPI(id) {
    await axios
      .post('http://175.123.142.155:28887/sub/elec/monthly-predict', {
        siteid: id,
      })
      .then((res) => {
        runInAction(() => {
          this.monthlyPredict = res.data
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
