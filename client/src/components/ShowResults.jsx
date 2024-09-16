import React, { useState, useEffect, useContext } from "react";
//import axios from "axios"
import ShowDataRecursive from "../components/ShowDataRecursive";
import "../styles/ShowResults.css";
import { CONS, LAUREATES, PRIZES, AFFILIATIONS } from "../constants/constants";

import { ResultContext } from "../context/ResultContext"

export default function ShowResults() {
    const [displayData, setDisplayData] = useState([]);
    const [searchFound, setSearchFound] = useState(0);

    const { getResult } = useContext(ResultContext)

    const laureatesOrders = {
        [CONS.LAUREATES]: [
            LAUREATES.ID,
            LAUREATES.FIRSTNAME,
            LAUREATES.SURNAME,
            {
                [LAUREATES.PRIZES]: [
                    PRIZES.YEAR,
                    PRIZES.CATEGORY,
                    PRIZES.MOTIVATION,
                    {
                        [PRIZES.AFFILIATIONS]: [
                            AFFILIATIONS.NAME,
                            AFFILIATIONS.CITY,
                            AFFILIATIONS.COUNTRY
                        ]
                    }
                ]
            }
        ]
    }


    const prizesOrders = {
        [CONS.PRIZES]: [
            PRIZES.CATEGORY,
            PRIZES.YEAR,
            PRIZES.OVERALLMOTIVATION,
            {
                [PRIZES.LAUREATES]: [
                    [LAUREATES.ID],
                    [LAUREATES.FIRSTNAME],
                    [LAUREATES.SURNAME],
                    [LAUREATES.MOTIVATION],
                    [LAUREATES.SHARE]
                ]
            }
        ]
    }


    const resultTexts = (resultNum = 0) => {
        resultNum = isNaN(parseInt(resultNum)) ? 0 : parseInt(resultNum);
        let single = "";
        if (resultNum !== 1) {
            single = "s"
        }
        return ["Found ", `${resultNum}`, ` result${single}.`];
    }

    function readKeys(obj = {}, orders = []) {
        const result = {}
        if (obj["firstname"] || obj["surname"]) {
            result["fullname"] = obj["surname"] ? `${obj["firstname"]} ${obj["surname"]}` : `${obj["firstname"]}`;
        }
        const objKeyList = ["fullname"]
        if (orders) {
            for (const key of orders) {
                if (obj[key] instanceof Array || Array.isArray(obj[key]) || Object.prototype.toString.call(obj[key]) === '[object Array]') {
                    return readKeys(obj[key])
                } else if (key === "firstname" || key === "surname") {
                    continue;
                } else {
                    if (key) {
                        result[key] = obj[key]
                        objKeyList.push(key)
                    }
                }
            }
        } else {
            for (const key in obj) {
                if (obj[key] instanceof Array || Array.isArray(obj[key]) || Object.prototype.toString.call(obj[key]) === '[object Array]') {
                    return readKeys(obj[key])
                } else if (key === "firstname" || key === "surname") {
                    continue;
                } else {
                    if (key) {
                        result[key] = obj[key]
                        objKeyList.push(key)
                    }
                }

            }
        }

        return (
            <>
                {result && objKeyList.map((ele, idx) => (<div key={`${result[ele]}${idx}`}>{`${ele}: ${result[ele]}`}</div>))}
            </>
        )




    }
    // useEffect(()=>{
    //     setDisplayData(data)
    //     setSearchFound(resultTexts(data.length))
    // },[data]); 

    useEffect(() => {
        setDisplayData(getResult)
        setSearchFound(() => {
            console.log("showResult function searchFound:", getResult)
            const { prizes, laureates } = getResult
            if (prizes) {
                return resultTexts(prizes.length)
            } else if (laureates) {
                return resultTexts(laureates.length)
            } else {
                return resultTexts(0)
            }
        })
    }, [getResult])



    function laureatesDisplay(items) {
        return (
            <div>
                {items && items.map(({ id, surname, firstname, motivation, share }, idc) => {
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
                })}
            </div>

        );
    }

    function prizeDisplay(data) {
        const { prizes, laureates } = data;
        if (prizes) {


            return (
                <div>{/* parent div */}
                    {/* prizes && prizes.map((prize, idx) => {
                        return (
                            <div key={`przs-${idx}`}>
                                <div className="ResultsTable">
                                    <div className="ResultsBody">
                                        <div className="ResultsRow" >
                                            <div className="ResultsCell"><h3>{`[${idx + 1}]`}</h3></div>
                                            <div className="ResultsCell"><h3>{`${prize.year} `}</h3></div>
                                            <div className="ResultsCell Capital"><h3>{`${prize.category}`}</h3></div>
                                        </div>
                                    </div>
                                </div>
                                {prize.overallMotivation ?
                                    <div className="ResultsTable">
                                        <div className="ResultsBody">
                                            <div className="ResultsRow">
                                                <div className="ResultsCell Extend"><h3>{prize.overallMotivation && `${prize.overallMotivation}`}</h3></div>
                                            </div>
                                        </div>
                                    </div> : ""}

                                {prize.laureates && laureatesDisplay(prize.laureates)}
                            </div>

                        );
                    })
                    */}
                    {prizes &&
                        <div className="ResultTable">
                            <div className="ResultBody"><ShowDataRecursive obj={data} order={prizesOrders} />
                            </div>
                        </div>}
                </div>

            );
        } else if (laureates) {
            return (
                <>
                    {laureates &&
                        <div className="ResultTable">
                            <div className="ResultBody"><ShowDataRecursive obj={data} order={laureatesOrders} />
                            </div>
                        </div>}
                    { //laureates && laureates.map((obj, idxc) => {
                        // return (
                        //     <div key={`lrts-${idxc}`}>
                        //         {readKeys(obj, [])}
                        //     </div>

                        // )
                        //})
                        // .map((laureate, idc) => {
                        // const { id, firstname, surname, born, died, borncountry, borncountrycode, borncity, diedcountry, diedcountrycode, diedcity, gender, prizes } = laureate;
                        // const name = surname ? `${firstname} ${surname}` : `${firstname}`
                        // return (
                        //     <div key={`lrts-${idc}`}> {/* parent div for laur map*/}

                        //     </div>
                        // )

                    }
                </>
            )
        }
    }




    return (
        <div className="ShowResults">
            <div className="ShowResults__body">
                <div className="ResultsHeader">
                    {searchFound && `${searchFound[0]}`}
                    <span className="ResultNumber">{searchFound && `${searchFound[1]}`}</span>
                    {searchFound && `${searchFound[2]}`}
                </div>

                {displayData && prizeDisplay(displayData)}



            </div>
        </div>
    )
}