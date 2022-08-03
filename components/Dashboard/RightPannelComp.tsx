import {useState, useEffect} from 'react';
import { FactoryType } from 'types/FactoryType';
import Image from "next/image";
import useStore from 'stores';
import { faFaceSmile, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from 'mobx-react';

const RightPannelComp = observer((): JSX.Element => {
    const store = useStore().Main
    const factory = useStore().Factory

    const data = store.module === "AIX" ? factory.AIXFactorys : factory.AIBoutureFactorys;

    const [GJFactory, setGJFactory] = useState(data.filter(list => list.code === "G"))
    const [YSfactory, setYSFactory] = useState(data.filter(list => list.code === "Y"))

    type PannelData = {
        label:string;
        className:string;
        data:FactoryType[]
    }

    const pannel:PannelData[] = [
        {
            label:"광주",
            className: "gj",
            data:GJFactory
        },
        {
            label:"여수",
            className: "ys",
            data:YSfactory
        }
    ]

   return(
       <div className="right-pannel">
        {pannel.map((list,i) => {
            return(
                <div className={list.className + " right-box"} key={i}>
                    <div className="title-box">
                        <div className="title">
                            <Image src={require('public/images/titleIcon.png')} width={18} height={18} alt="" className="titleIcon"/>
                            <div>에너지 효율 현황</div>
                        </div>
                        <div className="label">{list.label}</div>
                    </div>
                    <div className="content">
                        {list.data?.map((factory,k) => {
                            return(
                                <div className={factory.electronic && factory.heats ? "factory" : "factory error"} key={k}>
                                   <div className="img-box">
                                        <Image src={require('public/images/marker.png')} alt="" width={50} height={50}/>
                                        <div className="title">{factory.title}</div>
                                   </div>
                                   <div className="content">
                                    <div className="box">
                                    <div className="label">전기에너지</div>
                                    <div className={factory.electronic ? "status" : "status err"}>
                                    <FontAwesomeIcon icon={factory.electronic ? faFaceSmile : faFaceSadTear}/>
                                    </div>
                                    </div>
                                    <div className="box">
                                    <div className="label">회전기기 제어</div>
                                    <div className={factory.heats ? "status" : "status err"}>
                                    <FontAwesomeIcon icon={factory.heats ? faFaceSmile : faFaceSadTear}/>
                                    </div>
                                    </div>
                                   </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        })}
       </div>
   )
})

export default RightPannelComp;