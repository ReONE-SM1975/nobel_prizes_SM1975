import React from 'react';
import Input from './Input';
import Datalist from './Datalist';

export default function SearchCatInput({ className, id, name, onChange }) {

    const CATAGORY = {
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
            "item": CATAGORY.PHYSICS
        },
        {
            "id": "catList2",
            "item": CATAGORY.CHEMISTRY
        },
        {
            "id": "catList3",
            "item": CATAGORY.ECONOMICS
        },
        {
            "id": "catList4",
            "item": CATAGORY.LITERATURE
        },
        {
            "id": "catList5",
            "item": CATAGORY.PEACE
        },
        {
            "id": "catList6",
            "item": CATAGORY.MEDICINE
        }
    ]


    return (
        <><Input
            className={`${className}`}
            id={id}
            name={name}
            // onChange(onChange)
            placeholder="double click access list"
            list="catSearchList"
        />
            <Datalist list="catSearchList" options={options} />
        </>

    )
}