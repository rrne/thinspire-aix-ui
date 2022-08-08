import { RotationMotor } from 'types/ApiTypes'
import { runInAction, observable } from 'mobx'
import axios from 'axios'

interface ElecStore {
  rotationMotor: RotationMotor[]
  getRotationMotorAPI: () => void
}

const Rotation = observable<ElecStore>({
  rotationMotor: [],
  async getRotationMotorAPI() {
    await axios.get('/data/rotationMotor.json').then((res) => {
      runInAction(() => {
        this.rotationMotor = res.data
      })
    })
  },
})

export default Rotation
