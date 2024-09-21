import React from 'react';
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-start
            bg-[#003a70] shadow-md
            rounded-b-md 
            px-4 py-2
            ">
            <span className="flex items-center
            text-white text-3xl font-bold py-2"> 
                <img src="./ethBall.png" alt="ethBall" className="w-10 h-10 mr-2" />
                <span>X-Chain-Mon</span>
            </span>
            <span className="bg-transparent w-[250px] ml-auto">
                <DynamicWidget/>
            </span>
        </nav>
    )
}