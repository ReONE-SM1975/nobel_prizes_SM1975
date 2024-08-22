import React,{useState, useEffect} from 'react';

function ShowTimePlusPlus({className}){
    
    const [theTime, setTheTime] = useState("");
    
    const SEC_MS = 1000;
    useEffect(()=>{
        function showTime(){
            let t = new Date();
            let hh = t.getHours() < 10 ? `0${t.getHours()}` : `${t.getHours()}`;
            let mm = t.getMinutes() < 10 ? `0${t.getMinutes()}` : `${t.getMinutes()}`;
            let ss = t.getSeconds() < 10 ? `0${t.getSeconds()}` : `${t.getSeconds()}`;
            return `${hh}:${mm}:${ss}`;
        }
        setTheTime(showTime())
        const interval = setInterval(()=>{setTheTime(showTime())},SEC_MS);
        
        return () => clearInterval(interval)
    },[])
    
    return (
        <>
            <div className={className}>{theTime}</div>
        </>
    )
}

export default ShowTimePlusPlus;