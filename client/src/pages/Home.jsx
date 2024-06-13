import React from "react";
// import {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function Home(){
    return (
        <div>
            <div className="Home">
                <div className="Home__header">
                    <Header appTitle="The Nobel Prizes Database" />
                </div>
                <div className="Home__Pannel">
                    {"Under Constructions\n"}
                    {"Under Constructions\n"}
                    {"Under Constructions\n"}
                    {"Under Constructions\n"}
                    {"Under Constructions\n"}
                </div>
                <div className="Home__Footer">
                    <Footer mainText={
                        `Copyrights ${new Date().getFullYear()} ReONE-SM1975`
                    } />
                </div>

            </div>
        </div>
    )
}