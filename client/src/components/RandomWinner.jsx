import React, { useState, useEffect } from "react";
import axios from "axios";



export default function RandomWinner() {
    // const [randomNum, setRandomNum] = useState(0);
    const [winner, setWinner] = useState([]);
    const [payload, setPayload] = useState({});
    const [returnData, setReturnData] = useState([])

    function getRandom(min, max) {
        if (min > max) {
            [min, max] = [max, min];
        } else if (min === max) {
            return max;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const categories = [
        "physics",
        "chemistry",
        "peace",
        "medicine",
        "economics",
        "literature"
    ]

    useEffect(() => {
        setPayload({
            "year": `${getRandom(1901, new Date().getFullYear() - 1)}`,
            "category": `${categories[getRandom(0, categories.length)]}`,
        })
        axios.get("http://localhost:8000/api/fullprizes", payload).then(response => {
            setReturnData(response.data);
            setWinner(response.data.laureates[getRandom(0, response.data.laureates.length)])
        }).catch(error => console.error(error))

    }, [])
    return (
        <>
            <h4>{`${winner["motivation"]} ${winner["firstname"]} ${winner["surname"] ? winner["surname"] : ""} (${payload["year"]}) in ${payload["category"]}`}</h4>
        </>

    )

}