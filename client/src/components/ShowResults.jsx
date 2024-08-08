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
    const [displayData, setDisplayData] = useState(data);
    const [searchFound, setSearchFound] = useState(0);
    
    useEffect(()=>{
        setDisplayData(data)
        setSearchFound(resultTexts(data.length))
    },[data]); 
    
    function laureatesDisplay (items) {
        return (
            <div className="laureatesHead">
                <div className="laureatesBody">
                    { items && items.map(({id, surname, firstname, motivation, share}, idc) => {
                        return (
                            <div key={`${firstname}${id}${idc}`}>
                                <div>{idc + 1} / {share} {id} : {firstname} {surname ? surname : ""}</div>
                                <div>{motivation}</div>
                            </div>            
                        );
                    }) }
                </div>
            </div>
        );
    }

    function prizeDisplay (prizes) {
        return (
            <div className="ResultBody">
                { prizes && prizes.map((prize,idx) => { 
                return (
                    <div key={idx}>
                        <h3>{`[${idx + 1}]: ${prize.year} : ${prize.category}`}</h3>
                        <h3>{prize.overallMotivation && `${prize.overallMotivation}`}</h3>
                        <div>{`Laureates:`}</div>
                        <div>{prize.laureates && laureatesDisplay(prize.laureates)}</div>
                    </div>
                );})
                }
            </div>
        );
    }
    



    return (
        <div className="ShowResults">
            <div className="ShowResults__body">
                <div className="ResultHeader">
                    {`${searchFound[0]}`}
                    <span className="ResultNumber">{`${searchFound[1]}`}</span>
                    {`${searchFound[2]}`}
                </div>
                <div>
                    { displayData && prizeDisplay(displayData)}
                </div>
                
                
            </div>
        </div>
    )
}