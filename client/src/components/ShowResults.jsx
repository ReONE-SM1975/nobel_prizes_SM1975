import React, { useState, useEffect, useContext } from "react";
import ShowDataRecursive from "../components/ShowDataRecursive";
import "../styles/ShowResults.css";
import { PARENTSCONS, CHILDCONS, SPECIAL } from "../constants/constants";

import { ResultContext } from "../context/ResultContext"

export default function ShowResults() {
    const [displayData, setDisplayData] = useState([]);
    const [searchFound, setSearchFound] = useState(0);

    const { getResult } = useContext(ResultContext)

    const { LAUREATES, PRIZES, AFFILIATIONS } = PARENTSCONS
    const { ID, YEAR, CATEGORY, MOTIVATION, NAME, CITY, COUNTRY, SHARE, OVERALLMOTIVATION } = CHILDCONS
    const { FIRSTNAME, SURNAME } = SPECIAL

    const laureatesOrders = {
        [LAUREATES]: [ID, FIRSTNAME, SURNAME,
            {
                [PRIZES]: [YEAR, CATEGORY, MOTIVATION,
                    {
                        [AFFILIATIONS]: [NAME, CITY, COUNTRY]
                    }
                ]
            }
        ]
    }

    const prizesOrders = {
        [PRIZES]: [CATEGORY, YEAR, OVERALLMOTIVATION,
            {
                [LAUREATES]: [ID, FIRSTNAME, SURNAME, MOTIVATION, SHARE]
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

    function prizeDisplay(data) {
        const { prizes, laureates } = data;
        if (prizes) {

            return (
                <div>
                    {prizes &&
                        <div>
                            <div className="Shrink Capital">
                                <div className="Flex-grow">
                                    <ShowDataRecursive obj={data} order={prizesOrders} expand={false} />
                                </div>

                            </div>
                        </div>}
                </div>

            );
        } else if (laureates) {
            return (
                <>
                    {laureates &&
                        <div>
                            <div className="Shrink Capital">
                                <div className="Flex-grow">
                                    <ShowDataRecursive obj={data} order={laureatesOrders} />
                                </div>
                            </div>
                        </div>}
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