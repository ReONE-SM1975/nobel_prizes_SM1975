import React, {useState,useEffect} from "react";
//import axios from "axios"
import "../styles/ShowResults.css";

const resultTexts = (resultNum = 0) => {
    resultNum = isNaN(parseInt(resultNum)) ? 0 : parseInt(resultNum);
    let single = "";
    if (resultNum !== 1){
        single = "s"
    }
    return ["Found ", `${resultNum}`, ` result${single}.`];
}

export default function ShowResults({data=[]}){
    const [displayData, setDisplayData] = useState(data)
    const [searchFound, setSearchFound] = useState(0)
    useEffect(()=>{
        setSearchFound(resultTexts(displayData.length))
        setDisplayData(data)
    },[data]) 
    
    return (
        <div className="ShowResults">
            <div className="ShowResults__body">
                <p className="ResultText">
                    {`${searchFound[0]}`}
                    <span className="ResultNumber">{`${searchFound[1]}`}</span>
                    {`${searchFound[2]}`}
                </p>
                <div>
                    { displayData && displayData.map((ele) => { return <p>{`${ele.year}:${ele.category}\n${ele.laureates}`}</p>}) } 
                </div>
                
                {"Under Constructions\n"}<br/>
                {"Under Constructions\n"}<br/>
                {"Under Constructions\n"}<br/>
                {"Under Constructions\n"}<br/>
                {"Under Constructions\n"}<br/>
            </div>
        </div>
    )
}