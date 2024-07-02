import React from "react"

const Button = ({text, type})=> {

    return (
        <div>
            <button 
                className="Button__sytle"
                type={ type }>
                { text }
            </button>
        </div>
    )
}

export default Button