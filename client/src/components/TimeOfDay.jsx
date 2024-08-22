import React, { useEffect, useState } from 'react';
import getRandom from '../utils/utils.js'

export default function TimeOfDay({className}) {
    const [greetingMessage, setGreetingMessage] = useState({})

    const MIN_MS = 60000;
    useEffect(() => {
        function handleGreetingMessage(){
            const greetings = [
                "How is it going?",
                "How are you today?",
                "Greetings.",
                "Good day!",
                "Welcome!",
                "Hi.",
                "Hello.",
                "At your service.",
                "What are the goosip today?",
            ];
            const period = [
                "Good night!",
                "Good morning!",
                "Good afternoon!",
                "Good evening!",
            ];
        
            const Months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];
        
            function supth(dd) {
                const special = [1, 2, 3, 21, 22, 23, 31]
                if (special.includes(dd)) {
                    if (dd === 1 || dd === 21 || dd === 31) {
                        return "st";
                    } else if (dd === 2 || dd === 22) {
                        return "nd";
                    } else if (dd === 3 || dd === 23) {
                        return "rd";
                    }
                } else {
                    return "th";
                }
            }
        
            function getTimeOfDay(hh, mm) {
                if (hh < 4 || hh >= 21) {
                    return period[0];
                } else if (hh >= 4 && hh < 12) {
                    return period[1];
                } else if (hh >= 12 && hh < 17) {
                    return period[2];
                } else if (hh >= 17 && hh < 20) {
                    return period[3];
                } else if (hh === 20) {
                    if (mm < 30) {
                        return period[3];
                    } else if (mm >= 30) {
                        return period[0];
                    }
                } else {
                    return "error: Check getTimeOfDay Code"
                }
            }
            setGreetingMessage((prev = {}) => {
                let t = new Date();
                let greetingMessage = greetings[getRandom(0, greetings.length - 1)];
                let theTimeOfDay = getTimeOfDay(t.getHours(),t.getMinutes());
                return {
                    ...prev,
                    "TimeOfDay": theTimeOfDay,
                    "greeting": greetingMessage,
                    "day": t.getDate(),
                    "supth": supth(t.getDate()),
                    "month": Months[t.getMonth()],
                    "year" : t.getFullYear(),
                }
            })
        }
        handleGreetingMessage();
        const interval = setInterval(() => {
            handleGreetingMessage()
        }, MIN_MS)
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        console.log("TimeOfDay:",`[${new Date().getTime()}]`,greetingMessage)

    }, [greetingMessage]);

    
    return (
        <>
            <div className={`TimeOfDay ${className}`}>
                {greetingMessage && `${greetingMessage.TimeOfDay} ${greetingMessage.greeting} Today is ${greetingMessage.day}`}<sup>{`${greetingMessage.supth}`}</sup>{` ${greetingMessage.month} ${greetingMessage.year}.`}</div>
        </>
    )
}