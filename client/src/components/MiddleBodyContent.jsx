import React from "react";
import SideControlBar from "./SideControlBar";
import ShowResults from "./ShowResults"

import "../styles/MiddleBodyContent.css"

export default function MiddleBodyContent(){

    return (
        <div>
            <div className="MiddleBodyContent">
                <div className="MiddleBodyContent__left">
                    <SideControlBar></SideControlBar>
                    </div>
                <div className="MiddleBodyContent__right">
                        <ShowResults></ShowResults>
                    </div>
            </div>
                
        </div>
    )
}