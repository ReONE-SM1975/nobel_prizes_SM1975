import React from "react";

import "../styles/Input.css"

const Input = ({id,text, type, placeholder, onChange})=> {

    return (
        <>
            <input className="Input__style"
            id={id}
            type= { type }
            value={ text }
            placeholder={ placeholder }
            onChange= { onChange }></input>
        </>
    )
}
export default Input;