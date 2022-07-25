import Timer from './Timer';

type TopCustomHead = {
  mainpage: boolean
}

const TopHeader = ({mainpage}:TopCustomHead): JSX.Element => {

  return mainpage ? <MainHeader /> : <SubHeader />
}

export default TopHeader

const MainHeader = ():JSX.Element => {
    return(
        <div className="top-header">
            <img src={require('public/images/logo.png')} alt="" className="logo"/>
            <div className="title">AI 융합에너지 효율화 종합 대시보드</div>
            <Timer/>
        </div>
    )
}

const SubHeader = ():JSX.Element => {
    return(
        <div className="top-header">
            <div className="menu-box"></div>
            <div className="title">AI 융합에너지 효율화 종합 대시보드</div>
            <Timer/>
        </div>
    )
}