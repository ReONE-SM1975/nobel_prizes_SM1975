import React from "react";

import "../styles/Input.css"

const Input = ({id,text, className, name, type="text", placeholder, pattern, maxLength, onChange, onInput, list, options=[]})=> {

    return (
        <>
            <input className={`Input__styles ${className}`}
            id={ id }
            name={ name }
            type= { type }
            value={ text }
            placeholder={ placeholder }
            pattern = {pattern}
            maxLength = {maxLength}
            onChange= { onChange }
            onInput = { onInput }
            list= {list}>
            </input>
            <datalist id={list}>
                {
                    options.map((option,idx) =>
                        <option 
                            key={`${option}${idx}`}
                            value={`${option}`}>
                        </option>
                    )
                }
            </datalist>
        </>
    )
}
export default Input;