import React from "react";

import "../styles/DropDownDataList.css"

export default function DropDownDataList ({className, list, options=[], name, id, placeholder}){

    return (
        <>
        
        <input 
            name= {name}
            id={id}
            /* type="text" */
            className={`DropDownMenu__styles ${className}`} 
            list={list} 
            placeholder = {placeholder}
            />
            <datalist id={list}>
                    {
                        options.map((option,idx) => 
                            <option key={`${option}${idx}`} value={`${option}`}></option>
                        )
                    }
                    </datalist>
        
        </>
    )
}