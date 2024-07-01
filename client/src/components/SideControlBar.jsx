import React from 'react';
import "../styles/SideControlBar.css";

export default function SideControlBar(){

    return (
        <div className="SideControlBar">
            <div className="SideControlBar__body">
                <button>Year</button><br />
                <button>Categories</button>
            </div>
        </div>
    )
}