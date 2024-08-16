import React, { useState, useEffect } from "react";
import axios from "axios";



export default function RandomWinner() {
    const [winner, setWinner] = useState([]);
    const [prizes, setPrizes] = useState({});
    const [payload, setPayload] = useState({});
    const [returnData, setReturnData] = useState({})

    function getRandom(min, max) {
        if (min > max) {
            [min, max] = [max, min];
        } else if (min === max) {
            return max;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



    useEffect(() => {
        const categories = [
            "physics",
            "chemistry",
            "peace",
            "medicine",
            "economics",
            "literature"
        ]
        setPayload({
            "year": `${getRandom(1901, new Date().getFullYear() - 1)}`,
            "category": `${categories[getRandom(0, categories.length - 1)]}`,
        })
    }, [])
    useEffect(() => {
        // axios.post("http://localhost:8000/api/randomwinner/", payload).then(response => {
        //     setReturnData(response.data);
        //     setWinner(response.data.laureates[getRandom(0, response.data.laureates.length)])
        // }).catch(error => console.error(error))

        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:8000/api/randomwinner/", payload);
                setReturnData(response.data);
                setPrizes(returnData.prizes);
                if (response.data.prizes.laureates.length > 1) {
                    setWinner(response.data.prizes.laureates[getRandom(0, response.data.prizes.laureates.length - 1)])
                } else {
                    setWinner(response.data.prizes.laureates[0])
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
        console.log(prizes ? prizes : undefined)
        console.log(returnData ? returnData : undefined)
        console.log(winner ? winner : undefined)
    }, [])


    return (
        <>
            <h4>{returnData && `${winner["motivation"]} `} <span>{returnData && `${winner["firstname"]} ${winner["surname"] ? winner["surname"] : ""}`}</span> {`(${payload["year"]}) in ${payload["category"]}`}</h4>

        </>

    )

}