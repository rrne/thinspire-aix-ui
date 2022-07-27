import { observable, runInAction } from 'mobx'
import axios, { AxiosRequestConfig } from 'axios';

interface MainStore {
  newsData: object[],
  getNewsAPI: () => void
}

const Main = observable<MainStore>({
  newsData: [],
  getNewsAPI() {
    axios.get("http://localhost:8000/search/news",{params: {query:"AIX"}}).then((res) => {
      this.newsData = res.data.items
    });
  },
})

export default Main
