//import React, {useEffect,useState} from "react";
import SideControlBar from "./SideControlBar";
import ShowResults from "./ShowResults"

import "../styles/MiddleBodyContent.css"

export default function MiddleBodyContent() {

    return (
        <div className="MiddleBodyContent">
            <div className="MiddleBodyContent__body">

                <SideControlBar></SideControlBar>

                <ShowResults
                ></ShowResults>

            </div>

        </div>
    )
}