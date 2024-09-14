import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
import { SPECIAL } from "../constants/constants.js";

export default function ShowDataRecursive({ obj = {}, order = {}, expend = false, title = "" }) {
    const [dataResult, setDataResult] = useState(obj)
    const [updateOrders, setUpdateOrders] = useState(order)
    const [toExpend, setToExpend] = useState(expend)
    const [getTitle, setGetTitle] = useState(title)

    useEffect(() => {

        setDataResult((prev) => {
            if (obj[SPECIAL.FIRSTNAME]) {
                if (obj[SPECIAL.SURNAME]) {
                    return {
                        ...prev,
                        [SPECIAL.FULLNAME]: `${obj[SPECIAL.FIRSTNAME]} ${obj[SPECIAL.SURNAME]}`
                    }
                }
                return {
                    ...prev,
                    [SPECIAL.FULLNAME]: `${obj[SPECIAL.FIRSTNAME]}`
                }

            }
            return {
                ...prev
            }
        })
    }, [obj])

    useEffect(() => {

        setUpdateOrders((prev) => {
            // if (title){
            //     const temp = order.title
            // } else {
                
            //     const temp = Object.values(order)
            // }

            let fullnameCount = 0;
            let temp = order[Object.values(order)[0]]
            if (Array.isArray(temp) && temp.length){
                if (temp.includes(SPECIAL.FIRSTNAME) || temp.includes(SPECIAL.SURNAME)){

                }
            }
            for (const ele of order) {
                if (ele === SPECIAL.FIRSTNAME) {
                    fullnameCount += 1;
                } else if (ele === SPECIAL.SURNAME) {
                    fullnameCount += 1;
                }
            }
            if (fullnameCount > 0) {
                fullnameCount = 0;
                return [SPECIAL.FULLNAME, ...prev]
            }
            
            return [...prev]
        })
    }, [order])

    useEffect(()=>{
        console.log("ShowDataRecursive updateOrders:",updateOrders)
    },[updateOrders])
    useEffect(()=>{
        console.log("ShowDataRecursive dateResult:",dataResult)
    },[dataResult])

    function handleRescursion(objx, order) {
        
    }

    function handleToExpend(e) {
        e.preventDefault();
        setToExpend(!toExpend)
    }
    return (
        <>
            {Object.keys(dataResult).length && toExpend ? <div>{handleRescursion(dataResult, updateOrders)}</div> : null}
            <Button onClick={handleToExpend} text={toExpend ? <div>Expand</div> : <div>Collapse</div>} /><br />
        </>
    )



}