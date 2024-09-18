import React from "react";

import "../styles/Button.css";

const Button = ({id, className, text, type, onClick})=> {

    return (
        <>
            <button 
                className={`Button__styles ${className}`}
                id = { id }
                type={ type }
                onClick={ onClick }>
                { text }
            </button>
        </>
    )
}

export default Button