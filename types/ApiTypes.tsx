// Naver news api axios 호출 타입
export type NewsType = {
  link: string
  title: string
}

export type DailyUsage = {
  yesterday_elec: number
  yesterday_time: number
  lastweek_elec: number
  lastweek_time: number
  now_week_elec: number
  now_month_elec: number
}

export type MonthlyUsage = {
  time: number
  monthly_elec: number
}

export type MonthlySteamStatus = {
  site_name: string
  site_max_avg_percent: number
  site_in_out_percent: number
}

export type SteamCount = {
  trapType: string
  count: number
}

export type AINews = {
  time: number
  api_title: string
  api_contents: string
}

//ElecPage API Types
export type UseageType = [
  {
    now_kwh: string
    now_cost: string
    future_kwh: string
    future_cost: string
  }
]

export type DailyPredict = {
  time: number
  real_value: number
  limit: number
  predict_value: number
}
export type MonthlyPredict = {
  time: number
  real_value: number
  limit: number
  predict_value: number
  sum_value: number
}

export type DignosticPlan = {
  site_name: string
  time: number
  act_kwh: number
  react_kwh: number
  point_name: string
  anomaly_labels: boolean
}

export type CsvData = {
  act_kwh: number
  react_kwh: number
}

export type PPgraphData = {
  seg_count: number
  data: PPGraph[]
}

type PPGraph = {
  dev_time: number
  kwh: number
  cost: number
  holiday: number
}

//RotationPage API Types
export type RotationMotor = {
  title: string
  type: string
  value: {
    elec: number
    temp: number
    compressure: number
  }
  daysTrend: []
  monthTrend: []
}

//SteamPage API Types
export type SteamTrapStatus = {
  normal: number
  anomaly: number
  diagnosis: number
}
export type SteamTrapCount = {
  trapType: string
  count: number
}
export type SteamTrapDignosis = {
  site_name: string
  time: string
  in_temp: number
  out_temp: number
  point_name: string
  anomaly_labels: boolean
}
export type SteamTrapDignosisBG = {
  intemp: number
  outtemp: number
}
export type SteamTrapCondition = {
  devId: number
  inTemp: number
  outTemp: number
  pointName: string
  trapType: string
  status: number
}
export type ElecPPCondition = {
  devId: string
  pointName: string
  femsTime: string
  total_wh: number
  maximum_wh: number
  percent: number
}
export type FemsGraphData = {
  dev_time: number
  in_temp?: number
  out_temp?: number
  act_kwh?: number
  react_kwh?: number
  point_name: string
  holiday: number
}
