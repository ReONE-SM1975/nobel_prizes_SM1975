import React, { useState, useEffect } from 'react';
import { SPECIAL } from "../constants/constants.js"

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

        })
    }, [obj])

    useEffect(() => {

        setUpdateOrders((prev) => {
            let fullnameCount = 0;
            for (const ele in order) {
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

    function handleRescursion(objx, order) {
        if (objx && order) {
            for (const element of order) {
                if (typeof element === "string" && objx[element]) {
                    return (
                        <>
                            {<div><span>{`${element}`}</span>{` : ${objx[element]}`}</div>}
                        </>
                    )
                } else if (element instanceof Object) {
                    for (const innerKey of element) {
                        if (Array.isArray(element[innerKey])) {
                            return (
                                <>
                                    {<div><span>{`${innerKey} : `}</span>{objx[innerKey].map((objinner, idxe) => <div key={`${innerKey}${idxe}`}><ShowDataRecursive obj={objinner} order={element[innerKey]} /></div>)}</div>}
                                </>
                            )
                        }

                    }
                }
            }
        } else if (objx) {
            for (const element in objx) {
                if (objx[element]) {
                    if (typeof objx[element] === "string") {
                        return (
                            <>
                                {<div><span>{`${element}`}</span>{` : ${objx[element]}`}</div>}
                            </>
                        )
                    }
                }
            }
        }
        return (
            <>
                {Object.keys(obj).length ? <div></div> : <div></div>}
            </>
        )
    }

    return (
        <>
            { }
        </>
    )
}