import React from "react";

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