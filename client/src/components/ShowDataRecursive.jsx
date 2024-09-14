import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
import { SPECIAL } from "../constants/constants.js";

export default function ShowDataRecursive({ obj = {}, order = [], expend = false }) {
    const [dataResult, setDataResult] = useState(obj)
    const [updateOrders, setUpdateOrders] = useState(order)
    const [toExpend, setToExpend] = useState(expend)

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
            if (!order) return []
            let fullnameCount = 0;
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
        for (const key in objx){
            if (objx[key] && order){
                for (let i=0; i< objx[key].length; i++){

                }
                return (
                    <div>
                        {
                            <div>
                                <div>{`${key} : `}</div>
                                {objx[key].length && 
                                objx[key].map((eachObj, idxk) => {
                                    order.forEach((specific, idxg) => {
                                        {typeof specific === 'string' &&
                                            <div key={`${key}-${specific}-${idxg}`}>
                                                
                                            </div>} 
                                        {specific instanceof Object && 
                                            <div key={`${key}-${specific}-${idxg}`}>
                                                <ShowDataRecursive obj={{specific: [eachObj]}} order={specific} />
                                            </div>} 
                                            
                                        }
                                )}
                                
                                )}
                            </div>
                        }
                    </div>
                )
            }
        }




        if (objx && order) {
            for (const element of order) {
                if (typeof element === "string" && objx[element]) {
                    return (
                        <>
                            {<div><span>{`${element}`}</span>{` : ${objx[element]}`}</div>}
                        </>
                    )
                } else if (element instanceof Object) { /**  */
                    for (const innerKey in element) {
                        if (Array.isArray(element[innerKey])) {
                            return (
                                <>
                                    {element[innerKey] && 
                                    <div><span>{`${innerKey} : `}</span>{objx[innerKey].map((objinner, idxe) => <div key={`${innerKey}${idxe}`}><ShowDataRecursive obj={objinner} order={element[innerKey]} /></div>)}</div>}
                                </>
                            )
                        }

                    }
                }
            }
        } else if (objx) { /** case for no orders is given */
            for (const element in objx) {
                if (objx[element]) {
                    if (typeof objx[element] === "string") {
                        return (
                            <>
                                {objx[element] && 
                                <div><span>{`${element} : `}</span>{`${objx[element]}`}</div>}
                            </>
                        )
                    } else if (Array.isArray(objx[element])){
                        return (
                            <>
                                {objx[element].length &&
                                <div><span>{`${element} : `}</span>{objx[element].map((objinner, idxf)=> <div key={`${element}${idxf}`}><ShowDataRecursive obj={objinner} order={[]} /></div>)}</div>}
                            </>
                        )

                        
                    }
                }
            }
        }
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