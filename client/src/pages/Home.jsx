import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MiddleBodyContent from "../components/MiddleBodyContent"

import "../styles/Home.css"

export default function Home() {

    return (
        <div>
            <div className="Home">
                <div className="Home__header">
                    <Header appTitle="The Nobel Prizes Database" timeOfDay={true} showTime={true} randomWinner={true} />
                </div>
                <div className="Home__Pannel">

                    <MiddleBodyContent />
                </div>
                <div className="Home__Footer">
                    <Footer mainText={
                        `Copyrights ${new Date().getFullYear()} ReONE-SM1975`
                    } />
                </div>

            </div>
        </div>
    );
}