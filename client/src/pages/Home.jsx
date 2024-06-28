import React from "react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios"


export default function Home(){
    const [hello, setHello] = useState([{"message":"should have 3 lines included this line"}]);
    useEffect(()=>{
        // const response = axios.create({baseURL:"http://localhost:8000"})
        // const header = {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': false,
        // }
        axios.get("http://localhost:8000/api/hello/").then(response => {
            setHello(h => h.concat(response.data))
        }).catch(error => console.error(error))
        // const fetchData = async () => {
        //     try {
        //         await response.get("/api/hello/", header);
        //         console.log(response.data);
        //         setHello( 
        //             h => h.concat(response.data)
        //             //response.data
        //         )

        //     } catch (error){
        //         console.error(error);
        //     }
        // };
        //fetchData();

    }, []);
    return (
        <div>
            <div className="Home">
                <div className="Home__header">
                    <Header appTitle="The Nobel Prizes Database" />
                </div>
                <div className="Home__Pannel">
                    {"Under Constructions\n"}<br/>
                    {"Under Constructions\n"}<br/>
                    {"Under Constructions\n"}<br/>
                    {"Under Constructions\n"}<br/>
                    {"Under Constructions\n"}<br/>
                    { hello && `${
                        hello.map(item => 
                            JSON.stringify(item.message))
                    }\n`
                        }
                        <br/>
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