import React, { useState, useEffect } from 'react';
import Input from './Input';

export default function SearchBasicInput({ className, id, name, onChange, placeholder, blocktype, blockspecificinput=[] }) {
    const [searchInput, setSearchInput] = useState("");
    const [result, setResult] = useState({});
    const blockInput = ['digit', 'alphabet', 'uppercase', 'lowercase', 'capital', 'space', 'comma', 'period', 'special_character', 'others']


    // Test constant
    const [data , setData ] = useState({
        "year":"1984",
        "yearTo": "1994",
        "category":"physics",
        "firstname":"John",
        "surname":"Doe",
        "city":"London",
        "country":"England",
        "keyword":"Tee",
        "id":"",
        "idTo":""
    })
    useEffect(()=>{

    },[searchInput])
    useEffect(() => {
        console.log(result);
        onChange(result)
    }, [result]);

    const handleOnChange = (e) => {
        const inputValue = e.target.value;
        setSearchInput((prev) => {
            return {
                ...prev,
                [e.target.name] : inputValue
            }    
        })
        setData((prev)=>{
            return {
                ...prev,
                [e.target.name] : inputValue
            }
        })
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