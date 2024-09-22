import {useEffect, useRef, useState} from "react";
import {Collapse} from "@mui/material";
import {Relative, RelativeFl} from "../components/Relative.jsx";
import {useNavigate} from "react-router-dom";
import {
    further_group,
    getGroupedTransactions,
    getGroupedTransactionsByCategory,
    getLastThreeMerchantNames
} from "../utils/tools.js";
import {CAPITALONE_KEY} from "../../keys.js";

export const Recommend = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [showRes, setShowRes] = useState(false);
    const [llmRes, setLlmRes] = useState("");
    const [avgs, setAvgs] = useState(null);
    const [category, setCategory] = useState(null)

    useEffect(() => {
        fetch("http://localhost:5000/classify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({income: 10000, debt: 4000, credit_score: 700})
        }).then(res => res.json())
            .then(res => {
                let food = 0, transportation = 0;
                let housing = 0, utilities = 0;


                for(const {Utilities, Transportation, Housing, Food} of res) {
                    food += Food;
                    transportation += Transportation;
                    housing += Housing;
                    utilities += Utilities;
                }

                let divisor = 12 * res.length
                let result = {food: food/divisor, transportation: transportation/divisor, housing: housing/divisor, utilities: utilities/divisor};

                setAvgs(result);
            })

        const customerId = "66ef454a9683f20dd518a575";
        const baseUrl = "http://api.nessieisreal.com";
        const url = `${baseUrl}/accounts/${customerId}/purchases?key=${CAPITALONE_KEY}`;

        fetch(url).then(res => res.json())
            .then(async resp => {
                return getGroupedTransactionsByCategory(resp)
            })
            .then(item => {
                setCategory(further_group(item))
            })
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/goal-recommend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                income: 10000, debt: 4000, credit_score: 700, expenses: 2000,
                Utilities: category?.Utility, Food: category?.Food, Housing: 770, Transportation: category?.["Non Essentials"], financial_goals: inputRef.current.value
            })
        }).then(res => res.json())
            .then(res => {
                setShowRes(true);
                setLlmRes(res);
            })
    }



    return (
        <div className="w-full h-full bg-amber-50 overflow-x-hidden overflow-y-auto scrollbar-hidden">
            <div className="w-full h-[8%] px-4 flex justify-between">
                <div onClick={() => navigate("/")}
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
            <RelativeFl myExpense={category?.Food} avgExpense={avgs?.food} theme="Food" />
            <div className="w-full h-20"/>
            <Relative myExpense={category?.["Non Essentials"]} avgExpense={avgs?.utilities} theme="Non Essentials" />
            <div className="w-full h-20"/>
            <RelativeFl myExpense={category?.Utility} avgExpense={avgs?.transportation} theme="Utilities" />
            <div className="w-full h-60"/>
            <div className="w-full pl-8 h-1/2 text-7xl">
                <div>
                    Not sure what the <b className="text-blue-800">numbers</b> mean?
                </div>
                <div className="w-full flex items-center justify-center pt-8">
                    Get a more qualitative &nbsp; <b className="text-blue-800">analysis</b>.
                </div>
                <form onSubmit={handleFormSubmit} className="w-full flex items-center justify-end pt-8">
                    <input ref={inputRef} placeholder="Enter a query" className="w-1/2 border-b border-slate-600 bg-amber-50 focus:outline-none" />
                </form>
                <button type="submit" className="hidden" />
            </div>
            <Collapse orientation="vertical" in={showRes} timeout="auto" unmountOnExit>
                <div style={{bottom: showRes ? "0px" : "-1000px"}} className={`absolute transition-all bottom-0 w-full h-1/2 flex justify-center`}>
                    <div className="w-2/3 relative bottom-0  text-xl bg-amber-300 backdrop-blur-xl bg-opacity-30 rounded-t-xl p-4 grid grid-rows-[7%_93%] border border-slate-600">
                        <div onClick={() => setShowRes(false)} className="w-full h-full bg-black bg-opacity-10 rounded-xl hover:cursor-pointer hover:bg-opacity-20 transition-colors flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-9 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"/>
                            </svg>
                        </div>
                        <div className="w-full h-full p-2 pt-6">
                            {
                                llmRes.length && (
                                    llmRes.split("~").map(item => (
                                        <div className="mb-4" key={item}>
                                            {item}
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>

                </div>
            </Collapse>
        </div>
    )
}