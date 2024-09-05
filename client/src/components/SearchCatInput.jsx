import React, { useState, useEffect } from 'react';
import Input from './Input';
import '../styles/SearchCatInput.css';

export default function SearchCatInput({ className, list, id, name, onChange }) {
    const [showHints, setShowHints] = useState(false);
    const [searchCat, setSearchCat] = useState("");
    const [result, setResult] = useState({
        "category": ""
    })
    const [options, setOptions] = useState([])

    useEffect(() => {
        const CATEGORY = {
            PHYSICS: "physics",
            CHEMISTRY: "chemistry",
            MEDICINE: "medicine",
            ECONOMICS: "economics",
            LITERATURE: "literature",
            PEACE: "peace"
        }
        const opts = [
            {
                "id": "catList1",
                "item": CATEGORY.PHYSICS
            },
            {
                "id": "catList2",
                "item": CATEGORY.CHEMISTRY
            },
            {
                "id": "catList3",
                "item": CATEGORY.ECONOMICS
            },
            {
                "id": "catList4",
                "item": CATEGORY.LITERATURE
            },
            {
                "id": "catList5",
                "item": CATEGORY.PEACE
            },
            {
                "id": "catList6",
                "item": CATEGORY.MEDICINE
            }
        ]
        setOptions(() => {
            return opts.map(option => option.item)
        })
    }, [])

    useEffect(() => {
        if (searchCat) {
            setResult(() => {
                if (options.includes(searchCat)) {
                    setShowHints(false)
                    return { "category": searchCat }
                } else {
                    setShowHints(true)
                    return {
                        "category": ""
                    }
                }
            })
        } else {
            setShowHints(false)
            setResult({ "category": "" })
        }
    }, [searchCat, options]);

    useEffect(() => {
        onChange(result)
    }, [result]);

    function handleOnChange(e) {
        const inputValue = e.target.value;
        const regex = /[a-z]/
        const nonCharFilterFn = (ele) => {
            if (regex.test(ele)) {
                return ele;
            } else {
                return "";
            }

        }
        setSearchCat(() => {
            const sample = [...inputValue];
            const result = sample.filter(nonCharFilterFn).join("");
            return result;
        })
    }

    return (
        <>
            <Input
                className={`${className}`}
                id={id}
                name={name}
                text={searchCat}
                onInput={handleOnChange}
                placeholder="double click access list"
                list={list}
                options={options}
            />
            {showHints && <div className="Cat_Hints">{`Use only one if the following category:`}</div>}
            {showHints && <div className="Cat_Options">{`${options.join(", ")}`}</div>}




        </>

    )
}