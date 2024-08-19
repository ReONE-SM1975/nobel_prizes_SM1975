import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RandomWinner() {
    const [winner, setWinner] = useState({});
    const [payload, setPayload] = useState({});
    const [returnData, setReturnData] = useState({})
    const [randomLaureates, setRandomLaureates] = useState(0)

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

        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:8000/api/randomwinner/", payload);
                setReturnData(response.data)
                console.log(returnData.prizes[0])
                setRandomLaureates(returnData.prizes[0].laureates.length > 0 ? getRandom(0, returnData.prizes[0].laureates.length - 1) : -1)
                setWinner(randomLaureates !== -1 ? returnData.prizes[0].laureates[randomLaureates] : { "id": "N/A", "year": `${payload.year}`, "category": `${payload.category}`, "motivation": "There is no nobel prizes at this category and year", "firstname": "N/A", "laureates": "N/A" })
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
        console.log("payload:", payload)
        console.log("winner:", winner)
        // console.log("returnData:", returnData ? returnData : undefined)
    }, [payload])

    return (
        <>
            <h4>
                {winner && `${winner["motivation"]} `}
                {<span>{winner && `${winner["firstname"]} ${winner["surname"] ? winner["surname"] : ""}`}</span>}
                {`(${payload["year"]}) in ${payload["category"]}`}</h4>

        </>

    )

}