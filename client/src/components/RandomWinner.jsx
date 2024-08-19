import React, { useState, useEffect } from "react";
import axios from "axios";



export default function RandomWinner() {
    const [winner, setWinner] = useState([]);
    //const [prizes, setPrizes] = useState({});
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
        // axios.post("http://localhost:8000/api/randomwinner/", payload).then(response => {
        //     setReturnData(response.data);
        //     setWinner(response.data.laureates[getRandom(0, response.data.laureates.length)])
        // }).catch(error => console.error(error))

        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:8000/api/randomwinner/", payload);
                setReturnData(response.data) && returnData && setRandomLaureates(response.data.prizes.laureates.length > 0 ? getRandom(0, response.data.prizes.laureates.length - 1) : -1) && setWinner(response.data.laureates[randomLaureates])
                // IT DOES NOT RUN BEYOND response.data !!!!!!!!!! 
                // setPrizes(response.data.prizes);
                // if (response.data.prizes.laureates.length > 0) {
                //     setWinner(response.data.prizes.laureates[getRandom(0, response.data.prizes.laureates.length - 1)])
                // } else {
                //     // setWinner(response.data.prizes.laureates[0])
                //     setWinner({ "motivation": "There is no nobel prizes at this category and year", "firstname": "N/A" })
                // }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
        //console.log(prizes ? prizes : undefined)
        console.log("returnData:", returnData ? returnData : undefined)
        console.log("winner:", winner ? winner : undefined)
    }, [payload])

    useEffect(() => {
        setWinner(winner)
    }, [returnData])


    return (
        <>
            <h4>
                {returnData && `${returnData.prizes.laureates[getRandom(0, returnData.prizes.laureates.length - 1)]["motivation"]} `}
                <span>{returnData && `${winner["firstname"]} ${winner["surname"] ? winner["surname"] : ""}`}</span>
                {`(${payload["year"]}) in ${payload["category"]}`}</h4>

        </>

    )

}