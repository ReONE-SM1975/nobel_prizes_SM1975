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
                    setResult((prev) => {
                        if (Number(searchYear) < 1901) {
                            return { ...prev, "year": 1901 }
                        } else if (Number(searchYear) > new Date().getFullYear()) {
                            return { ...prev, "year": new Date().getFullYear() }
                        } else {
                            return { ...prev, "year": searchYear }
                        }
                        //writeSearchYear(prev, searchYear, "year");
                        setIncorrectTyping(false)
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
                        setResult(() => {
                            let start = Number(searchYear.slice(0, 4))
                            let end = Number(searchYear.slice(5, 9))
                            if (start > end) {
                                [start, end] = [end, start]
                            } else if (start === end) {
                                end = ""
                            }
                            return {
                                "year": start,
                                "yearTo": end
                            }
                        })
                    }
                }
            }

        } else {
            setIncorrectTyping(false)
            setResult({ "year": "", "yearTo": "" })
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