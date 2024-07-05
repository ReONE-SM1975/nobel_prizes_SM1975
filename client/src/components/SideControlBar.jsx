import React, {useState} from 'react';

import Input from "../components/Input";
import Button from "../components/Button";


import "../styles/SideControlBar.css";

export default function SideControlBar(){
    const [ searchYear, setSearchYear ] = useState("");
    const [ searchCat, setSearchCat ] = useState("");
    const [ searchFirstName, setSearchFirstName ] = useState("");
    const [ searchSurname, setSearchSurname ] = useState("");
    const [ searchCountry, setSearchCountry ] = useState("");
    const [ searchCity, setSearchCity ] = useState("");
    const [ searchAffilation, setSearchAffilation ] = useState("");
    const [ searchKeyword, setSearchKeyword ] = useState("");

    const handleSearchYear = (e) => {
        e.preventDefault();
        setSearchYear(e.target.value);
    }

    const handleSearchCat = (e) =>{
        e.preventDefault();
        setSearchCat(e.target.value);
    }
    
    const handleSearchFirstName = (e) => {
        e.preventDefault();
        setSearchFirstName(e.target.value);
    }

    const handleSearchSurname = (e) => {
        e.preventDefault();
        setSearchSurname(e.target.value);
    }

    const handleSearchCountry = (e) => {
        e.preventDefault();
        setSearchCountry(e.target.value);
    }

    const handleSearchCity = (e) => {
        e.preventDefault();
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault();
    }
    return (
        <div className="SideControlBar">
            {"Search By"}
            <div className="SideControlBar__body">
                
                <form htmlFor="searchTerms">
                    
                        <label className="SearchLabel" htmlFor="year">Year:</label>
                    <Input className="SearchTextBar" name="year" id="year" onChange={handleSearchYear} /><br />
                        
                    <label>Categories:</label>
                    <Input /><br />
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
                    <Button type="submit" text="Submit" className="SubmitBtn" onClick={handleSubmitSearch}/>
                    <Button type="reset" text="Reset" className="ResetBtn"/>
                </form>
            </div>
        </div>
    )
}