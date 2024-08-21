import React, { useEffect, useState } from 'react';
import getRandom from '../utils/utils.js'

export default function TimeOfDay(className) {

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
    let t = new Date();
    const [date, setTheDate] = useState(0)
    const [hour, setTheHours] = useState(0)
    const [min, setTheMinutes] = useState(0)
    const [month, setTheMonth] = useState(0)
    const [year, setTheYear] = useState(0)
    const [greetingMessage, setGreetingMessage] = useState("")

    useEffect(() => {
        setTheDate(t.getDate());
        setTheHours(t.getHours());
        setTheMinutes(t.getMinutes());
        setTheMonth(t.getMonth());
        setTheYear(t.getFullYear());
        console.log(`hours: `, hour, ` min: `, min, ` Date: `, date);
    }, [min]);

    const MIN_MS = 60000;
    useEffect(() => {
        const interval = setInterval(() => {
            setTheMinutes(t.getMinutes())
        }, MIN_MS)
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {

        setGreetingMessage((prev = "") => {
            let randomGreetingNum = getRandom(0, greetings.length - 1)
            return greetings[randomGreetingNum]
        })

    }, [min]);

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
    return (
        <>
            <div className={`TimeOfDay ${className}`}>
                {`${getTimeOfDay(hour, min)} ${greetingMessage} Today is ${date}`}<sup>{`${supth(date)}`}</sup>{` ${Months[month]} ${year}.`}</div>
        </>
    )
}