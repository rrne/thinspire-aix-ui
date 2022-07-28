import MapBoxComp from "./MapBoxComp"

const Dashboard = ():JSX.Element => {
    return(
        <div className="dashboard">
            <div className="background">
                <MapBoxComp />
            </div>
        </div>
    )
}

export default Dashboard