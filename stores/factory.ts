import {
  AIXFactoryType,
  AIFactoryType,
  BigFactoryType,
} from 'types/FactoryType'
import { runInAction, observable } from 'mobx'
import axios from 'axios'

interface FactoryStore {
  AIXFactorys: AIXFactoryType[]
  AIFactorysBig: BigFactoryType[]
  AIBoutureFactorys: AIFactoryType[]
  apiCallCount: number
  getCurrentStatus: () => void
}

const Factory = observable<FactoryStore>({
  AIBoutureFactorys: [
    {
      id: 2005007001,
      title: '아이지스',
      electronic: true,
      heats: true,
      error: true,
      location: [126.8583204, 35.2257176],
      code: 'G',
    },
    {
      id: 2005007002,
      title: '아이코디',
      electronic: true,
      heats: true,
      error: true,
      location: [126.857933, 35.2265856],
      code: 'G',
    },
    {
      id: 2005007003,
      title: '디알텍',
      electronic: true,
      heats: true,
      error: true,
      location: [126.863897, 35.2030358],
      code: 'G',
    },
    {
      id: 2005007004,
      title: 'DH 글로벌',
      electronic: true,
      heats: true,
      error: true,
      location: [126.8611434, 35.1989575],
      code: 'G',
    },
    {
      id: 2005007005,
      title: '재원산업(주)',
      electronic: true,
      heats: true,
      error: true,
      location: [127.6584653, 34.8237514],
      code: 'Y',
    },
    {
      id: 2005007006,
      title: '(주)에스에프시',
      electronic: true,
      heats: true,
      error: true,
      location: [127.6492842, 34.8318756],
      code: 'Y',
    },
  ],
  AIFactorysBig: [
    {
      title: '광주',
      error: true,
      location: [126.8583204, 35.2257176],
      code: 'G',
    },
    {
      title: '여수',
      error: true,
      location: [127.6584653, 34.8237514],
      code: 'Y',
    },
  ],
  AIXFactorys: [
    {
      id: 2005007001,
      title: '롯데칠성음료 안성공장',
      heats: true,
      error: true,
      location: [127.2633319, 36.9769888],
      code: 'G',
    },
    {
      id: 2005007002,
      title: '노벨리스코리아주식회사',
      heats: true,
      error: true,
      location: [128.6281658, 36.7908539],
      code: 'G',
    },
  ],
  apiCallCount: 0,
  async getCurrentStatus() {
    await axios
      .post('http://175.123.142.155:28887/main/current_status', {
        siteid: 'ALL',
      })
      .then((res) => {
        runInAction(() => {
          this.apiCallCount++
          for (let i = 0; i < this.AIBoutureFactorys.length; i++) {
            this.AIBoutureFactorys[i].electronic = true
            this.AIBoutureFactorys[i].heats = true
          }
          for (let i = 0; i < this.AIFactorysBig.length; i++) {
            this.AIFactorysBig[i].error = true
            this.AIFactorysBig[i].error = true
          }

          for (let i = 0; i < res.data.length; i++) {
            let idx = this.AIBoutureFactorys.findIndex(
              (list) => list.id === res.data[i].siteid
            )

            if (res.data.class === 'elec') {
              this.AIBoutureFactorys[idx].electronic = false
            } else {
              this.AIBoutureFactorys[idx].heats = false
            }
            this.AIBoutureFactorys[idx].error = false

            if (this.AIBoutureFactorys[idx].code === 'G') {
              this.AIFactorysBig[0].error = false
            } else {
              this.AIFactorysBig[1].error = false
            }
          }
        })
      })
  },
})

export default Factory
