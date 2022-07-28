import { NewsType } from 'types/ApiTypes';
import { observable } from 'mobx'
import axios from 'axios';
interface MainStore {
  newsData: NewsType[],
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
