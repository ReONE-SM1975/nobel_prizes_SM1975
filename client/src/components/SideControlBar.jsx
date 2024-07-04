import React from 'react';

import Input from "../components/Input"
import "../styles/SideControlBar.css";

export default function SideControlBar(){

    return (
        <div className="SideControlBar">
            {"Search By"}
            <div className="SideControlBar__body">
                
                <form htmlFor="searchTerms">
                    <label>Year:</label>
                    <Input></Input><br />
                    <label>Categories:</label>
                    <input></input><br />
                    <label>Name:</label>
                    <input></input><br />
                    <label>Country:</label>
                    <input></input><br />
                    <label>City:</label>
                    <input></input><br />
                    <label>Affiliation:</label>
                    <input></input><br />
                    <label>Keyword:</label>
                    <input></input><br />
                    <button>Submit</button><button>Reset</button>
                </form>
            </div>
        </div>
    )
}