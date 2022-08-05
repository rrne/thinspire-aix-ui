import MapBoxComp from "./MapBoxComp_cp";
import RightPannelComp from "./RightPannelComp";
import LeftPannelComp from "./LeftPannelComp";
import useStore from "stores";
import {useState, useEffect} from 'react';

const Dashboard = ():JSX.Element => {
    const store = useStore().Main;
    const factory = useStore().Factory;

    const [panelFactory, setPanelFactory] = useState(null);

    const callFlyToFactory = (value) => {
        setPanelFactory(value)
    }
    const callFlyToTotalFactory = (value) => {
        setPanelFactory({
            title: "total",
            location: [127.19614998984213,
                35.01116689472127],
            })
    }
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
                <MapBoxComp func={callFlyToFactory} store={store} factory={factory} flyto={panelFactory}/>
            </div>
            <RightPannelComp func={callFlyToFactory} store={store} factory={factory} funcTotal={callFlyToTotalFactory}/>
            <LeftPannelComp />
        </div>
    )
}

export default Dashboard