import React, { useState, useEffect } from 'react';
import Input from './Input';

export default function SearchBasicInput({ className, id, name, onChange, placeholder, blocktype = [], blockspecificinput = [] }) {
    const [searchInput, setSearchInput] = useState("");
    const [result, setResult] = useState({});
    const blockInput = ['digit', 'alphabet', 'uppercase', 'lowercase', 'space', 'comma', 'period', 'others']


    // Test constant
    const [data, setData] = useState({
        "year": "1984",
        "yearTo": "1994",
        "category": "physics",
        "firstname": "John",
        "surname": "Doe",
        "city": "London",
        "country": "England",
        "keyword": "Tee",
        "id": "",
        "idTo": ""
    })

    function switchFilter(block, ele) {
        switch (block) {
            default:
                return false
            case "digit":
                if (ele === " ") {
                    return false
                }
                return (!isNaN(ele))
            case "alphabet":
                return ((/[a-zA-Z]/.test(ele)))
            case "space":
                return (ele === " ")
            case "comma":
                return (ele === ",")
            case "period":
                return (ele === ".")
            case "uppercase":
                return (ele.toUpperCase() === ele)
            case "lowercase":
                if ((/[a-z]/).test(ele)) {
                    return true
                }
                return (ele.toLowerCase() === ele)
            case "others":
                if (blockspecificinput) {
                    // const allLength = blockspecificinput.map(word => word.length)

                    return (blockspecificinput.includes(ele))
                } else {
                    return (ele)
                }
        }





    }
    useEffect(() => {

    }, [])
    useEffect(() => {


    }, [searchInput]);

    useEffect(() => {
        console.log(result);
        onChange((prev) => {
            return {
                ...prev,
                result
            }
        }
        )
    }, [result]);

    const handleOnChange = (e) => {
        const inputValue = e.target.value;
        console.log(`SearchInput_${e.target.name}:`, inputValue)
        setSearchInput(() => {
            if (blocktype) {
                let result = [...inputValue]
                for (const block of blocktype) {
                    console.log("block: ", block)
                    result = result.filter((ele) => {
                        if (switchFilter(block, ele)) {
                            return "";
                        } else {
                            return ele;
                        }
                    })
                }
                return result.join("")
            }
            return inputValue;

        })
        console.log(searchInput)
        setData((prev) => {
            return {
                ...prev,
                [e.target.name]: inputValue
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