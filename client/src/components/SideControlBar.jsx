import React, { useState } from 'react';

import Input from "../components/Input";
import Button from "../components/Button";
import DropDownDataList from "./DropDownDataList";
import SearchYearInput from "./SearchYearInput";


import "../styles/SideControlBar.css";

const categories = [
    "physics",
    "chemistry",
    "medicine",
    "economics",
    "literature",
    "peace"
]

export default function SideControlBar() {
    const [searchData, setSearchData] = useState({
        "year": "",
        "yearTo": "",
        "category": "",
        "firstname": "",
        "surname": "",
        "country": "",
        "city": "",
        "affiliation": "",
        "id": "",
        "idTo": "",
        "keywords": "",
    })
    const [searchYear, setSearchYear] = useState({});
    const [searchYearTo, setSearchYearTo] = useState("");
    const [searchCat, setSearchCat] = useState("");
    const [searchFirstName, setSearchFirstName] = useState("");
    const [searchSurname, setSearchSurname] = useState("");
    const [searchCountry, setSearchCountry] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [searchAffilation, setSearchAffilation] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const [searchYearContainer, setSearchYearContainer] = useState([]);
    const [attempttedSubmit, setAttempttedSubmit] = useState(false);

    const handleSearchYear = (e) => {
        e.preventDefault();
        // setSearchYear(e.target.value);
    }

    const handleSearchCat = (e) => {
        e.preventDefault();
        // setSearchCat(e.target.value);
    }

    const handleSearchFirstName = (e) => {
        e.preventDefault();
        // setSearchFirstName(e.target.value);
    }

    const handleSearchSurname = (e) => {
        e.preventDefault();
        // setSearchSurname(e.target.value);
    }

    const handleSearchCountry = (e) => {
        e.preventDefault();
        // setSearchCountry(e.target.value);
    }

    const handleSearchCity = (e) => {
        // e.preventDefault();
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        console.log(searchData)
        // if (searchYear) {
        //     if (searchYear.length < 4) {
        //         setAttempttedSubmit(true)
        //     } else if (searchYear.length === 4) {
        //         if (isNaN(searchYear)) {
        //             setAttempttedSubmit(true)
        //         } else {
        //             /* 
        //             send search year request to nobel prize
        //             */
        //             setAttempttedSubmit(false)
        //         }
        //     } else if (searchYear.length < 9) {
        //         setAttempttedSubmit(true)
        //     } else if (searchYear.length === 9) {
        //         if (searchYear[4] !== '-') {
        //             setAttempttedSubmit(true);
        //         } else {
        //             setSearchYearContainer(searchYear.split("-"))
        //             /**
        //              * searchYearContainer[0] will be the year where start of range be
        //              */
        //             setAttempttedSubmit(false)
        //             if (isNaN(searchYearContainer[0]) || isNaN(searchYearContainer[1])) {
        //                 setAttempttedSubmit(true);
        //             } else {
        //                 setSearchYearTo(searchYearContainer[1])
        //                 /**
        //                  * send search year and yearto request to nobel prize 
        //                  */
        //                 setAttempttedSubmit(false)

        //             }
        //         }
        //     }

        // }
    }
    function handleYearOnChange(obj) {
        setSearchData((prev) => {
            const result = { ...prev }
            for (const key in obj) {
                if (obj[key]) {
                    result[key] = obj[key]
                }
            }
            return result
        })
    }

    return (
        <div className="SideControlBar">
            {"Search By"}
            <div className="SideControlBar__body">
                <form htmlFor="searchTerms">
                    <label className="SearchLabel" htmlFor="year">Year:</label>
                    <SearchYearInput className="SearchTextBar" name="year" id="year" onChange={handleYearOnChange} /><br />
                    {/* {attempttedSubmit && searchYear && <p className="SearchYear__Warning">{`Warning: search year required years in the form of YYYY or YYYY-YYYY format`}</p>} */}
                    <label className="SearchLabel" htmlFor="search_cat">Categories:</label>
                    {/**
                     * category should have a component SearchCatInput.jsx; 
                     * DropDownDataList should be a component on its own that contained all the categories options, or it should be part of SearchCatInput.jsx
                     */}
                    <DropDownDataList className="SearchTextBar" list="searchCat" options={categories} name="search_cat" id="search_cat" placeholder="doubleclick avaliable" /><br />
                    <label>Firstname:</label>
                    <Input /><br />
                    <label>Surname:</label>
                    <Input /><br />
                    <label>Country:</label>
                    <Input /><br />
                    <label>City:</label>
                    <Input /><br />
                    <label>Affiliation:</label>
                    <Input /><br />
                    <label>Keyword:</label>
                    <Input /><br />
                    <Button type="submit" text="Submit" className="SubmitBtn" onClick={handleSubmitSearch} />
                    <Button type="reset" text="Reset" className="ResetBtn" />
                </form>
            </div>
        </div>
    )
}