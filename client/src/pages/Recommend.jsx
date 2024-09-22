import {useEffect, useState} from "react";
import {Collapse} from "@mui/material";
import {Relative, RelativeFl} from "../components/Relative.jsx";

export const Recommend = () => {

    const [hovering, setHovering] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/classify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({income: 10000, debt: 4000, credit_score: 700})
        }).then(res => res.json())
            .then(res => console.log(res))
    }, []);

    const testEndpoint = () => {
        fetch("http://localhost:5000/testGet", {
            method: "GET",
        }).then(res => console.log(res.body))
    }

    const help = () => {
        setHovering("F")
        console.log("sanity check")
    }

    return (
        <div className="w-full h-full bg-amber-50 overflow-x-hidden overflow-y-auto scrollbar-hidden">
            <div className="w-full h-[8%] px-4 flex justify-between">
                <div onClick={() => testEndpoint()}
                     className="w-[10%]  h-full text-2xl flex items-center justify-center border-b border-slate-600 hover:border-b-2 transition-all hover:cursor-pointer font-serif">Home
                </div>
                <div className="w-[20%] h-full flex gap-2">
                    <div onClick={() => navigate("/recommend")}
                         className="w-full h-full text-2xl flex items-center justify-center border-b border-slate-600 hover:border-b-2 transition-all hover:cursor-pointer font-serif">Recommend
                    </div>
                    <div onClick={() => navigate("/account")}
                         className="w-full h-full text-2xl flex items-center justify-center border-b border-slate-600 hover:border-b-2 transition-all hover:cursor-pointer font-serif">Account
                    </div>
                </div>
            </div>
            <div className="w-full h-[15%] text-4xl flex items-center pl-8">
                Your Monthly Report
            </div>
            <RelativeFl myExpense={120} avgExpense={100} theme="Food" />
            <div className="w-full h-20"/>
            <Relative myExpense={170} avgExpense={208} theme="Non Essentials" />
            <div className="w-full h-20"/>
            <RelativeFl myExpense={120} avgExpense={130} theme="Transportation" />
            <div className="w-full h-20"/>

        </div>
    )
}