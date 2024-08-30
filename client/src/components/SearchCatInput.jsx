import React, { useState, useEffect } from 'react';
import Input from './Input';
import Datalist from './Datalist';

export default function SearchCatInput({ className, list, id, name, onChange }) {
    const [showHints, setShowHints] = useState(true);
    const [searchCat, setSearchCat] = useState("");
    const [result, setResult] = useState({
        "category": ""
    })
    useEffect(() => {
        if (searchCat) {
            setResult({"category":searchCat})
        } else {
            setShowHints(false)
            setResult({ "category": "" })
        }
    }, [searchCat]);
    useEffect(()=>{
        onChange(result)
    },[result])
    const CATEGORY = {
        PHYSICS: "physics",
        CHEMISTRY: "chemistry",
        MEDICINE: "medicine",
        ECONOMICS: "economics",
        LITERATURE: "literature",
        PEACE: "peace"
    }
    /**
     * "physics",
        "chemistry",
        "medicine",
        "economics",
        "literature",
        "peace"
     */

    const options = [
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
    function handleOnChange(e) {
        const inputValue = e.target.value
        setSearchCat(inputValue)
    }

    return (
        <><Input
            className={`${className}`}
            id={id}
            name={name}
            text={searchCat}
            onChange={handleOnChange}
            placeholder="double click access list"
            list={list}
        />
            <Datalist id={list} options={options} />
            {showHints ? <p className="Cat_Hints">{`Only use one category: ${options.map(option => option.item).join(",")}`}</p> : ""}
        </>

    )
}