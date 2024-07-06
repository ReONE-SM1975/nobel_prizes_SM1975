import React from "react";

import "../styles/Input.css"

const Input = ({id,text, className, name, type="text", placeholder, patten, maxLength, onChange})=> {

    return (
        <>
            <input className={`Input__styles ${className}`}
            id={ id }
            name={ name }
            type= { type }
            value={ text }
            placeholder={ placeholder }
            patten = {patten}
            maxLength = {maxLength}
            onChange= { onChange }></input>
        </>
    )
}
export default Input;