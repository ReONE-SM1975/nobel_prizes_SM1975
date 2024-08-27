import React, { useState, useEffect } from 'react';
import Input from './Input';

export default function SearchYearInput({ className, name, id, patten, placeholder, maxLength, onChange }) {
    const [submitAttempt, setSubmitAttempt] = useState(false)
    const [searchYear, setSearchYear] = useState("");
    const [result, setResult] = useState({
        "year": "",
        "yearTo": "",
    })
    function handleOnChange(e) {
        setSearchYear(e.target.value)
        if (searchYear) {

        }
        onChange(e.target.value)

    }

    return (
        <>
            <Input className="SearchTextBar" name="year" id="year" pattern={`[0-9]{4}-[0-9]{4}`} placeholder={'YYYY or YYYY-YYYY'} maxLength={"9"} onChange={handleOnChange} />
            {submitAttempt && searchYear && <p className="SearchYear__Warning">{`Warning: search year required years in the form of YYYY or YYYY-YYYY format`}</p>}
        </>
    )
}