import React, {useState,useEffect, useContext} from "react";
//import axios from "axios"
import "../styles/ShowResults.css";

import {ResultContext} from "../context/ResultContext"

const resultTexts = (resultNum = 0) => {
    resultNum = isNaN(parseInt(resultNum)) ? 0 : parseInt(resultNum);
    let single = "";
    if (resultNum !== 1){
        single = "s"
    }
    return ["Found ", `${resultNum}`, ` result${single}.`];
}

export default function ShowResults({data=[]}){
    const [displayData, setDisplayData] = useState([]);
    const [searchFound, setSearchFound] = useState(0);
    
    const { getResult } = useContext(ResultContext)

    // useEffect(()=>{
    //     setDisplayData(data)
    //     setSearchFound(resultTexts(data.length))
    // },[data]); 

    useEffect(()=>{
        setDisplayData(getResult)
        setSearchFound(resultTexts(getResult.length))
    }, [getResult])


    
    function laureatesDisplay (items) {
        return (
            <div>
                { items && items.map(({id, surname, firstname, motivation, share}, idc) => {
                    return (
                        <div key={`${firstname}${id}${idc}`}>
                            <div className="ResultsTable">
                                <div className="ResultsBody">
                                    <div className="ResultsRow" >
                                        <div className="ResultsCell">{id} </div>
                                        <div className="ResultsCell">{idc + 1} / {share}</div>
                                        <div className="ResultsCell">{firstname} {surname ? surname : ""}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="ResultsTable">
                                <div className="ResultsBody">
                                    <div className="ResultRow">
                                        <div className="ResultsCell">{motivation}</div>     
                                    </div>
                                </div>
                            </div>
                        </div>            
                    );
                }) }
            </div>
            
        );
    }

    function prizeDisplay (prizes) {
        return (
            <div>{/* parent div */}
                    { prizes && prizes.map((prize,idx) => { 
                        return (
                        <div key={idx}>
                            <div className="ResultsTable">
                                <div className="ResultsBody">
                                    <div className="ResultsRow" >
                                        <div className="ResultsCell"><h3>{`[${idx + 1}]`}</h3></div>
                                        <div className="ResultsCell"><h3>{`${prize.year} `}</h3></div>
                                        <div className="ResultsCell Capital"><h3>{`${prize.category}`}</h3></div>
                                    </div>
                                </div>
                            </div>
                        { prize.overallMotivation ? 
                            <div className="ResultsTable">
                                <div className="ResultsBody">
                                    <div className="ResultsRow">
                                        <div className="ResultsCell Extend"><h3>{prize.overallMotivation && `${prize.overallMotivation}`}</h3></div>
                                    </div>
                                </div>
                            </div>: ""}
                   
                        {prize.laureates && laureatesDisplay(prize.laureates)}
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
                
                    { displayData && prizeDisplay(displayData)}
                
                
                
            </div>
        </div>
    )
}