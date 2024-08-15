import React from 'react';
import TimeOfDay from './TimeOfDay';
import ShowTimePlusPlus from './ShowTimePlusPlus';
import RandomWinner from './RandomWinner';
import "../styles/Header.css"

export default function Header({ appTitle, showTime, randomWinner, timeOfDay }) {
    return (
        <div className="Header">
            <header className="Header__header">
                {showTime && <ShowTimePlusPlus className="header__showTime" />}
                {appTitle && <h1 className="header__title">{appTitle}</h1>}
                {randomWinner && <b><div className="header__randomWinner"><RandomWinner /></div></b>}
                {timeOfDay && <TimeOfDay className="header__timeOfDay" />}

            </header>

        </div>
    )
}