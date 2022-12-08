export type AIFactoryType = {
  id: number
  title: string
  electronic: boolean
  heats: boolean
  error: boolean
  location: [number, number]
  code: string
  elecbg?:string
  factoryCode: string;
}
export type AIXFactoryType = {
  id: number
  title: string
  heats: boolean
  error: boolean
  location: [number, number]
  code: string
  factoryCode: string;
}

export type BigFactoryType = {
  title: string
  error: boolean
  location: [number, number]
  code: string
}
