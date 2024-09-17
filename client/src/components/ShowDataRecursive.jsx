import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
// import { SPECIAL } from "../constants/constants.js";
import { isObject } from "../utils/utils.js"

export default function ShowDataRecursive({ obj = {}, order = {}, expend = false, title = "" }) {
    const [currentObject, setCurrentObject] = useState({})
    const [passOnObject, setPassOnObject] = useState({}) // next level object
    // const [currentTitle, setCurrentTitle] = useState(title) // if one did not like it to be called prizes, laureates or affiliations
    const [currentOrders, setCurrentOrders] = useState([])
    const [passOnOrders, setPassOnOrders] = useState({}) // next level object
    const [currentTitle, setCurrentTitle] = useState(title) // Only can rewrite the top level nest name
    const [toExpend, setToExpend] = useState(expend)


    useEffect(() => {

        setCurrentObject(() => {
            for (const currentKey in obj) { /** obj = {"prizes" : [] }*/
                for (const arr of obj[currentKey]) { /** obj[prizes] = [ {}, {} ] */
                    for (const item in obj[currentKey][arr]) { /** obj[prizes][item] */
                        if (Array.isArray(obj[currentKey][arr][item])) {
                            setPassOnObject(() => {
                                const result = {}
                                result[item] = obj[currentKey][arr][item]
                                return result;
                            })
                        }
                    }
                }
            }
            return obj
        })
        /** handle title */
        if (!currentTitle) {
            const temp = Object.keys(obj)
            if (temp.length > 1) {
                console.error("ShowDataRecursive: Title expected object should only have one key")
            }
            setCurrentTitle(temp[0]) /** Despite error still try to get curretnt title out of the first object key it encounter */
        }

    }, [obj, currentTitle])

    useEffect(() => {

        setCurrentOrders(() => {
            /**
             * setCurrentOrders should take an input of 'object orders' that return an array of keys of wanted orders of the immediate object.
             * This also should handle:-
             * 1.) [deleted] as inapporiate for this branch
             * 2.) take the orders given in the object array. If the element of the array is an object, the key of this object should pass this object to the next order
             */
            for (const currentKey in order) {
                for (const arr of order[currentKey]) {
                    if (isObject(order[currentKey][arr])) {
                        setPassOnOrders(order[currentKey][arr])
                    }
                }
            }
            return order

        })
    }, [order])

    useEffect(() => {
        console.log("ShowDataRecursive updateOrders:", currentOrders)
    }, [currentOrders])
    useEffect(() => {
        console.log("ShowDataRecursive dateResult:", currentObject)
    }, [currentObject])

    useEffect(() => {

    })

    function handleRescursion(objx, order) {
        /** objx  = {prizes = [{year, cat,  laureates = [] },{},{}]} */
        /** order = {prizes = [ year, cat, {laureates : [] } ] } */
        /** Get objx keys and it's length can only be 1 */
        return (
            <>

            </>
        )
    }

    function handleToExpend(e) {
        e.preventDefault();
        setToExpend(!toExpend)
    }
    return (
        <>
            <ul>
                <span>{currentTitle}{" : "}</span><br />
                <Button onClick={handleToExpend} text={toExpend ? <div>Expand</div> : <div>Collapse</div>} /><br />
                {toExpend && currentObject.currentTitle && currentObject.currentTitle.map((item, index) => {
                    if (currentOrders) {
                        currentOrders.map((key, idx) => {
                            if (typeof item[key] === "string") {
                                return (

                                    <li key={`${key}-${index}-${idx}`}><div><span>{`[${index + 1}][${idx + 1}] ${key} : `}</span>{item[key]}</div></li>


                                )

                            } else if (isObject(item[key])) {
                                return (

                                    <li key={`${key}-${index}-${idx}`}>
                                        <div><span>{`[${index + 1}][${idx + 1}] `}</span>
                                            <ShowDataRecursive
                                                objx={passOnObject}
                                                order={passOnOrders}
                                                title={key} />

                                        </div>
                                    </li>

                                )
                            } 
                            return null
                        })
                    } else if (!currentOrders) {

                    }
                    return null
                })}
            </ul>
            {/* {Object.keys(currentObject).length && toExpend ? <div>{handleRescursion(currentObject, currentOrders)}</div> : null} */}


        </>
    )



}