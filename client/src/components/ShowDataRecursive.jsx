import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
// import { SPECIAL } from "../constants/constants.js";
import { isObject } from "../utils/utils.js"

export default function ShowDataRecursive({ obj = {}, order = {}, expand = false, title = "" }) {
    const [currentTitle, setCurrentTitle] = useState(title) // Only can rewrite the top level nest name
    const [toExpand, setToExpand] = useState(expand)


    useEffect(() => {
        /** handle title */
        setCurrentTitle((prev) => {
            if (prev) {
                return prev
            } else {
                const temp = Object.keys(obj);
                if (temp.length > 1) {
                    console.error("ShowDataRecursive: Title expected object should only have one key")
                }
                return temp[0]
            }
        })
        console.log("currentTitle:", currentTitle)

    }, [obj, currentTitle])

    function handleToExpand(e) {
        e.preventDefault();
        setToExpand(!toExpand)
    }

    function handleRescursive() {
        const list = [];

        if (Object.keys(order).length) { /* order[currentTitle].length */

            let j = 0;
            for (const eachObject of obj[currentTitle]) {
                let tempList = [];
                let headline = `${currentTitle}[${j + 1}]`
                for (let i = 0; i < order[currentTitle].length; i++) {

                    if (eachObject[order[currentTitle][i]] &&
                        typeof order[currentTitle][i] === "string") {
                        tempList.push(
                            <ul>
                                <li key={`${currentTitle}-${i}-${j}`}>
                                    <div className="ResultsCell">
                                        <span className="Shrink Capital">{order[currentTitle][i]}{": "}
                                        </span>
                                    </div>
                                    <div className="ResultsCell BreakWord-Wrap">{eachObject[order[currentTitle][i]]}</div>
                                </li>
                            </ul>)
                    } else if (isObject(order[currentTitle][i])) {
                        const nextOrderKey = Object.keys(order[currentTitle][i])[0]

                        if (eachObject[nextOrderKey]) {
                            tempList.push(
                                <ul>
                                    <li key={`${currentTitle}-${i}-${j}`}>
                                        <div className="Capital Shrink"><ShowDataRecursive obj={{ [nextOrderKey]: eachObject[nextOrderKey] }} order={order[currentTitle][i]} toExpand={false} />
                                        </div>
                                    </li>
                                </ul>)
                        }
                    }


                }

                list.push(<div className="DivBorder"><h5><u>{headline}</u></h5>{tempList}</div>)
                j++;
            }
        } else {
            let i = 0;
            for (const eachObject of obj[currentTitle]) {
                let j = 0;
                let tempList = [];
                let headline = `${currentTitle}[${i + 1}]`
                for (const eachKey in eachObject) {
                    if (eachObject[eachKey] &&
                        typeof eachObject[eachKey] === "string") {
                        tempList.push(
                            <ul>
                                <li key={`${currentTitle}-${i}-${j}`}>
                                    <div className="ResultsCell AlignLeft Capital">
                                        <span>{eachKey}{": "}</span>
                                    </div>
                                    <div className="ResultsCell">{eachObject[eachKey]}</div>
                                </li>
                            </ul>)

                    } else if (Array.isArray(eachObject[eachKey])) {
                        const nextOrderKey = eachKey
                        tempList.push(
                            <ul>
                                <li key={`${currentTitle}-${i}-${j}`}>
                                    <div className="ResultsCell AlignLeft">
                                        <ShowDataRecursive obj={{ [nextOrderKey]: eachObject[nextOrderKey] }} order={{}} />
                                    </div>
                                </li>
                            </ul>)
                    }
                    j++;

                }

                list.push(<div className="DivBorder"><h5><u>{headline}</u></h5>{tempList}</div>)
                i++;
            }
        }
        console.log(list)
        return (<div className="ResultsRow"><div className="ResultsCell"><ul>{list}</ul></div></div>)
    }
    return (
        <>
            <div className="ResultsTable">
                <div className="ResultsBody">
                    <div className="ResultsRow">
                        <div className="ResultsCell">
                            <span id={`id-${currentTitle}`}>{currentTitle}{": "}</span><br />
                            <Button id={`id-${currentTitle}`} onClick={handleToExpand} text={toExpand ? <div>Collaspe</div> : <div>Expand</div>} /><br />
                            {toExpand && handleRescursive()}
                        </div>
                    </div>

                </div>
            </div>

        </>
    )



}