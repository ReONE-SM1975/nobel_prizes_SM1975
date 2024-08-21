import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/RandomWinner.css';

export default function RandomWinner() {
    const [winner, setWinner] = useState({});
    const [payload, setPayload] = useState({});
    const [returnData, setReturnData] = useState({});

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
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:8000/api/randomwinner/", payload)
                setReturnData(response.data);
            } catch (err) { console.error(err) }
        }
        fetchData();
        setWinner((prev) => {
            return {
                ...prev,
                "year": payload.year,
                "category": payload.category,
            }
        })
        console.log("payload:", payload)
    }, [payload]);

    useEffect(() => {
        setWinner((prev) => {
            if (returnData.prizes) {
                const { laureates } = returnData.prizes[0]
                if (laureates) {
                    const randomCandidate = getRandom(0, laureates.length - 1);
                    const winnerDetails = laureates[randomCandidate]
                    const winnerSurname = winnerDetails["surname"] ? winnerDetails["surname"] : "";
                    return {
                        ...prev,
                        'motivation': winnerDetails["motivation"],
                        'winner': `${winnerDetails["firstname"]} ${winnerSurname} `
                    }
                } else {
                    return {
                        ...prev,
                        'motivation': 'this year or category is undefined',
                        'winner': 'nobel prizes owner undefined'
                    }
                }

            } else {
                return {
                    ...prev,
                    "motivation": "Loading...",
                    "winner": "Loading..."
                }
            }
        })
        console.log("returnData:", returnData)
    }, [returnData]);

    useEffect(() => {
        console.log("winner:", winner)
    }, [winner])

    return (
        <>
            <h6 className="RandomWinner">
                {winner && `${winner["motivation"]} `}
                {<span>{winner && `${winner["winner"]}`}</span>}
                {`(${winner["year"]}) in `}{<span className="RandomWinner CatCapital">{`${winner["category"]}`}</span>}</h6>

        </>

    )

}