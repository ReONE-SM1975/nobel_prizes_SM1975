import React from "react";

import "../styles/Input.css"

const Input = ({id,text, className, type, placeholder, onChange})=> {

    return (
        <>
            <input className={`Input__styles ${className}`}
            id={id}
            type= { type }
            value={ text }
            placeholder={ placeholder }
            onChange= { onChange }></input>
        </>
    )
}
export default Input;