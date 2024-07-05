import React from 'react';

import Input from "../components/Input";
import Button from "../components/Button";


import "../styles/SideControlBar.css";

export default function SideControlBar(){

    return (
        <div className="SideControlBar">
            {"Search By"}
            <div className="SideControlBar__body">
                
                <form htmlFor="searchTerms">
                    <span>
                        <label>Year:</label></span><span>
                    <Input /><br />
                        </span>
                    <label>Categories:</label>
                    <Input /><br />
                    <label>Name:</label>
                    <Input /><br />
                    <label>Country:</label>
                    <Input /><br />
                    <label>City:</label>
                    <Input /><br />
                    <label>Affiliation:</label>
                    <Input /><br />
                    <label>Keyword:</label>
                    <Input /><br />
                    <Button type="submit" text="Submit" className="SubmitBtn"/>
                    <Button type="reset" text="Reset" className="ResetBtn"/>
                </form>
            </div>
        </div>
    )
}