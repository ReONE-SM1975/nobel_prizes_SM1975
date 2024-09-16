import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
import { SPECIAL } from "../constants/constants.js";

export default function ShowDataRecursive({ obj = {}, order = {}, expend = false, title = "" }) {
    const [currentObject, setCurrentObject] = useState({})
    const [passOnObject, setPassOnObject] = useState({}) // next level object
    // const [currentTitle, setCurrentTitle] = useState(title) // if one did not like it to be called prizes, laureates or affiliations
    const [currentOrders, setCurrentOrders] = useState([])
    const [passOnOrders, setPassOnOrders] = useState({}) // next level object
    const [toExpend, setToExpend] = useState(expend)
    const [getTitle, setGetTitle] = useState(title)

    useEffect(() => {

        setCurrentObject(() => {
            const list = []
            //const { prizes, laureates, affiliations, mixtures } = obj;
            for (const key in obj) { // key = prizes, laureates, affiliations, mixtures
                for (const innerObject of obj[key]) { // prizes = [ {innerObject} ]
                    let innerList = []
                    if (currentOrders){
                        // You needed to handle for case if the value is an array
                        // wrap the key inside an object and pass that key to the recursion component eg: { laureates = [{},{}] } .
                        // laureates should be came from the next iteration of the recursive component
                        for (const innerObjectKey of currentOrders){
                            if (typeof obj[key][innerObject][innerObjectKey] === "object" && !Array.isArray(obj[key][innerObject][innerObjectKey])){
                               // setup next pass on object, next pass on list and Recursive component 
                            } else if (typeof obj[key][innerObject][innerObjectKey] === "string")
                            list.push(<li>{obj[key][innerObject][innerObjectKey]}</li>) // this is the in ordered list
                        }
                    } else {
                        for (const innerObjectKey in obj[key][innerObject]){
                            list.push(<li>{obj[key][innerObject][innerObjectKey]}</li>) // this is the object oriented ordered list
                        }
                    }
                    
                }
                return (
                    <div><ul>{key}:</ul>{list}</div>
                )
            }
        }
        )
    }, [obj])

    useEffect(() => {

        setCurrentOrders(() => {
            /**
             * setCurrentOrders should take an input of 'object orders' that return an array of keys of wanted orders of the immediate object.
             * This also should handle:-
             * 1.) [deleted] as inapporiate for this branch
             * 2.) take the orders given in the object array. If the element of the array is an object, the key of this object should pass this object to the next order
             */



        })
    }, [order])

    useEffect(() => {
        console.log("ShowDataRecursive updateOrders:", currentOrders)
    }, [currentOrders])
    useEffect(() => {
        console.log("ShowDataRecursive dateResult:", currentObject)
    }, [currentObject])

    function handleRescursion(objx, order) {
        /** objx  = {prizes = [{year, cat,  laureates = [] },{},{}]} */
        /** order = {prizes = [ year, cat, {laureates : [] } ] } */
    }

    function handleToExpend(e) {
        e.preventDefault();
        setToExpend(!toExpend)
    }
    return (
        <>
            {Object.keys(currentObject).length && toExpend ? <div>{handleRescursion(currentObject, currentOrders)}</div> : null}
            <Button onClick={handleToExpend} text={toExpend ? <div>Expand</div> : <div>Collapse</div>} /><br />
        </>
    )



}