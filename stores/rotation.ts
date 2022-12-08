import { RotationMotor, RotationChartData, RotationTotalData } from 'types/ApiTypes'
import { runInAction, observable } from 'mobx'
import axios from 'axios'

interface ElecStore {
  rotationMotor: RotationMotor[];
  rotationChartData : {
    site:string;
    items:RotationChartData[]
  };
  rotationTotalData: {
    site:string;
    func:string;
    items:RotationTotalData[]
  };
  getRotationMotorAPI: (factoryCode:string) => void
  getRotationTotalAPI: ({ site, func}:{site:string; func:string}) => void
}

const Rotation = observable<ElecStore>({
  rotationMotor: [],
  rotationChartData:null,
  rotationTotalData:null,
  async getRotationMotorAPI(factoryCode) {
    await axios.get('http://175.123.142.155:58888/sub/motor/motor-usage', {
     params:{ site: factoryCode }
    }).then((res) => {
      runInAction(() => {
        this.rotationChartData = res.data.data
      })
    })
  },
  async getRotationTotalAPI({ site, func }) {
    await axios.get('http://175.123.142.155:58888/sub/motor/motor-usage/', {
     params:{ site, func}
    }).then((res) => {
      runInAction(() => {
        console.log(res.data.data);
        
        this.rotationTotalData = res.data.data
      })
    })
  },
})

export default Rotation
