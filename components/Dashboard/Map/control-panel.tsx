import React, {useEffect, useState} from 'react';
import useStore from 'stores';
import { faUpRightAndDownLeftFromCenter, faIndustry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ControlPanel(props) {
    const store = useStore().Main
    const factory = useStore().Factory
    const [storeData, setStoreData] = useState(store.module === "AIX" ? factory.AIXFactorys : factory.AIBoutureFactorys)

  return (
    <div className="control-panel">
        <div className="total control"  onClick={() => props.onSelectCity({longitude:127.19614998984213, latitude:35.01116689472127, zoom:9})}><span><FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter}/></span>전체보기</div>
      {storeData.map((list, i) => (
        <div key={i} className="control" onClick={() => props.onSelectCity({longitude:list.location[0], latitude:list.location[1], zoom:15})}>
          <span><FontAwesomeIcon icon={faIndustry}/></span>{list.title}
        </div>
      ))}
    </div>
  );
}

export default React.memo(ControlPanel);