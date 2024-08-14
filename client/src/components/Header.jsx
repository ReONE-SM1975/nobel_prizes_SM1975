import React from 'react';
import TimeOfDay from './TimeOfDay'
import "../styles/Header.css"

export default function Header({ appTitle, welcomeText, randomWinner, timeOfDay }) {
    return (
        <div className="Header">
            <header className="Header__header">
                {appTitle && <h1 className="header__title">{appTitle}</h1>}
                {welcomeText && <h2 className="header__welcomeText">{welcomeText}</h2>}
                {randomWinner && <b><div className="header__randomWinner">{randomWinner}</div></b>}
                {timeOfDay && <TimeOfDay className="header__timeOfDay" />}

            </header>

        </div>
    )
}