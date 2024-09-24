import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
// import { SPECIAL } from "../constants/constants.js";
import { isObject } from "../utils/utils.js"

export default function ShowDataRecursive({ obj = {}, order = {}, expand = false, title = "" }) {
    const [currentObject, setCurrentObject] = useState({})
    const [passOnObject, setPassOnObject] = useState({}) // next level object
    // const [currentTitle, setCurrentTitle] = useState(title) // if one did not like it to be called prizes, laureates or affiliations
    const [currentOrders, setCurrentOrders] = useState([])
    const [passOnOrders, setPassOnOrders] = useState({}) // next level object
    const [currentTitle, setCurrentTitle] = useState(title) // Only can rewrite the top level nest name
    const [toExpand, setToExpand] = useState(expand)


    useEffect(() => {

        setCurrentObject(() => {
            const result = {};

            for (const currentKey in obj) { /** obj = {"prizes" : [] }*/
                if (Array.isArray(obj[currentKey])) {
                    for (const item of obj[currentKey]) { /** obj[prizes] = [ {}, {} ] */
                        if (isObject(obj[currentKey][item])) {
                            for (const itemKey of obj[currentKey][item]) {
                                if (Array.isArray(obj[currentKey][item][itemKey])) {
                                    setPassOnObject(() => {
                                        const result = {};
                                        result[itemKey] = obj[currentKey][item][itemKey]
                                        return result
                                    })
                                    result[itemKey] = {}
                                } else {
                                    result[itemKey] = obj[currentKey][item][itemKey]
                                }
                            }
                        }
                    }
                }
            }
            console.log("ShowDataRecursive currentObject", result)
            return result
        })
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

    useEffect(() => {

        setCurrentOrders(() => {
            /**
             * setCurrentOrders should take an input of 'object orders' that return an array of keys of wanted orders of the immediate object.
             * This also should handle:-
             * 1.) [deleted] as inapporiate for this branch
             * 2.) take the orders given in the object array. If the element of the array is an object, the key of this object should pass this object to the next order
             */
            const list = []

            for (const currentKey in order) { /** order = {prizes:[ "",{}]} */
                for (const arr of order[currentKey]) { /** order[prizes] = ["", {}] */
                    if (isObject(order[currentKey][arr])) {
                        setPassOnOrders(order[currentKey][arr])
                        for (const innerKey in order[currentKey][arr]) {
                            list.push(innerKey)
                        }
                    } else if (typeof order[currentKey][arr] === "string") {
                        list.push(arr)
                    }
                }
            }
            return list

        })
    }, [order])

    useEffect(() => {
        console.log("ShowDataRecursive currentOrders:", currentOrders)
    }, [currentOrders])
    useEffect(() => {
        console.log("ShowDataRecursive currentObject:", currentObject)
    }, [currentObject])

    useEffect(() => {
        console.log("ShowDataRecursive passOnObject:", passOnObject)
    }, [passOnObject])

    useEffect(() => {
        console.log("ShowDataRecursive passOnOrders:", passOnOrders)
    }, [passOnOrders])

    useEffect(() => {
        console.log("ShowDataRecursive toExpand", toExpand)
    }, [toExpand])

    useEffect(() => {
        console.log("ShowDataRecursive currentObject.currentTitle", currentObject.currentTitle)
    }, [currentObject, currentTitle])

    function handleToExpand(e) {
        e.preventDefault();
        setToExpand(!toExpand)
    }

    function handleRescursive() {
        const list = [];

        if (order[currentTitle].length) {

            let j = 0;
            for (const eachObject of obj[currentTitle]) {
                let tempList = [];

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
                    j++;

                }
                list.push(<div className="DivBorder">{tempList}</div>)

            }
        } else {
            let i = 0;
            for (const eachObject of obj[currentTitle]) {
                let j = 0;
                let tempList = [];
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
                i++;
                list.push(<div className="DivBorder">{tempList}</div>)
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