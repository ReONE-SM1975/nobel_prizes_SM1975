import React from "react";

import "../styles/Button.css";

const Button = ({className, text, type, onClick})=> {

    return (
        <>
            <button 
                className={`Button__styles ${className}`}
                type={ type }
                onClick={ onClick }>
                { text }
            </button>
        </>
    )
}

export default Button