import React, { useState, useEffect } from 'react';
import Input from './Input';

export default function SearchBasicInput({ className, id, name, onChange, placeholder, blocktype = [], blockspecificinput = [] }) {
    const [searchInput, setSearchInput] = useState("");
    const [searchQueryName, setSearchQueryName] = useState("")

    function switchFilter(block, ele) {
        switch (block) {
            default:
                return false;
            case "digit":
                if (ele === " ") {
                    return false;
                }
                return (!isNaN(ele))
            case "alphabet":
                return ((/[a-zA-Z]/.test(ele)));
            case "space":
                return (ele === " ");
            case "comma":
                return (ele === ",");
            case "period":
                return (ele === ".");
            case "uppercase":
                return ((/[A-Z]/).test(ele));
            case "lowercase":
                return ((/[a-z]/).test(ele));
            case "others":
                if (blockspecificinput) {
                    // const allLength = blockspecificinput.map(word => word.length)

                    return (blockspecificinput.includes(ele))
                } else {
                    return false;
                }
        }
    }

    useEffect(() => {
        onChange((prev) => {
            return {
                ...prev,
                [searchQueryName]:searchInput
            }
        }
        )
    }, [searchQueryName, searchInput]);

    const handleOnChange = (e) => {
        const inputValue = e.target.value;
        console.log(`SearchInput_${e.target.name}:`, inputValue)
        setSearchQueryName(e.target.name)
        setSearchInput(() => {
            if (blocktype) {
                let result = [...inputValue]
                for (const block of blocktype) {
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