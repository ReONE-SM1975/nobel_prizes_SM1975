import React, {useEffect,useState} from "react";
import SideControlBar from "./SideControlBar";
import ShowResults from "./ShowResults"

import "../styles/MiddleBodyContent.css"

export default function MiddleBodyContent({myDefault=[]}){

    const [dataPass, setDataPass] = useState(myDefault)
    useEffect(()=>{
        setDataPass(myDefault)
    },[myDefault])
    return (
        <div className="MiddleBodyContent">
            <div className="MiddleBodyContent__body">
                
                    <SideControlBar></SideControlBar>
                    
                
                    <ShowResults data={dataPass}></ShowResults>
                
            </div>
                
        </div>
    )
}