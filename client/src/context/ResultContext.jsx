import React, {createContext, useState, useEffect } from 'react';

import axios from 'axios';

export const ResultContext = createContext();

export default function ResultContextProvider({children}) {
    const [getInitialResult, setGetInitialResult] = useState([]) // data.prizes[0] is where it all located
    const [getResult, setGetResult] = useState([]);
    const [getSearchData, setGetSearchData] = useState({})

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await axios.get("/api/fullprizes/")
                setGetInitialResult(()=>{
                    const {data} = response;
                    if(data?.prizes){
                        return data.prizes
                    } else {
                        return {
                            "prizes":[]
                        }
                    }
                })
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    },[])
    /**
     * Set initial data as getResult
     */
    useEffect(()=>{
        setGetResult(getInitialResult)
    },[getInitialResult])

    /**
     * Handle getSetSearchData from searchofficial
     */
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.post("/api/searchofficial/", getSearchData)
                setGetResult(()=>{
                    const {data} = response;
                    if(data?.prizes){
                        return data.prizes
                    } else {
                        return []
                    }
                })
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    },[getSearchData])

    return (
        <ResultContext.Provider value={{getResult, getSearchData, setGetSearchData}}>
            {children}
        </ResultContext.Provider>
    )
}