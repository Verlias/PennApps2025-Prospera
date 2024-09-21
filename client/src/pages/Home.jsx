import {useEffect, useRef, useState} from "react";
import Plot from 'react-plotly.js';
import {dateDifference} from "../utils/tools.js";
import {SpendChart} from "../components/SpendChart.jsx";
import {RAPID_API_KEY} from "../../keys.js";

export const Home = () => {

    const [accountHist, setAccountHist] = useState()
    const [hoverBar, setHoverBar] = useState(null)
    const [sp, setSp] = useState([{oneYearPercentage:"75.40%",
        symbol:"BLOK",
        companyName:"Amplify Transformational Data Sharing ETF",
        lastSalePrice:"$36.47",
        netChange:"-0.00",
        percentageChange:"-0.0%",
        deltaIndicator:"down"},
        {
            oneYearPercentage:"75.40%",
            symbol:"BLOK",
            companyName:"Amplify Transformational Data Sharing ETF",
            lastSalePrice:"$36.47",
            netChange:"-0.00",
            percentageChange:"-0.0%",
            deltaIndicator:"down",
        }]);

    useEffect(() => {
        // fetch("https://yahoo-finance15.p.rapidapi.com/api/v2/markets/tickers?type=ETF", {
        //     method: "GET",
        //     headers: {
        //         'x-rapidapi-key': RAPID_API_KEY,
        //         'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
        //     }
        // }).then(res => res.json())
        //     .then(resp => setSp([resp.body[0], resp.body[1]]))

    }, []);

    const upcoming_bills = [
        ["Verizon", 30, new Date("24 September 2024")],
        ["Vanguard", 150, new Date("1 October 2024")],
        ["PECO", 80, new Date("15 October 2024")]
    ]

    const recent_purchases = [
        ["Chipotle", 16, new Date("10:30 21 September 2024")],
        ["Five Guys", 10, new Date("12:30 20 September 2024")],
        ["ACME", 10, new Date("10:30 20 September 2024")]
    ]
    const color_graded_bills = useRef(getBackgroundColor(upcoming_bills));
    console.log(color_graded_bills);

    function getBackgroundColor(prices) {
        const minPrice = Math.min(...prices.map(item => item[1]));
        const maxPrice = Math.max(...prices. map(item => item[1]));

        return prices.map(([_, price, _1]) => {
            const normalized = (price - minPrice) / (maxPrice - minPrice);

            const redIntensity = Math.floor(normalized * 255);

            return `rgb(${redIntensity}, 120, 80)`;  // Redder with higher prices
        });
    }

    return (
        <div className="w-full h-full bg-amber-50 overflow-x-hidden overflow-y-auto">
            <div className="w-full h-full grid grid-rows-[65%_35%]">
                <div className="w-full h-full grid grid-cols-[70%_30%] ">
                    <div className="flex items-center justify-center">
                        <SpendChart />
                    </div>
                    <div className="w-full h-full grid grid-rows-[40%_50%_10%]">
                        <div className="w-full h-full grid grid-rows-[85%_15%] text-8xl">
                            <div className="w-full h-full grid grid-rows-[50%_50%] justify-center pb-2 items-end">
                                <div />
                                <div className="grid grid-cols-[10%_90%]">
                                    <div className="pt-4 w-full h-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="text-green-700 size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"/>
                                        </svg>
                                    </div>
                                    $1217
                                </div>
                            </div>
                            <div className="text-lg flex justify-center ">
                                Up &nbsp; <b className="text-green-700">0.2%</b> &nbsp; from this time last month
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-[50%_50%] h-full">
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-10/12 h-5/6 bg-amber-100 rounded-lg border border-slate-600 p-2">
                                    <div className="w-full bg-blue-900 flex h-[10%] relative rounded-lg">
                                        <div onMouseEnter={() => setHoverBar("a")} onMouseLeave={() => setHoverBar(null)} style={{width: hoverBar === null ? "70%" : hoverBar === "a" ? "100%" : "0%", borderRadius: hoverBar === "a" ? "0.5rem" : ""}} className="flex items-center justify-center text-white transition-all bg-indigo-700 rounded-l-lg" >
                                            {hoverBar === "a" ? "Education" : ""}
                                        </div>
                                        <div onMouseEnter={() => setHoverBar("b")} onMouseLeave={() => setHoverBar(null)} style={{width: hoverBar === null ? "20%" : hoverBar === "b" ? "100%" : "0%", borderRadius: hoverBar === "b" ? "0.5rem" : ""}} className="flex items-center justify-center text-white transition-all bg-blue-500" >
                                            {hoverBar === "b" ? "Housing" : ""}
                                        </div>
                                        <div onMouseEnter={() => setHoverBar("c")} onMouseLeave={() => setHoverBar(null)} style={{width: hoverBar === null ? "10%" : hoverBar === "c" ? "100%" : "0%", borderRadius: hoverBar === "c" ? "0.5rem" : ""}} className="flex items-center justify-center text-white transition-all bg-cyan-500 rounded-r-lg" >
                                            {hoverBar === "c" ? "Utilities" : ""}
                                        </div>
                                    </div>
                                    <div className="w-full h-[65%] mt-2">
                                        {
                                            recent_purchases.map(([company, amount, date], index) => (
                                                    <div
                                                        className={`w-full h-1/3   ${index === 0 ? "border-t border-b" : "border-b"} transition-colors hover:bg-amber-200 flex border-slate-600`}>
                                                        <div className="w-[20%] text-xl font-semibold flex items-center">
                                                            ${amount}
                                                        </div>
                                                        <div className="w-[40%] flex items-center">
                                                            {company}
                                                        </div>
                                                        <div className="w-[40%] flex items-center justify-end">
                                                            {dateDifference(new Date(), date, "hours")} <div className="text-xs text-gray-700">hours ago</div>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                    <div className="h-[25%] w-full flex gap-2 items-center py-2">
                                        {
                                            sp.map((item, ind) => (
                                                <div style={{backgroundColor: `rgba(${254 - parseInt(item.percentageChange.split("%")[0]) * 30}, ${243 + parseInt(item.percentageChange.split("%")[0]) * 30},${199})`}} className="w-1/2 h-full border border-slate-600 rounded-lg flex">
                                                    <div className="w-[60%] h-full pl-2 flex items-center">
                                                        {item.symbol}
                                                    </div>
                                                    <div className="w-[40%] h-full text-xs flex items-center font-bold">
                                                        {item.percentageChange.split("%")}
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-full flex items-center">
                                <div className="h-auto w-full">
                                    {
                                        upcoming_bills.map(([company, amount, bill], index) => (
                                            <div className="w-full justify-end bg-amber-100 mb-2 h-12 flex rounded-l-lg border-slate-600 border">
                                                <div
                                                    className="p-2 w-3/4 h-full mb-2">
                                                    {company}: due in {dateDifference(new Date(), bill)} days
                                                </div>

                                                <div style={{backgroundColor: color_graded_bills.current[index]}} className="flex items-center justify-center w-1/4 h-full">
                                                    ${amount}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-full h-full">
                    <div className="w-full h-1/2 flex p-4 border-y border-slate-400 gap-4 overflow-x-auto">
                        <div className=" w-full border-x border-slate-300 h-full "></div>
                        <div className=" w-full border-x border-slate-300 h-full "></div>
                        <div className=" w-full border-x border-slate-300 h-full "></div>
                        <div className=" w-full border-x border-slate-300 h-full "></div>
                        <div className=" w-full border-x border-slate-300 h-full "></div>
                    </div>
                </div>

            </div>

        </div>
    )
}