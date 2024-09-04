import React, { useState } from 'react';

import Input from "../components/Input";
import Button from "../components/Button";
import SearchYearInput from "./SearchYearInput";
import SearchCatInput from "./SearchCatInput";
import SearchBasicInput from "./SearchBasicInput";

import "../styles/SideControlBar.css";

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
    
    const [attempttedSubmit, setAttempttedSubmit] = useState(false);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        console.log(searchData)
    }

    function handleYearOnChange(obj) {
        console.log(obj)
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
    function handleCatOnChange(obj) {
        console.log("searchCatOnChange", obj)
        setSearchData((prev) => {
            return {
                ...prev,
                "category": obj.category
            }
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
                    <label className="SearchLabel" htmlFor="cat_choice">Category:</label>
                    {/**
                     * category should have a component SearchCatInput.jsx; 
                     * DropDownDataList should be a component on its own that contained all the categories options, or it should be part of SearchCatInput.jsx
                     */}
                    <SearchCatInput className="SearchTextBar" name="cat_choice" list="catList" id="cat_choice" onChange={handleCatOnChange} /><br />

                    <label htmlFor="firstname" className="SearchLabel">Firstname:</label>
                    <SearchBasicInput id="firstname" name="firstname" className="SearchTextBar" onChange={setSearchData} blocktype={['digit', 'comma']} /><br />

                    <label htmlFor="surname" className="SearchLabel">Surname:</label>
                    <SearchBasicInput id="surname" name="surname" className="SearchTextBar" onChange={setSearchData}
                    blocktype={['digit', 'comma']}/><br />

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