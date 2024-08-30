import React, { useState, useEffect } from 'react';
import Input from './Input';
import Datalist from './Datalist';

export default function SearchCatInput({ className, id, name, onChange }) {
    const [showHints, setShowHints] = useState(false);
    const [searchCat, setSearchCat] = useState("");
    const [result, setResult] = useState({
        "category": ""
    })
    useEffect(() => {
        if (searchCat) {

        } else {
            setShowHints(false)
            setResult({ "category": "" })
        }
    }, [searchCat])
    const CATEGORY = {
        PHYSICS: "pyhsics",
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
            onChange={handleOnChange}
            placeholder="double click access list"
            list="catSearchList"
        />
            <Datalist list="catSearchList" options={options} />
            {showHints ? <p className="Cat_Hints">{`Only use ${options.map(option => option.item).join(" ,")}`}</p> : ""}
        </>

    )
}