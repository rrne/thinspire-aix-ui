import { observable, runInAction } from 'mobx'
import axios, { AxiosRequestConfig } from 'axios'

const Main = observable({
  newsData: [],
  getNewsAPI() {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: 'BASE_URL',
    }
    const header = {
      'X-Naver-Client-Id': 'SoQV5w9nxC9FngFrGPEu',
      'X-Naver-Client-Secret': 'PWGxmttGcF',
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    }
    axios
      .get('https://openapi.naver.com/v1/search/news.json?query=시화', {
        headers: header,
      })
      .then((res) => console.log(res.data))
  },
})

export default Main
