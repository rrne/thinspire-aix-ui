import { NewsType, DailyUsage, MonthlyUsage, MonthlySteamStatus,SteamCount, AINews } from 'types/ApiTypes';
import {  runInAction, observable } from 'mobx'
import axios from 'axios';
interface MainStore {
  module: string;
  subpage: string;
  newsData: NewsType[];
  dailyUsage: DailyUsage;
  monthlyUsage: MonthlyUsage[];
  monthlySteamStatus: MonthlySteamStatus[];
  steamCount: SteamCount[];
  AINews: AINews[];
  getNewsAPI: () => void;
  getDailyUsage: () => void;
  getMonthlyUsage: () => void;
  getMonthlySteamStatus: () => void;
  getSteamCount: () => void;
  getAIAlarm: () => void;
  changeSubpage: (value:string) => void;
}

const Main = observable<MainStore>({
  module: "AIX",
  subpage:"elec",
  newsData: [],
  dailyUsage: null,
  monthlyUsage: [],
  monthlySteamStatus: [],
  steamCount: [],
  AINews: [],
  async getNewsAPI() {
    await axios.get("http://localhost:8000/search/news",{params: {query:"AIX"}}).then((res) => {
      runInAction(() => {
        this.newsData = res.data.items
      })
    });
  },
  async getDailyUsage() {
    await axios.post("http://175.123.142.155:28887/main/elec/daily-usage").then((res) => {
      runInAction(() => {
        this.dailyUsage = res.data[0];
      })
  });
  },
  async getMonthlyUsage() {
    await axios.post("http://175.123.142.155:28887/main/elec/monthly-usage").then((res) => {
      runInAction(() => {
        this.monthlyUsage = res.data;
      })
   });
  },
  async getMonthlySteamStatus() {
    await axios.post("http://175.123.142.155:28887/main/steam_percent").then((res) => {
      runInAction(() => {
        this.monthlySteamStatus = res.data;
      })
   });
  },
  async getSteamCount() {
    await axios.post("http://175.123.142.155:28887/main/steam_dev_count").then((res) => {
      runInAction(() => {
        this.steamCount = res.data;
      })
   });
  },
  //AI 공지 + Factory Error
  async getAIAlarm() {
    await axios.post("http://175.123.142.155:28887/main/alarm",{
      siteid: "ALL"}).then((res) => {
      runInAction(() => {
        this.AINews = res.data;
      })
   });
  },
  changeSubpage(value:string){
    this.subpage = value
  }
}) 

export default Main
