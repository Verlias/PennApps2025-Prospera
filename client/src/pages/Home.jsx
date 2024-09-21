import {useState} from "react";
import Plot from 'react-plotly.js';
import {dateDifference} from "../utils/tools.js";
import {SpendChart} from "../components/SpendChart.jsx";

export const Home = () => {

    const [accountHist, setAccountHist] = useState()
    const upcoming_bills = [
        ["Verizon", new Date("24 September 2024")],
        ["Vanguard", new Date("1 October 2024")],
        ["PECO", new Date("15 October 2024")]
    ]

    return (
        <div className="w-full h-full bg-amber-50 overflow-x-hidden overflow-y-auto">
            <div className="w-full h-full grid grid-rows-[75%_25%]">
                <div className="w-full h-full grid grid-cols-[70%_30%] ">
                    <div className="flex items-center justify-center">
                        <SpendChart />
                    </div>
                    <div className="w-full h-full grid grid-rows-[40%_40%_20%]">
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
                        <div className="w-full grid grid-cols-[35%_65%] h-full">
                            <div className="w-full h-full">

                            </div>
                            <div className="w-full h-full flex items-center">
                                <div className="h-auto w-full">
                                    {
                                        upcoming_bills.map(([company, bill], index) => (
                                            <div className="p-2 bg-amber-100 w-full h-12 rounded-l-lg border-slate-600 border border-r-0 mb-2">
                                                {company}: due in {dateDifference(new Date(), bill)} days
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>

                        </div>
                        <div className="w-full h-full bg-green-500"></div>

                    </div>
                </div>
                <div className="w-full h-full bg-blue-500"></div>

            </div>

        </div>
    )
}