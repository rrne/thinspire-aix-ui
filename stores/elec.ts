import { NewsType, DailyUsage, MonthlyUsage, MonthlySteamStatus,SteamCount, AINews } from 'types/ApiTypes';
import {  runInAction, observable } from 'mobx'
import axios from 'axios';

interface ElecStore {
  module: string;
  getNewsAPI: () => void;
}

const Elec = observable<ElecStore>({
  module: "AIX",
  async getNewsAPI() {
    await axios.get("http://localhost:8000/search/news",{params: {query:"AIX"}}).then((res) => {
      runInAction(() => {
        this.newsData = res.data.items
      })
    });
  }
}) 

export default Elec
