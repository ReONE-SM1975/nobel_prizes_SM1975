import React from "react";
//import axios from "axios"
import "../styles/ShowResults.css";

const resultTexts = (resultNum = 0) => {
    let single = "";
    if (resultNum !== 1){
        single = "s"
    }
    return `Found ${resultNum} result${single}.`
}

export default function ShowResults(){

    return (
        <div className="ShowResults">
            <div className="ShowResults__body">
                <p className="ResultText">
                    {`${resultTexts()}`}
                </p>
                {"Under Constructions\n"}<br/>
                {"Under Constructions\n"}<br/>
                {"Under Constructions\n"}<br/>
                {"Under Constructions\n"}<br/>
                {"Under Constructions\n"}<br/>
            </div>
        </div>
    )
}