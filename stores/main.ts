import { observable, runInAction } from 'mobx'
import axios, { AxiosRequestConfig } from 'axios'

const Main = observable({
  newsData: [],
  getNewsAPI() {
    axios.get("http://localhost:8000/search/news",{params: {query:"시화"}}).then((res) => {
      this.newsData = res.data.items
      console.log(res.data);
      
    });
  },
})

export default Main
