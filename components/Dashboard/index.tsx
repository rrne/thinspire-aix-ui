import MapBoxComp from "./MapBoxComp_cp";
import RightPannelComp from "./RightPannelComp";
import LeftPannelComp from "./LeftPannelComp";
import useStore from "stores";
import {useState, useEffect} from 'react'

const Dashboard = ():JSX.Element => {
    const store = useStore().Main
    const factory = useStore().Factory
    useEffect(() => {
        store.getDailyUsage()
        store.getMonthlyUsage()
        store.getMonthlySteamStatus()
        store.getSteamCount()
        factory.getCurrentStatus()
    },[])
    return(
        <div className="dashboard">
            <div className="background">
                <MapBoxComp />
            </div>
            <RightPannelComp />
            <LeftPannelComp />
        </div>
    )
}

export default Dashboard