import React from 'react'

export default function Footer({mainText, author}){
    return (
        <div className="Footer__head">
            <footer className="Footer__main">
                {mainText && <div className="Footer__mainText">{ mainText }</div>}
                {author && <div className="Footer__author"> {`GitHub:${author}`}</div>}
            </footer>
        </div>
    )
}