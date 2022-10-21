import {
  NewsType,
  DailyUsage,
  MonthlyUsage,
  MonthlySteamStatus,
  SteamCount,
  AINews,
} from 'types/ApiTypes'
import { runInAction, observable } from 'mobx'
import axios from 'axios'
interface MainStore {
  module: string
  subpage: string
  newsData: NewsType[]
  gjDailyUsage: DailyUsage
  ysDailyUsage: DailyUsage
  gjMonthlyUsage: MonthlyUsage[]
  ysMonthlyUsage: MonthlyUsage[]
  monthlySteamStatus: MonthlySteamStatus[]
  steamCount: SteamCount[]
  AINews: AINews[]
  getNewsAPI: () => void
  getDailyUsage: (region:string) => void
  getMonthlyUsage: (region:string) => void
  getMonthlySteamStatus: () => void
  getSteamCount: () => void
  getAIAlarm: () => void
  changeSubpage: (value: string) => void
}

const Main = observable<MainStore>({
  module: 'AI',
  subpage: 'elec',
  newsData: [],
  gjDailyUsage: null,
  ysDailyUsage: null,
  gjMonthlyUsage: [],
  ysMonthlyUsage: [],
  monthlySteamStatus: [],
  steamCount: [],
  AINews: [],
  async getNewsAPI() {
    await axios
      .get('/search/news', { params: { query: 'AIX' } })
      .then((res) => {
        runInAction(() => {
          this.newsData = res.data.items
        })
      })
  },
  async getDailyUsage(region) {
    await axios
      .get(`http://175.123.142.155:58888/main/daily-usage/${region}`)
      .then((res) => {
        runInAction(() => {
         region === "gj" ?  this.gjDailyUsage = res.data.data :  this.ysDailyUsage = res.data.data
        })
      })
  },
  async getMonthlyUsage(region) {
    await axios
      .get(`http://175.123.142.155:58888/main/monthly-usage/${region}`)
      .then((res) => {
        runInAction(() => {
          region === "gj" ?  this.gjMonthlyUsage = res.data.data :  this.ysMonthlyUsage = res.data.data
        })
      })
  },
  async getMonthlySteamStatus() {
    await axios
      .post('http://175.123.142.155:28887/main/steam_percent')
      .then((res) => {
        runInAction(() => {
          this.monthlySteamStatus = res.data
        })
      })
  },
  async getSteamCount() {
    await axios
      .post('http://175.123.142.155:28887/main/steam_dev_count')
      .then((res) => {
        runInAction(() => {
          this.steamCount = res.data
        })
      })
  },
  //AI 공지 + Factory Error
  async getAIAlarm() {
    await axios
      .post('http://175.123.142.155:28887/main/alarm', {
        siteid: 'ALL',
      })
      .then((res) => {
        runInAction(() => {
          this.AINews = res.data
        })
      })
  },
  changeSubpage(value: string) {
    this.subpage = value
  },
})

export default Main
