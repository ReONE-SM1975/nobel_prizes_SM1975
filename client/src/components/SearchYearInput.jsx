import React, { useState, useEffect } from 'react';
import Input from './Input';
import '../styles/SearchYearInput.css';

export default function SearchYearInput({ className, name, id, onChange }) {
    //const [typing, setTyping] = useState(false);
    const [showHints, setShowHints] = useState(false)
    // const [incorrectTyping, setIncorrectTyping] = useState(false);
    const [searchYear, setSearchYear] = useState("");
    const [result, setResult] = useState({
        "year": "",
        "yearTo": "",
    })

    useEffect(() => {
        if (searchYear) {
            if (searchYear.length < 4) {
                setShowHints(true)
                setResult({ "year": "", "yearTo": "" })
            } else if (searchYear.length === 4) {
                if (isNaN(Number(searchYear))) {
                    setShowHints(true)
                    setResult({ "year": "", "yearTo": "" })
                } else {
                    setShowHints(false)
                    setResult(() => {
                        if (Number(searchYear) < 1901) {
                            return { "year": 1901, "yearTo": "" }
                        } else if (Number(searchYear) > new Date().getFullYear()) {
                            return { "year": new Date().getFullYear(), "yearTo": "" }
                        } else {
                            return { "year": Number(searchYear), "yearTo": "" }
                        }
                        //writeSearchYear(prev, searchYear, "year");
                    })
                }
            } else if (searchYear.length > 4 && searchYear.length < 9) {
                setShowHints(true)
                setResult((prev) => ({ ...prev, "yearTo": "" }))
            } else if (searchYear.length === 9) {
                if (searchYear[4] !== "-") {
                    setShowHints(true)
                    setResult({ "year": "", "yearTo": "" })
                } else {
                    const temp = searchYear.split("-")
                    if (isNaN(Number(temp[0])) || isNaN(Number(temp[1]))) {
                        setShowHints(true)
                        setResult({ "year": "", "yearTo": "" })
                    } else { // NOR: False && False = True
                        setShowHints(false)
                        setResult(() => {
                            let start = Number(temp[0])
                            let end = Number(temp[1])
                            if (start < 1901) {
                                start = 1901;
                            } else if (start > new Date().getFullYear()) {
                                start = new Date().getFullYear();
                            }

                            if (end > new Date().getFullYear()) {
                                end = new Date().getFullYear();
                            } else if (end < 1901) {
                                end = 1901;
                            }

                            if (start > end) {
                                return {
                                    "year": end,
                                    "yearTo": start
                                }
                            } else if (start === end) {
                                return {
                                    "year": start,
                                    "yearTo": ""
                                }
                            } else {
                                return {
                                    "year": start,
                                    "yearTo": end
                                }
                            }


                            // writeSearchYear(prev, start, "year")
                            //writeSearchYear(prev, end, "yearTo")

                        })
                    }
                }
            }

        } else {
            setShowHints(false)
            setResult({ "year": "", "yearTo": "" })
        }
    }, [searchYear])



    useEffect(() => {
        console.log(result)
        onChange(result)
    }, [result])

    // function writeSearchYear(init, year, key) {
    //     year = isNaN(Number(year)) ? year : Number(year)
    //     if (Number(year) < 1901 || isNaN(year)) {
    //         return { ...init, [key]: 1901 }
    //     } else if (Number(year) > new Date().getFullYear()) {
    //         return { ...init, [key]: new Date().getFullYear() }
    //     } else {
    //         return { ...init, [key]: year }
    //     }
    // }

    function handleOnChange(e) {
        setSearchYear(() => { return e.target.value })
        // if (searchYear) {
        //     if (searchYear.length < 4) {
        //         setIncorrectTyping(true)
        //         setResult({ "year": "", "yearTo": "" })
        //     } else if (searchYear.length === 4) {
        //         if (isNaN(Number(searchYear))) {
        //             setIncorrectTyping(true)
        //             setResult({ "year": "", "yearTo": "" })
        //         } else {
        //             setIncorrectTyping(false)
        //             setResult(() => {
        //                 if (Number(searchYear) < 1901) {
        //                     return { "year": 1901, "yearTo": "" }
        //                 } else if (Number(searchYear) > new Date().getFullYear()) {
        //                     return { "year": new Date().getFullYear(), "yearTo": "" }
        //                 } else {
        //                     return { "year": Number(searchYear), "yearTo": "" }
        //                 }
        //                 //writeSearchYear(prev, searchYear, "year");
        //             })
        //         }
        //     } else if (searchYear.length > 4 && searchYear.length < 9) {
        //         setIncorrectTyping(true)
        //         setResult((prev) => ({ ...prev, "yearTo": "" }))
        //     } else if (searchYear.length === 9) {
        //         if (searchYear[4] !== "-") {
        //             setIncorrectTyping(true)
        //             setResult({ "year": "", "yearTo": "" })
        //         } else {
        //             const temp = searchYear.split("-")
        //             if (isNaN(Number(temp[0])) || isNaN(Number(temp[1]))) {
        //                 setIncorrectTyping(true)
        //                 setResult({ "year": "", "yearTo": "" })
        //             } else { // NOR: False && False = True
        //                 setIncorrectTyping(false)
        //                 setResult(() => {
        //                     let start = Number(temp[0])
        //                     let end = Number(temp[1])
        //                     if (start < 1901) {
        //                         start = 1901;
        //                     } else if (start > new Date().getFullYear()) {
        //                         start = new Date().getFullYear();
        //                     }

        //                     if (end > new Date().getFullYear()) {
        //                         end = new Date().getFullYear();
        //                     } else if (end < 1901) {
        //                         end = 1901;
        //                     }

        //                     if (start > end) {
        //                         return {
        //                             "year": end,
        //                             "yearTo": start
        //                         }
        //                     } else if (start === end) {
        //                         return {
        //                             "year": start,
        //                             "yearTo": ""
        //                         }
        //                     } else {
        //                         return {
        //                             "year": start,
        //                             "yearTo": end
        //                         }
        //                     }


        //                     // writeSearchYear(prev, start, "year")
        //                     //writeSearchYear(prev, end, "yearTo")

        //                 })
        //             }
        //         }
        //     }

        // } else {
        //     setIncorrectTyping(false)
        //     setResult({ "year": "", "yearTo": "" })
        // }
        // console.log(result)
        // onChange(result)

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
            {showHints && <p className="SearchYear__Warning">{`Hint: search year required years in the form of YYYY or YYYY-YYYY format`}</p>}
        </>
    )
}