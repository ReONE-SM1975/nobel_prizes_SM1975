import React,{useState, useEffect} from 'react';
//import Input from './Input';

function ShowTimePlusPlus(className){
    let t = new Date();
    const [theTime, setTheTime] = useState("");
    function showTime(){
        let hh = t.getHours() < 10 ? `0${t.getHours()}` : `${t.getHours()}`;
        let mm = t.getMinutes() < 10 ? `0${t.getMinutes()}` : `${t.getMinutes()}`;
        let ss = t.getSeconds() < 10 ? `0${t.getSeconds()}` : `${t.getSeconds()}`;
        return `${hh}:${mm}:${ss}`;
    }
    const SEC_MS = 1000;
    useEffect(()=>{
        const interval = setInterval(()=>{setTheTime(showTime())},SEC_MS);
        //console.log("theTime: ", theTime)
        return () => clearInterval(interval)
    },[theTime])
    
    return (
        <>
            <div className={className}>{theTime}</div>
        </>
    )
}

export default ShowTimePlusPlus;