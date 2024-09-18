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
            const currentResult = {};
            
            for (const currentKey in obj) { /** obj = {"prizes" : [] }*/
                for (const arr of obj[currentKey]) { /** obj[prizes] = [ {}, {} ] */
                    for (const item in obj[currentKey][arr]) { /** obj[prizes][item] */
                        currentResult[currentKey] = obj[currentKey]
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
            console.log("currentResult",currentResult)
            return currentResult
        })
        /** handle title */
        setCurrentTitle((prev)=>{
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
        console.log("currentTitle:",currentTitle)

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
                        for (const innerKey in order[currentKey][arr]){
                            list.push(innerKey)
                        }
                    } else if (typeof order[currentKey][arr] === "string"){
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

    useEffect(()=>{
        console.log("ShowDataRecursive passOnObject:",passOnObject)
    },[passOnObject])

    useEffect(() => {
        console.log("ShowDataRecursive passOnOrders:", passOnOrders)
    },[passOnOrders])

    useEffect(()=>{
        console.log("ShowDataRecursive toExpand", toExpand)
    },[toExpand])

    useEffect(()=>{
        console.log("ShowDataRecursive currentObject.currentTitle", currentObject.currentTitle)
    },[currentObject, currentTitle])

    function handleToExpand(e) {
        e.preventDefault();
        setToExpand(!toExpand)
    }
    return (
        <div>
            <ul>
                <span>{currentTitle}{" : "}</span><br />
                <Button onClick={handleToExpand} text={toExpand ? <div>Collaspe</div> : <div>Expand</div>} /><br />
                {
                toExpand &&
                currentObject[currentTitle] && 
                currentOrders && 
                currentObject[currentTitle].map((item, index) => {
                    currentOrders.map((key, idx) => {
                            if (item[key] && typeof item[key] === "string") 
                                return(
                                    <li key={`${key}-${index}-${idx}`}><div><span>{`[${index + 1}][${idx + 1}] ${key} : `}</span>{item[key]}</div></li>
                                )
                            else if  (item[key] && isObject(item[key])) 
                                return (
                                    <li key={`${key}-${index}-${idx}`}>
                                        <div><span>{`[${index + 1}][${idx + 1}] `}</span>
                                            <ShowDataRecursive
                                                objx={passOnObject}
                                                order={passOnOrders}
                                                 />
                                        </div>
                                    </li>
                                )
                                return null
                        }
                    )
                    return null
                }
            ) 
                
                
                
                
            } 
            </ul>
            {/* {Object.keys(currentObject).length && toExpend ? <div>{handleRescursion(currentObject, currentOrders)}</div> : null} */}


        </div>
    )



}