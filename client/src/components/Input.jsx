import React from "react";

import "../styles/Input.css"

const Input = ({text, type, placeholder, onChange})=> {

    return (
        <div>
            <input className="Input__style"
            type= { type }
            value={ text }
            placeholder={ placeholder }
            onChange= { onChange }></input>
        </div>
    )
}
export default Input;