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
            <div className="ResultsTable">
                <div className="ResultsBody">
                    { items && items.map(({id, surname, firstname, motivation, share}, idc) => {
                        return (
                            <div key={`${firstname}${id}${idc}`}>
                            <div className="ResultsRow" >
                                <div className="ResultsCell">{idc + 1} / {share}</div>
                                <div className="ResultsCell">{id} </div>
                                <div className="ResultsCell">{firstname} {surname ? surname : ""}</div>
                            </div>
                            <div className="ResultsRow  Motivation">
                                <div className="ResultsCell"></div>
                                <div className="ResultsCell">{motivation}</div>
                                <div className="ResultsCell"></div>
                            </div>
                            </div>            
                        );
                    }) }
                </div>
            </div>
        );
    }

    function prizeDisplay (prizes) {
        return (
            <div className="ResultsBody">
                { prizes && prizes.map((prize,idx) => { 
                return (
                    <div key={idx}>
                    <div className="ResultsRow" >
                        <div className="ResultsCell"><h3>{`[${idx + 1}]`}</h3></div>
                        <div className="ResultsCell"><h3>{`${prize.year} `}</h3></div>
                        <div className="ResultsCell"><h3>{`${prize.category}`}</h3></div>
                    </div>
                    { prize.overallMotivation ? <div className="ResultsRow">
                        <div className="ResultsCell"></div>
                        <div className="ResultsCell"><h3>{prize.overallMotivation && `${prize.overallMotivation}`}</h3></div>
                    </div>: ""}
                    <div className="ResultsRow">
                        <div className="ResultsCell"></div>
                        <div className="ResultsCell">{prize.laureates && laureatesDisplay(prize.laureates)}</div>
                    </div>
                    </div>
                );})
                }
            </div>
        );
    }
    



    return (
        <div className="ShowResults">
            <div className="ShowResults__body">
                <div className="ResultsHeader">
                    {`${searchFound[0]}`}
                    <span className="ResultNumber">{`${searchFound[1]}`}</span>
                    {`${searchFound[2]}`}
                </div>
                <div className="ResultsTable">
                    { displayData && prizeDisplay(displayData)}
                </div>
                
                
            </div>
        </div>
    )
}