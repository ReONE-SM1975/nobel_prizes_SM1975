import React from "react";

import "../styles/Input.css"

const Input = ({id,text, className, name, type="text", placeholder, pattern, maxLength, onChange, onInput})=> {

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
            onInput = { onInput }>
            </input>
        </>
    )
}
export default Input;