import React, { useState } from 'react';
import Input from './Input';
import '../styles/SearchYearInput.css';

export default function SearchYearInput({ className, name, id, onChange }) {
    //const [typing, setTyping] = useState(false);
    const [incorrectTyping, setIncorrectTyping] = useState(false);
    const [searchYear, setSearchYear] = useState("");
    const [result, setResult] = useState({
        "year": "",
        "yearTo": "",
    })

    function writeSearchYear(init, year, key) {
        year = isNaN(Number(year)) ? year : Number(year)
        if (Number(year) < 1901) {
            return { ...init, [key]: 1901 }
        } else if (Number(year) > new Date().getFullYear()) {
            return { ...init, [key]: new Date().getFullYear() }
        } else {
            return { ...init, [key]: year }
        }
    }

    function handleOnChange(e) {
        setSearchYear(() => { return e.target.value })
        if (searchYear) {
            if (searchYear.length < 4) {
                setIncorrectTyping(true)
            } else if (searchYear.length === 4) {
                if (isNaN(Number(searchYear))) {
                    setIncorrectTyping(true)
                } else {
                    setIncorrectTyping(false)
                    setResult((prev) => {
                        if (Number(searchYear) < 1901) {
                            return { ...prev, "year": 1901 }
                        } else if (Number(searchYear) > new Date().getFullYear()) {
                            return { ...prev, "year": new Date().getFullYear() }
                        } else {
                            return { ...prev, "year": Number(searchYear) }
                        }
                        //writeSearchYear(prev, searchYear, "year");
                    })
                }
            } else if (searchYear.length < 9) {
                setIncorrectTyping(true)
            } else if (searchYear.length === 9) {
                if (searchYear[4] !== "-") {
                    setIncorrectTyping(true)
                } else {
                    if (isNaN(Number(searchYear.slice(0, 4))) || isNaN(Number(searchYear.slice(5, 9)))) {
                        setIncorrectTyping(true)
                        setResult({ "year": "", "yearTo": "" })
                    } else {
                        setIncorrectTyping(false)
                        setResult((prev) => {
                            let start = Number(searchYear.slice(0, 4))
                            let end = Number(searchYear.slice(5, 9))

                            if (start > end) {
                                [start, end] = [end, start]
                            } else if (start === end) {
                                end = ""
                            }


                            // writeSearchYear(prev, start, "year")
                            //writeSearchYear(prev, end, "yearTo")
                            return {
                                ...prev,
                                "year": start,
                                "yearTo": end
                            }
                        })
                    }
                }
            }

        } else {
            setIncorrectTyping(false)
            setResult(prev => ({ ...prev, "year": "", "yearTo": "" }))
        }
        console.log(result)
        onChange(result)

    }

    return (
        <>
            <Input
                className={className}
                name={name}
                id={id}
                pattern={`[0-9]{4}-[0-9]{4}`}
                placeholder={'YYYY or YYYY-YYYY'}
                maxLength={"9"}
                onChange={handleOnChange}
            /><br />
            {searchYear && incorrectTyping && <p className="SearchYear__Warning">{`Hint: search year required years in the form of YYYY or YYYY-YYYY format`}</p>}
        </>
    )
}