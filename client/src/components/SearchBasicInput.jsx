import React, { useState, useEffect } from 'react';
import Input from './Input';

export default function SearchBasicInput({ className, id, name, onChange, placeholder, allowNumber = true, allowSpace = true, allowChar = true, allowSpecial = true }) {
    const [searchInput, setSearchInput] = useState("");
    const [result, setResult] = useState({});

    useEffect(() => {
        console.log(result);
        onChange(result)
    }, [result]);

    const handleOnChange = (e) => {
        const inputValue = e.target.value;
        setSearchInput()
    }
    return (
        <>
            <Input className={className}
                id={id}
                name={name}
                onChange={handleOnChange}
                text={searchInput}
                placeholder={placeholder}
            />
        </>
    )
}