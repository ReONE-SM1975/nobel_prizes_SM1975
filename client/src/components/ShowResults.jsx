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
    //const [totalLaureates, setTotalLaureates] = useState(0)
    
    useEffect(()=>{
        setSearchFound(resultTexts(data.length))
        setDisplayData(data)
    },[data]) 
    
    const laureatesDisplay = (items) => {
        
        return (
            <div>1000
            <ol>
            { items ? items.map((winner, idc)=>
            {
                // setTotalLaureates(totalLaureates+1)
                return (
                    <li key={idc}>
                    {`[${winner.id}]`}
                    {'WINNER:'}{winner.surname ? `${winner.firstname} ${winner.surname}` : `${winner.firstname}`}<br />{`${winner.motivation}`}
                    </li>            
                )
            }) : `Loading...`}
            </ol>
            </div>
        )
    }

    const prizeDisplay = (prizes) => {
        return (
            <div className="ResultBody">
                    {
                    prizes && prizes.map((prize,idx) => { /*
                    <div key={idx}>
                    <h3>{`${prize.year} : ${prize.cateogry}`}</h3>
                    { prize.overallmotivation && <h3>{`${prize.overallmotivation}`}</h3>}
                    <h2>{`Laureates:`}</h2>
                    <ol>
                    <h2>{prize.laureates.map((winner, inc) => {
                        let fullname = winner.surname ? `${winner.firstname} ${winner.surname}` : `${winner.firstname}`;
                            <li>{`${inc+1}:[${winner.id}] ${fullname}}`}<br />{`${winner.motivation}`}</li>
                    })}</h2>
                    </ol>
                    </div>
                   */ 
                return (
                    <div key={idx}>
                        <h3>
                            {`[${idx + 1}]: ${prize.year} : ${prize.category}`}
                        </h3>
                        <h3>
                            {prize.overallMotivation && `${prize.overallMotivation}`}
                        </h3>
                        <h3>{`Laureates:`}</h3>
                        {/* {prize.laureates} */}
                    {prize.laureates && `${(laureatesDisplay(prize.laureates))}`}
            </div>
                )
                }
                    )
                }
            </div>
            )
    }
    



    return (
        <div className="ShowResults">
            <div className="ShowResults__body">
                <p className="ResultHeader">
                    {`${searchFound[0]}`}
                    <span className="ResultNumber">{`${searchFound[1]}`}</span>
                    {`${searchFound[2]}`}
                </p>
                <div>
                    { /*displayData && displayData.map((ele) => { return <p>{`${ele.year}:${ele.category}\n${ele.laureates}`}</p>}) */} 
                    { displayData && prizeDisplay(displayData)}
                </div>
                
                
            </div>
        </div>
    )
}