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

export default function ShowResults(){
    const [searchFound, setSearchFound] = useState([])
    useEffect(()=>{
        setSearchFound(resultTexts("foobar"))
    },[]) 
    
    return (
        <div className="ShowResults">
            <div className="ShowResults__body">
                <p className="ResultText">
                    {`${searchFound[0]}`}
                    <span className="ResultNumber">{`${searchFound[1]}`}</span>
                    {`${searchFound[2]}`}
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