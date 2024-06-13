import React from 'react'

export default function Footer({mainText, author}){
    return (
        <div>
            <footer className="footer">
                {mainText && <div className="footer__mainText">{ mainText }</div>}
                {author && <div className="footer__author"> {`GitHub:${author}`}</div>}
            </footer>
        </div>
    )
}