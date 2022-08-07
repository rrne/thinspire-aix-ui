import {
  UseageType,
  DailyPredict,
  MonthlyPredict,
  DignosticPlan,
  CsvData,
} from 'types/ApiTypes'
import { runInAction, observable } from 'mobx'
import axios from 'axios'

interface ElecStore {
  useageCharge: UseageType
  dailyPredict: DailyPredict[]
  monthlyPredict: MonthlyPredict[]
  dignosticPlan: DignosticPlan[]
  csvData: CsvData[]
  getUsageChargeAPI: (id: string) => void
  getDailyPredictAPI: (id: string) => void
  getMonthlyPredictAPI: (id: string) => void
  getDignosticPlanAPI: (id: string) => void
  getCsvData: () => void
}

const Elec = observable<ElecStore>({
  useageCharge: null,
  dailyPredict: [],
  monthlyPredict: [],
  dignosticPlan: [],
  csvData: [],
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
  async getDailyPredictAPI(id) {
    await axios
      .post('http://175.123.142.155:28887/sub/elec/daily-predict', {
        siteid: id,
      })
      .then((res) => {
        runInAction(() => {
          this.dailyPredict = res.data
          console.log(res.data)
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
          console.log(res.data)
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
          console.log(res.data)
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
})

export default Elec
