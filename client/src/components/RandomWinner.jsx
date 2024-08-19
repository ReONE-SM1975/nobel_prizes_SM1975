import React, { useState, useEffect } from "react";
import axios from "axios";

// const ACTION = {
//     WINNER : 'winner',
//     PAYLOAD : 'payload',
//     RETURNDATA: 'returnData',
//     RANDOMLAUREATES: 'randomLaureates'
// }


// function reducer (state, action) {
    

//     switch (action.type){
//         default:
//             return state;
//         case ACTION.RETURNDATA:
//             const fetch = "http://localhost:8000/api/randomwinner/"
//             const response = await axios.post(fetch, payload)
//             return { returnData : response }
//     }
// }



export default function RandomWinner() {
    const [prizes, setPrizes] = useState([])
    const [winner, setWinner] = useState({});
    const [payload, setPayload] = useState({});
    const [returnData, setReturnData] = useState({});
    const [randomLaureates, setRandomLaureates] = useState(0);

 /*   const [state, dispatch] = useReducer(reducer, {
        winner: {},
        payload: {},
        returnData: {},
        randomLaureates: 0,
        error: null,
    }) */

/*    function handleUpdates(){
        dispatch({type: ACTION.RETURNDATA})
    } */

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
        
    }, [payload])
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.post("http://localhost:8000/api/randomwinner/", payload)
                setReturnData(response.data);
            } catch(err) {console.error(err)}
        }
        fetchData();
        
    },[payload])
    // useEffect(() => {

    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.post("http://localhost:8000/api/randomwinner/", payload);
    //             setReturnData(response.data)
    //             setPrizes(response.data.prizes[0])
    //             console.log(returnData)
    //             //console.log("returnData.prizes:", returnData.prizes)
    //             // setRandomLaureates(returnData.prizes[0].laureates.length > 0 ? getRandom(0, returnData.prizes[0].laureates.length - 1) : -1)
    //             // setWinner(randomLaureates !== -1 ? returnData.prizes[0].laureates[randomLaureates] : { "id": "N/A", "year": `${payload.year}`, "category": `${payload.category}`, "motivation": "There is no nobel prizes at this category and year", "firstname": "N/A", "laureates": "N/A" })
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     fetchData();
    //     console.log("payload:", payload)

    //     // console.log("returnData:", returnData ? returnData : undefined)
    // }, [payload])

    useState(() => {
        const runUpdate = (p={"laureates":""}) => {
        
                if (p.laureates.length){
                    setWinner(p.laureates[getRandom(0,p.laureates.length -1)])
                } else {
                    setWinner({"year":`${payload.year}`, "category":`${payload.category}`, "motivation":"No Prize at this category in this year", "firstname":"N/A"})
                }

           
        }
        
        runUpdate(returnData.prizes[0]);
        console.log("winner:", winner)
            
        
   }, [returnData,payload])

    return (
        <>
            <h4>
                {winner && `${winner["motivation"]} `}
                {<span>{winner && `${winner["firstname"]} ${winner["surname"] ? winner["surname"] : ""}`}</span>}
                {`(${payload["year"]}) in ${payload["category"]}`}</h4>

        </>

    )

}