import React, { useState, useEffect } from 'react';

export default function ShowDataRecursive({ obj, order }) {
    const [dataResult, setDataResult] = useState({})
    useEffect(() => {

        setDataResult((prev) => {
            if (obj["firstname"]) {
                if (obj["surname"]) {
                    return {
                        ...prev,
                        "fullname": `${obj['firstname']} ${obj['surname']}`
                    }
                }
                return {
                    ...prev,
                    "fullname": `${obj['firstname']}`
                }
            }
        })
    }, [obj])


    return (
        <>
            { }
        </>
    )
}