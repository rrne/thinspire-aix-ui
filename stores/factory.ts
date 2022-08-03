import { FactoryType } from 'types/FactoryType';
import { runInAction, observable } from 'mobx'
import axios from 'axios';

interface FactoryStore {
    AIXFactorys: FactoryType[];
    AIBoutureFactorys: FactoryType[];
    getCurrentStatus: () => void;
}

const Factory = observable<FactoryStore>({
    AIXFactorys: [
        {
        id: 2005007001,
        title: "아이지스",
        electronic: true,
        heats: true,
        location: [126.8583204,
            35.2257176],
        code:"G"
        },
        {
        id: 2005007002,
        title: "아이코디",
        electronic: true,
        heats: true,
        location: [126.857933,
            35.2265856],
            code:"G"
        },
        {
        id: 2005007003,
        title: "디알텍",
        electronic: true,
        heats: true,
        location: [126.863897,
            35.2030358],
            code:"G"
        },
        {
        id: 2005007004,
        title: "DH 글로벌",
        electronic: true,
        heats: true,
        location: [126.8611434,
            35.1989575],
            code:"G"
        },
        {
        id: 2005007005,
        title: "재원산업",
        electronic: true,
        heats: true,
        location: [ 127.6584653,
            34.8237514],
            code:"Y"
        },
        {
        id: 2005007006,
        title: "에스에프시",
        electronic: true,
        heats: true,
        location: [127.6492842,
            34.8318756],
            code:"Y"
        }
    ],
    AIBoutureFactorys: [
        {
            id: 2005007001,
            title: "롯데칠성음료 안성공장",
            electronic: true,
            heats: true,
            location: [ 127.2633319,
              36.9769888],
              code:"G"
          },
          {
            id: 2005007002,
            title: "노벨리스코리아주식회사",
            electronic: true,
            heats: true,
            location: [128.6281658,
              36.7908539],
              code:"G"
          },
    ],
  async getCurrentStatus() {
    await axios.post("http://175.123.142.155:28887/main/current_status",{ siteid: "ALL" }).then((res) => {
      runInAction(() => {
        for(let i =0; i < this.AIXFactorys.length; i++){
            this.AIXFactorys[i].electronic = true
            this.AIXFactorys[i].heats = true
        }
        
        for(let i = 0; i < res.data.length; i++){
            let idx = this.AIXFactorys.findIndex(list => list.id === res.data[i].siteid)
            
            if(res.data.class === "elec"){
                this.AIXFactorys[idx].electronic = false
            }else{
                this.AIXFactorys[idx].heats = false
            }
        }
      })
   });
  },
}) 

export default Factory
